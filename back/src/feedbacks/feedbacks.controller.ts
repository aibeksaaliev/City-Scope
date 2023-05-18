import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { UserRequest } from '../auth/types';
import { UpdateFeedbackDto } from './dto/updateFeedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly feedbacksService: FeedbacksService,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createFeedback(
    @Body() body: CreateFeedbackDto,
    @Req() req: UserRequest,
    @Query('locationId') locationId: number,
  ) {
    return this.feedbacksService.createFeedback(locationId, body, req.user);
  }

  @Patch('/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateFeedback(
    @Body() body: UpdateFeedbackDto,
    @Req() req: UserRequest,
    @Param('id') locationId: number,
  ) {
    return this.feedbacksService.updateFeedback(locationId, body, req.user);
  }

  @Delete('/:id')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteFeedback(@Req() req: UserRequest, @Param('id') id: number) {
    return this.feedbacksService.deleteFeedback(id, req.user);
  }
}
