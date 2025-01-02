import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto) {
    const book = this.bookRepository.create({
      name: dto.name,
      numOfPages: dto.numOfPages,
      numOfReadPages: 0,
    });
    return this.bookRepository.save(book);
  }

  async findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: string) {
    return this.bookRepository.findOneBy({ id });
  }
}
