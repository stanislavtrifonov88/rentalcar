import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../database/entities/car.entity';
import { Contract } from '../database/entities/contract.entity';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { CarsModule } from '../cars/cars.module';

@Module({
    imports: [TypeOrmModule.forFeature([Car, Contract]), CarsModule],
    controllers: [ContractsController],
    providers: [ContractsService ],
})
export class ContractsModule { }