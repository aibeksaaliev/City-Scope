import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

interface CustomValidationError {
  [key: string]: string[];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors: CustomValidationError = {};

        validationErrors.forEach((error) => {
          const constraints = error.constraints;

          if (constraints) {
            errors[error.property] = Object.keys(constraints).map(
              (key) => constraints[key],
            );
          }
        });

        return new BadRequestException(errors);
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(8000);
}
bootstrap();
