import { Controller, Get, HttpCode, HttpStatus, Param, Body, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../database/entities/customer.entity';
import { IndividualCustomerDTO } from './models/individualCustomerDTO';
import { NewCustomerDTO } from './models/newCustomerDTO';

@Controller('customers')
export class CustomersController {
    public constructor(private readonly customersService: CustomersService) { }

    @Get('/:phone')
    @HttpCode(HttpStatus.OK)
    public async getIndividualCar (
      @Param('phone') id: string,
    ): Promise<IndividualCustomerDTO> {
      const individualCar: IndividualCustomerDTO = await this.customersService.getCustomerByPhone(id);

      return individualCar;
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    public async newContract(
      @Body() body: NewCustomerDTO,
    ): Promise<IndividualCustomerDTO> {

      const newCustomer: IndividualCustomerDTO = await this.customersService.createNewCustomer(body);

      return newCustomer;
    }
}
