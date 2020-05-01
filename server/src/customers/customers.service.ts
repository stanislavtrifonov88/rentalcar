import { Injectable } from '@nestjs/common';
import { Customer } from '../database/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    public constructor(
        @InjectRepository(Customer) private readonly customersRepository: Repository<Customer>,
    ) { }

    public async getCustomerByPhone(phone: string): Promise<Customer> {

        const foundCustomer: Customer = await this.customersRepository.findOne({
        where: {
            phone,
            isDeleted: false,
        },
    })

    // Guard.isFound(foundCar, errorMessages.carNotFound);
    // Guard.isFound(!foundCar.isBorrowed, errorMessages.carIsBorrowed);

    return foundCustomer;
}
}
