import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../database/entities/car.entity';
import { Class } from '../database/entities/class.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';


@Module({
    imports: [TypeOrmModule.forFeature([Car, Class, ])],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
