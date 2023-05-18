import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Location } from '../locations/location.entity';
import { MainCategory } from "../categories/mainCategory.entity";
import { SubCategory } from "../categories/subCategory.entity";
import { Feedback } from "../feedbacks/feedback.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT') as string),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Location, MainCategory, SubCategory, Feedback],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
