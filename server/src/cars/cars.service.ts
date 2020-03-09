import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../database/entities/car.entity';
import { Repository } from 'typeorm';
import { Class } from '../database/entities/class.entity';


@Injectable()
export class CarsService {
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
        @InjectRepository(Class) private readonly classesRepository: Repository<Class>,
    ) { }

    public async getAllAvailableCars(): Promise<Car[]> {
        const allCarsData: Car[] = await this.carsRepository.find({
            where: {
                isBorrowed: false,
                isDeleted: false,
            },
            relations: ['className'],
        });

        return allCarsData;
    }

    public async getIndividualCar(id: string): Promise<Car> {
        const individualCar: Car = await this.carsRepository.findOne({
            where: {
                id: id,
                isBorrowed: false,
                isDeleted: false,
            },
            relations: ['className']
        })

        return individualCar;
    }

}
