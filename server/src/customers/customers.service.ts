import { Injectable } from '@nestjs/common';
import { Customer } from '../database/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { transformToCustomerDTO } from './transformers/transformToCustomerDTO';
import { IndividualCustomerDTO } from './models/individualCustomerDTO';

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
    console.log(foundCustomer)
    const transformedCustomer: IndividualCustomerDTO = await transformToCustomerDTO(foundCustomer)
    // Guard.isFound(foundCar, errorMessages.carNotFound);
    // Guard.isFound(!foundCar.isBorrowed, errorMessages.carIsBorrowed);

    return transformedCustomer;
}
}
