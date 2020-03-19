import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
  } from '@nestjs/common';
  
import { CarsService } from './cars.service';
import { Car } from '../database/entities/car.entity';
import { IndividualCarDTO } from './models/individualCar.dto';


@Controller('cars')
export class CarsController {
    public constructor(private readonly carsService: CarsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAllAvailableCars () {
      const allAvailableCars: Car[] = await this.carsService.getAllAvailableCars();

      return allAvailableCars;
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    public async getIndividualCar (
      @Param('id') id: string,
    ) {
      const individualCar: IndividualCarDTO = await this.carsService.getIndividualCar(id);

      return individualCar;
    }
}
