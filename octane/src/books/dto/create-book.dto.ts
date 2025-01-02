import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  name: string;

  @ApiProperty({ example: 180, minimum: 1 })
  @IsNumber()
  @Min(1)
  numOfPages: number;
}
