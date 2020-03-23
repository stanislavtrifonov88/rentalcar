import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Car } from '../database/entities/car.entity';
import { Repository } from 'typeorm';
import { Contract } from '../database/entities/contract.entity';
import { NewContractDTO } from './models/newContract.dto';
import { IndividualContractDTO } from './models/individualContract.dto';
import { transformToContractDTO } from './transformers/transformToContractDTO';
import { createContractErrorHandling } from '../shared/errors/createContractErrorHandling';
import { CarRentalSystemError } from '../shared/exceptions/carRental-system.error';
import * as errorMessages from '../shared/errors/error.messages';
import {getManager} from "typeorm";
import { CarsService } from '../cars/cars.service';


@Injectable()
export class ContractsService {
    estimatedDaysDiscount: any;
    estimatedAgeDiscount: any;
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
        private readonly carsService: CarsService
    ) { }

    public async getAllContracts(): Promise<IndividualContractDTO[]> {
        const allContractsData: Contract[] = await this.contractsRepository.find({
            where: {
                deliveredDate: null,
                isDeleted: false,
            },
        });

        let allContractsDataFormated:  IndividualContractDTO[] = []

        allContractsData.map(async (contract: Contract) => {
            const individualContractFormated: IndividualContractDTO = await transformToContractDTO(contract)
            allContractsDataFormated = [...allContractsDataFormated, individualContractFormated];
        })
        await Promise.resolve(allContractsDataFormated)

        return await allContractsDataFormated;
    }

    public async createContract(body: NewContractDTO, carId: string): Promise<IndividualContractDTO> {
        
        const foundCar: Car = await this.carsService.getAvailableCarById(carId)

        createContractErrorHandling(body)

        const createdContract: Contract = await getManager().transaction(async transactionalEntityManager => {
            const newContract = await this.contractsRepository.create(body)
            newContract.car = foundCar
            const createdContract = await transactionalEntityManager.save(newContract);
            foundCar.isBorrowed = true
            await transactionalEntityManager.save(foundCar);

            return createdContract
        });

        const individualContractFormated: IndividualContractDTO = await transformToContractDTO(createdContract)

        return individualContractFormated;
    }

    public async returnCar(contractId: string, body: {name: number}): Promise<IndividualContractDTO> {

        let foundContract = null;
        try {
        foundContract = await this.contractsRepository.findOne({
            where: {
                id: contractId,
                deliveredDate: null,
            },
        })
        if (foundContract === undefined) {
            throw new CarRentalSystemError(errorMessages.contractNotFound.msg, errorMessages.contractNotFound.code);
        }
        }
        catch (error) {
                throw new CarRentalSystemError(error, 500);
        }

        let foundCar = null;
        try {
        foundCar = await this.carsRepository.findOne({
            where: {
                id: (await foundContract.car).id,
                isBorrowed: true,
                isDeleted: false,
            },
        })
        if (foundCar === undefined) {
            throw new CarRentalSystemError(errorMessages.borrowedCarNotFound.msg, errorMessages.borrowedCarNotFound.code);
        }
        }
        catch (error) {
                throw new CarRentalSystemError(error, 500);
        }

        await getManager().transaction(async transactionalEntityManager => {
            foundCar.isBorrowed = false;
            await this.carsRepository.save(foundCar)
    
            foundContract.deliveredDate = moment(new Date()).format('YYYY-MM-DDTHH:mm')
            foundContract.pricePaid = body.name;
            await this.contractsRepository.save(foundContract)
        });

        const individualContractFormated: IndividualContractDTO = await transformToContractDTO(foundContract)

        return individualContractFormated;
    }

}
