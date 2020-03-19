import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Car } from '../database/entities/car.entity';
import { Repository } from 'typeorm';
import { Contract } from '../database/entities/contract.entity';
import { NewContractDTO } from './models/newContract.dto';
import { IndividualContractDTO } from './models/individualContract.dto';
import { transformToContractDTO } from './transformers/transformToContractDTO';

@Injectable()
export class ContractsService {
    estimatedDaysDiscount: any;
    estimatedAgeDiscount: any;
    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>
    ) { }

    public async getAllContracts(): Promise<IndividualContractDTO[]> {
        const allContractsData: Contract[] = await this.contractsRepository.find({
            where: {
                deliveredDate: null,
                isDeleted: false,
            },
            relations: ['car', 'car.className'],
        });
        let allContractsDataFormated:  IndividualContractDTO[] = []
        allContractsData.map(async (contract: Contract) => {
            const contractInfo = (({ 
                id,
                borrowerFirstName,
                borrowerLastName,
                borrowerAge,
                startDate,
                contractEndDate }) => ({         
                id,
                borrowerFirstName,
                borrowerLastName,
                borrowerAge,
                startDate,
                contractEndDate }))(contract);
            const carInfo = (({ brand, model }) => ({ brand, model }))(await contract.car);
            const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo};
            // const individualContractFormated: IndividualContractDTO = await transformToContractDTO(contract)
            // console.log(individualContractFormated)

            allContractsDataFormated = [...allContractsDataFormated, individualContractFormated];
            // console.log(allContractsDataFormated)

        })
        await Promise.resolve(allContractsDataFormated)
        // console.log(allContractsDataFormated)
        console.log(allContractsData)

        return allContractsDataFormated;
    }

    public async createContract(body: NewContractDTO, carId): Promise<IndividualContractDTO> {
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

        const individualContractFormated: IndividualContractDTO = await transformToContractDTO(createdContract)

        return individualContractFormated;
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
