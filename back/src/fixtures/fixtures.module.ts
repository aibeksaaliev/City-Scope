import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { LocationsModule } from '../locations/locations.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { FixturesService } from './fixtures.service';
import { SeedCommand } from './seed.command';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Location } from '../locations/location.entity';
import { MainCategory } from '../categories/mainCategory.entity';
import { SubCategory } from '../categories/subCategory.entity';
import { Feedback } from '../feedbacks/feedback.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CategoriesModule,
    LocationsModule,
    FeedbacksModule,
    TypeOrmModule.forFeature([
      User,
      Location,
      MainCategory,
      SubCategory,
      Feedback,
    ]),
  ],
  providers: [FixturesService, SeedCommand],
})
export class FixturesModule {}
