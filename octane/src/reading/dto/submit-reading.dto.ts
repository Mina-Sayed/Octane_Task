import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitReadingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  user_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsString()
  book_id: string;

  @ApiProperty({ example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  start_page: number;

  @ApiProperty({ example: 30, minimum: 1 })
  @IsNumber()
  @Min(1)
  end_page: number;
}
