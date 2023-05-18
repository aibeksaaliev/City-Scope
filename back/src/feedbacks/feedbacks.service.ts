import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { User } from '../users/user.entity';
import { Location } from '../locations/location.entity';
import { UpdateFeedbackDto } from './dto/updateFeedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  async createFeedback(id: number, data: CreateFeedbackDto, user: User) {
    try {
      const location = await this.locationsRepository.findOne({
        where: { id },
      });

      if (location) {
        const newFeedback = await this.feedbackRepository.create({
          user,
          location,
          rating: data.rating,
          comment: data.comment,
        });

        await this.feedbackRepository.save(newFeedback);
        return newFeedback;
      }
    } catch {
      throw new Error('');
    }
  }

  async updateFeedback(id: number, data: UpdateFeedbackDto, user: User) {
    try {
      const feedback = await this.feedbackRepository.findOne({
        where: { id, user: { id: user.id } },
      });

      if (feedback) {
        await this.feedbackRepository.update(id, {
          rating: data.rating ? data.rating : feedback.rating,
          comment: data.comment ? data.comment : data.comment,
          updatedAt: new Date(),
        });

        return feedback;
      }
    } catch {
      throw new Error('');
    }
  }

  async deleteFeedback(id: number, user: User) {
    try {
      const deletingFeedback = await this.feedbackRepository.findOne({
        where: { id, user: { id: user.id } },
      });
      await this.feedbackRepository.delete(deletingFeedback.id);
      return { message: 'Deleted successfully' };
    } catch {
      throw new Error('');
    }
  }
}
