import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReadingService } from './reading.service';
import { SubmitReadingDto } from './dto/submit-reading.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Reading')
@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post('intervals')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a reading interval for a book' })
  @ApiResponse({
    status: 201,
    description: 'Reading interval submitted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  submitReading(@Body() dto: SubmitReadingDto) {
    return this.readingService.submitReading(dto);
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get top 5 recommended books' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of recommended books',
  })
  getTopBooks() {
    return this.readingService.getTopBooks();
  }
}
