import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../database/entities/car.entity';
import { Repository } from 'typeorm';
import { IndividualCarDTO } from './models/individualCar.dto';
import { transformToCarDTO } from './transformers/carTransformers';
import { CarRentalSystemError } from '../shared/exceptions/carRental-system.error';
import * as errorMessages from '../shared/errors/error.messages'


@Injectable()
export class CarsService {
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) { }

    public async getAllAvailableCars(): Promise<IndividualCarDTO[]> {
        const allCarsData: Car[] = await this.carsRepository.find({
            where: {
                isBorrowed: false,
                isDeleted: false,
            },
        });

        let allCarsDataFormated: IndividualCarDTO[] = []
        allCarsData.map(async (individualCar) => {
            const individualCarFormated: IndividualCarDTO = await transformToCarDTO(individualCar)
            allCarsDataFormated = [...allCarsDataFormated, individualCarFormated];
        })

        await Promise.resolve(allCarsDataFormated)

        return allCarsDataFormated;
    }

    public async getIndividualCar(id: string): Promise<IndividualCarDTO> {

        const foundCar: Car = await this.getAvailableCarById(id)
        const individualCarFormated: IndividualCarDTO = await transformToCarDTO(foundCar)

        return individualCarFormated;
    }

    public async getAvailableCarById(id: string): Promise<Car> {

        try {
            const foundCar: Car = await this.carsRepository.findOne({
            where: {
                id: id,
                isBorrowed: false,
                isDeleted: false,
            },
        })
        if (foundCar === undefined) {
            throw new CarRentalSystemError(errorMessages.borrowedCarNotFound.msg, errorMessages.borrowedCarNotFound.code);
        }

        return foundCar;
        }
        catch (error) {
                throw new CarRentalSystemError(error, 500);
        }
    }

}


