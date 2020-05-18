import { Injectable } from '@nestjs/common';
import { Customer } from '../database/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { transformToCustomerDTO } from './transformers/transformToCustomerDTO';
import { IndividualCustomerDTO } from './models/individualCustomerDTO';
import { NewCustomerDTO } from './models/newCustomerDTO';
import { Repository, getManager } from 'typeorm';
import * as Guard from '../shared/util/Guard';
import * as errorMessages from '../shared/errors/error.messages';
import { createCustomerErrorHandling } from '../shared/errors/createCustomerErrorHandling';

@Injectable()
export class CustomersService {
  public constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  public async getCustomerByPhone(
    phone: string,
  ): Promise<IndividualCustomerDTO> {
    const foundCustomer: Customer = await this.findCustomerByPhone(phone);
    const transformedCustomer: IndividualCustomerDTO = await transformToCustomerDTO(
      foundCustomer,
    );

    return transformedCustomer;
  }

  public async createNewCustomer(
    body: NewCustomerDTO,
  ): Promise<IndividualCustomerDTO> {
    const foundCustomer: Customer = await this.customersRepository.findOne({
      where: {
        phone: body.phone,
        isDeleted: false,
      },
      relations: ['contracts'],
    });

    Guard.isFound(!foundCustomer, errorMessages.customerAlreadyExist);
    createCustomerErrorHandling(body);

    const newCustomer: Customer = await this.customersRepository.create(body);

    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(newCustomer);
    });
    const foundCustomerAfterSave = await this.findCustomerByPhone(
      newCustomer.phone.toString(),
    );
    const individualContractFormated: IndividualCustomerDTO = await transformToCustomerDTO(
      foundCustomerAfterSave,
    );

    return individualContractFormated;
  }

  public async findCustomerByPhone(phone: string): Promise<Customer> {
    const formattedPhone = Number(phone);

    const foundCustomer: Customer = await this.customersRepository.findOne({
      where: {
        phone: formattedPhone,
      },
      relations: ['contracts'],
    });

    Guard.isFound(foundCustomer, errorMessages.customerNotFound);
    Guard.isFound(!foundCustomer.isDeleted, errorMessages.customerDeleted);

    return foundCustomer;
  }
}
