import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { ContractsModule } from './contracts/contracts.module';
import { CalculationModule } from './shared/services/calculation/calculation.module';

@Module({
  imports: [DatabaseModule, CarsModule, ContractsModule, CalculationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
