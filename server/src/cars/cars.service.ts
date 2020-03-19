import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../database/entities/car.entity';
import { Repository } from 'typeorm';
import { Class } from '../database/entities/class.entity';
import { IndividualCarDTO } from './models/individualCar.dto';
import { transformToCarDTO } from './transformers/carTransformers';


@Injectable()
export class CarsService {
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
        @InjectRepository(Class) private readonly classesRepository: Repository<Class>,
    ) { }

    public async getAllAvailableCars(): Promise<IndividualCarDTO[]> {
        const allCarsData: Car[] = await this.carsRepository.find({
            where: {
                isBorrowed: false,
                isDeleted: false,
            },
            relations: ['className'],
        });

        let allCarsDataFormated: IndividualCarDTO[] = []
        allCarsData.map(async (individualCar) => {
            const carPropsPicked = (({ id, brand, model, picture, }) => ({ id, brand, model, picture, }))(individualCar);
            const classPropsPicked = (({ className, price }) => ({ className, price }))(await individualCar.className);
            const individualCarFormated: IndividualCarDTO = { ...carPropsPicked, ...classPropsPicked};
            allCarsDataFormated = [...allCarsDataFormated, individualCarFormated];
        })

        await Promise.resolve(allCarsDataFormated)

        return allCarsDataFormated;
    }

    public async getIndividualCar(id: string): Promise<IndividualCarDTO> {
        const individualCar: Car = await this.carsRepository.findOne({
            where: {
                id: id,
                isBorrowed: false,
                isDeleted: false,
            },
            relations: ['className']
        })

        const individualCarFormated: IndividualCarDTO = await transformToCarDTO(individualCar)

        return individualCarFormated;
    }

}
