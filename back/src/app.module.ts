import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { CategoriesModule } from './categories/categories.module';
import { FeedbacksModule } from "./feedbacks/feedbacks.module";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    LocationsModule,
    CategoriesModule,
    FeedbacksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
