import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingInterval } from './entities/reading-interval.entity';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { SubmitReadingDto } from './dto/submit-reading.dto';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(ReadingInterval)
    private readingRepository: Repository<ReadingInterval>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async submitReading(dto: SubmitReadingDto) {
    const user = await this.userRepository.findOneBy({ id: dto.user_id });
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.user_id} not found`);
    }

    const book = await this.bookRepository.findOneBy({ id: dto.book_id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${dto.book_id} not found`);
    }

    const interval = this.readingRepository.create({
      user,
      book,
      startPage: dto.start_page,
      endPage: dto.end_page,
    });

    await this.readingRepository.save(interval);
    await this.updateBookReadPages(book.id);

    return { status_code: 'success' };
  }

  async getTopBooks() {
    return this.bookRepository.find({
      order: { numOfReadPages: 'DESC' },
      take: 5,
      select: ['id', 'name', 'numOfPages', 'numOfReadPages'],
    });
  }

  private async updateBookReadPages(bookId: string) {
    const intervals = await this.readingRepository.find({
      where: { book: { id: bookId } },
    });

    const uniquePages = new Set<number>();
    intervals.forEach((interval) => {
      for (let i = interval.startPage; i <= interval.endPage; i++) {
        uniquePages.add(i);
      }
    });

    await this.bookRepository.update(
      { id: bookId },
      { numOfReadPages: uniquePages.size },
    );
  }
}
