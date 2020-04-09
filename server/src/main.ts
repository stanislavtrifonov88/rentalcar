import "reflect-metadata";

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CarRentalSystemErrorFilter } from "./shared/filters/carRental-error.filter";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useGlobalFilters(new CarRentalSystemErrorFilter());
  app.useStaticAssets(join(__dirname, '..', 'assets'), {prefix: '/img'});

  await app.listen(3001);
}
bootstrap();
