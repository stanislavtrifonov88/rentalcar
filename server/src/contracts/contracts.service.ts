import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository, getManager } from 'typeorm';
import { Car } from '../database/entities/car.entity';
import { Contract } from '../database/entities/contract.entity';
import { NewContractDTO } from './models/newContract.dto';
import { IndividualContractDTO } from './models/individualContract.dto';
import { transformToContractDTO } from './transformers/transformToContractDTO';
import { createContractErrorHandling } from '../shared/errors/createContractErrorHandling';
import * as errorMessages from '../shared/errors/error.messages';
import { CarsService } from '../cars/cars.service';
import Guard from '../shared/util/Guard';


@Injectable()
export class ContractsService {
    estimatedDaysDiscount: any;

    estimatedAgeDiscount: any;

    public constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
        private readonly carsService: CarsService,
    ) { }

    public async getAllContracts(
      transformatorToDTO: (n: Contract) => Promise<IndividualContractDTO> = transformToContractDTO,
    ): Promise<IndividualContractDTO[]> {
      const allContractsData: Contract[] = await this.contractsRepository.find({
        where: {
          deliveredDate: null,
          isDeleted: false,
        },
      });

      let allContractsDataFormated: IndividualContractDTO[] = [];

      allContractsData.map(async (contract: Contract) => {
        const individualContractFormated: IndividualContractDTO = await transformatorToDTO(contract);
        allContractsDataFormated = [...allContractsDataFormated, individualContractFormated];
      });
      await Promise.resolve(allContractsDataFormated);

      return allContractsDataFormated;
    }

    public async createContract(
        body: NewContractDTO, 
        carId: string
        ): Promise<IndividualContractDTO> {
      const foundCar: Car = await this.carsService.getAvailableCarById(carId);

      createContractErrorHandling(body);

      const createdContract: Contract = await getManager().transaction(async (transactionalEntityManager) => {
        const newContract = this.contractsRepository.create(body);
        newContract.car = foundCar;
        const createdContract = await transactionalEntityManager.save(newContract);
        foundCar.isBorrowed = true;
        await transactionalEntityManager.save(foundCar);

        return createdContract;
      });

      const individualContractFormated: IndividualContractDTO = await transformToContractDTO(createdContract);

      return individualContractFormated;
    }

    public async returnCar(
        contractId: string, body: {name: number},
        ): Promise<IndividualContractDTO> {
      const foundContract = await this.contractsRepository.findOne({
        where: {
          id: contractId,
          deliveredDate: null,
        },
      });

      Guard.isFound(foundContract, errorMessages.contractNotFound);
      const foundCar = await this.carsService.getBorrowedCarById(foundContract.car.id)

      await getManager().transaction(async (transactionalEntityManager) => {
        foundCar.isBorrowed = false;
        await this.carsRepository.save(foundCar);

        foundContract.deliveredDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');
        foundContract.pricePaid = body.name;

        await this.contractsRepository.save(foundContract);
      });

      const individualContractFormated: IndividualContractDTO = await transformToContractDTO(foundContract);

      return individualContractFormated;
    }
}
