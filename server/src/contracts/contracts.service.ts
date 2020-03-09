import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Car } from '../database/entities/car.entity';
import { Repository } from 'typeorm';
import { Contract } from '../database/entities/contract.entity';
import { NewContractDTO } from './models/newContract.dto';

@Injectable()
export class ContractsService {
    estimatedDaysDiscount: any;
    estimatedAgeDiscount: any;
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>
    ) { }

    public async getAllContracts(): Promise<Contract[]> {
        const allContractsData: Contract[] = await this.contractsRepository.find({
            where: {
                deliveredDate: 'n/a',
                isDeleted: false,
            },
            relations: ['car', 'car.className'],
        });

        return allContractsData;
    }

    public async createContract(body: NewContractDTO, carId): Promise<Contract> {
        const foundCar = await this.carsRepository.findOne({
            where: {
                id: carId
            }
        })

        if (body.startDate > body.contractEndDate) {
            throw new BadRequestException({
                "status": 400,
                "error": "Return date cannot be before today"
            })
        }

        const newContract = await this.contractsRepository.create(body)
        newContract.car = Promise.resolve(foundCar)
        const createdContract = await this.contractsRepository.save(newContract)
        foundCar.isBorrowed = true
        await this.carsRepository.save(foundCar)

        return createdContract;
    }

    public async returnCar(contractId: string, body: {name: number}): Promise<Contract> {
        const foundContract = await this.contractsRepository.findOne({
            where: {
                id: contractId
            },
            relations: ['car', 'car.className'],
        })

        const foundCar = await this.carsRepository.findOne({
            where: {
                id: (await foundContract.car).id
            },
            relations: ['className'],
        })

        foundCar.isBorrowed = false;
        await this.carsRepository.save(foundCar)

        foundContract.deliveredDate = moment(new Date()).format('YYYY-MM-DDTHH:mm')
        foundContract.pricePaid = body.name;
        await this.contractsRepository.save(foundContract)

        return foundContract;
    }

}
