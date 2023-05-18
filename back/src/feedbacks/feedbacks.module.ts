import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Location } from '../locations/location.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Location, User])],
  providers: [FeedbacksService],
  exports: [FeedbacksService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
