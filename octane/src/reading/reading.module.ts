import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingInterval } from './entities/reading-interval.entity';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingInterval, Book, User])],
  providers: [ReadingService],
  controllers: [ReadingController],
  exports: [TypeOrmModule],
})
export class ReadingModule {}
