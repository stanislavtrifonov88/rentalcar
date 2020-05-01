import { Injectable } from '@nestjs/common';
import { Customer } from '../database/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { transformToCustomerDTO } from './transformers/transformToCustomerDTO';
import { IndividualCustomerDTO } from './models/individualCustomerDTO';
import { NewCustomerDTO } from './models/newCustomerDTO';
import { Repository, getManager } from 'typeorm';

@Injectable()
export class CustomersService {
    public constructor(
        @InjectRepository(Customer) private readonly customersRepository: Repository<Customer>,
    ) { }

    public async getCustomerByPhone(phone: string): Promise<IndividualCustomerDTO> {

        const foundCustomer: Customer = await this.customersRepository.findOne({
        where: {
            phone,
            isDeleted: false,
        },
        relations: [ 'contracts' ]
    })
    const transformedCustomer: IndividualCustomerDTO = await transformToCustomerDTO(foundCustomer)
    // Guard.isFound(foundCar, errorMessages.carNotFound);
    // Guard.isFound(!foundCar.isBorrowed, errorMessages.carIsBorrowed);

    return transformedCustomer;
}

public async createNewCustomer(body: NewCustomerDTO): Promise<IndividualCustomerDTO> {

  const foundCustomer: Customer = await this.customersRepository.findOne({
    where: {
        phone: body.phone,
        isDeleted: false,
    },
    relations: [ 'contracts' ]
})
console.log(foundCustomer)

if (foundCustomer) {
  return
}
//   createContractErrorHandling(body);
  const newCustomer: Customer = await this.customersRepository.create(body);
  // await this.customersRepository.save(newCustomer)

  await getManager().transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(newCustomer);
  });

  const individualContractFormated: IndividualCustomerDTO = await transformToCustomerDTO(newCustomer);

  return individualContractFormated;
}
}
