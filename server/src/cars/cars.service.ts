import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../database/entities/car.entity';
import { IndividualCarDTO } from './models/individualCar.dto';
import * as errorMessages from '../shared/errors/error.messages'
import { transformToCarDTO } from './transformers/transformToCarDTO';
import * as Guard from '../shared/util/Guard';

@Injectable()
export class CarsService {
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) { }

    public async getAllAvailableCars(
        transformatorToDTO: (n: Car) => Promise<IndividualCarDTO> = transformToCarDTO
        ): Promise<IndividualCarDTO[]> {
        const allCarsData: Car[] = await this.carsRepository.find({
            where: {
                isBorrowed: false,
                isDeleted: false,
            },
        });

        let allCarsDataFormated: IndividualCarDTO[] = []
        allCarsData.map(async (individualCar) => {
            const individualCarFormated: IndividualCarDTO = await transformatorToDTO(individualCar)
            allCarsDataFormated = [...allCarsDataFormated, individualCarFormated];
        })

        await Promise.resolve(allCarsDataFormated)

        return allCarsDataFormated;
    }

    public async getIndividualCar(
        id: string, 
        transformatorFunc: (n: Car) => Promise<IndividualCarDTO> = transformToCarDTO,
        ) : Promise<IndividualCarDTO> {

        const foundCar: Car = await this.getAvailableCarById(id)

        const individualCarFormated: IndividualCarDTO = await transformatorFunc(foundCar)

        return individualCarFormated;
    }

    public async getAvailableCarById(id: string): Promise<Car> {

            const foundCar: Car = await this.carsRepository.findOne({
            where: {
                id,
                isBorrowed: false,
                isDeleted: false,
            },
        })

        Guard.isFound(foundCar, errorMessages.carNotFound);

        return foundCar;
    }

    public async getBorrowedCarById(id: string): Promise<Car> {

        const foundCar: Car = await this.carsRepository.findOne({
        where: {
            id,
            isBorrowed: true,
            isDeleted: false,
        },
    })

    Guard.isFound(foundCar, errorMessages.borrowedCarNotFound);

    return foundCar;
}
}


