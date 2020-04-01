import "reflect-metadata";

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CarRentalSystemErrorFilter } from "./shared/filters/carRental-error.filter";


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new CarRentalSystemErrorFilter());

  await app.listen(3001);
}
bootstrap();
