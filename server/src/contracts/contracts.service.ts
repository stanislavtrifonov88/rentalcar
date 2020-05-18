import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Car } from '../database/entities/car.entity';
import { Contract } from '../database/entities/contract.entity';
import { NewContractDTO } from './models/newContract.dto';
import { IndividualContractDTO } from './models/individualContract.dto';
import { transformToContractDTO } from './transformers/transformToContractDTO';
import { createContractErrorHandling } from '../shared/errors/createContractErrorHandling';
import * as errorMessages from '../shared/errors/error.messages';
import { CarsService } from '../cars/cars.service';
import * as Guard from '../shared/util/Guard';
import { currentTotalPrice, estimatedPricePerDay, daysDiscount } from '../shared/calculations/priceCalculations';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../database/entities/customer.entity';
import { returnCarDTO } from './transformers/returnCarDTO';
import * as loyaltyCalculations from '../shared/calculations/loyaltyCalculations';


@Injectable()
export class ContractsService {
    public constructor(
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
        private readonly carsService: CarsService,
        private readonly customersService: CustomersService,
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
        carId: string,
        ): Promise<IndividualContractDTO> {
      const foundCar: Car = await this.carsService.getAvailableCarById(carId);
      const foundCustomer: Customer = await this.customersService.findCustomerByPhone(body.phone)
      const bodyForContract = { startDate: body.startDate, contractEndDate: body.contractEndDate}

      createContractErrorHandling(body);
      const newContract = this.contractsRepository.create(bodyForContract);

      newContract.car = foundCar;
      newContract.customer = foundCustomer;
      foundCar.isBorrowed = true;

      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newContract);
        await transactionalEntityManager.save(foundCar);
      });

      const individualContractFormated: IndividualContractDTO = await transformToContractDTO(newContract);

      return individualContractFormated;
    }

    public async returnCar(
        contractId: string,
        transformatorToDTO: (n: Contract) => Promise<IndividualContractDTO> = transformToContractDTO,
        ): Promise<IndividualContractDTO> {
      const foundContract = await this.contractsRepository.findOne({
        where: {
          id: contractId,
        },
      });

      Guard.isFound(foundContract, errorMessages.contractNotFound);
      Guard.isFound(foundContract.deliveredDate === null, errorMessages.contractAlreadyClosed);

      const foundtContractTransformed = await transformatorToDTO(foundContract);

    
      const foundCar = await this.carsService.getBorrowedCarById(foundContract.car.id)
      const foundCustomer: Customer = await this.customersService.findCustomerByPhone((foundContract.customer.phone).toString())
      const returnedCar = await returnCarDTO(foundContract, foundCar, foundCustomer)

      const loyalty = loyaltyCalculations.loyaltyDiscount(returnedCar)
      const geo = loyaltyCalculations.geoDiscount(returnedCar)
      const estimatedPricePerDay1 = estimatedPricePerDay(returnedCar)
      const a = daysDiscount(returnedCar)
      console.log(a)
      const pricePaid = currentTotalPrice(returnedCar)
      console.log(estimatedPricePerDay1)


      foundCar.isBorrowed = false;
      foundContract.deliveredDate = new Date();
      foundContract.pricePaid = pricePaid;


      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(foundCar);
        await transactionalEntityManager.save(foundContract);
      });

      const individualContractFormated: IndividualContractDTO = await transformToContractDTO(foundContract);

      return individualContractFormated;
    }
}
