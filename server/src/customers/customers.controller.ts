import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../database/entities/customer.entity';

@Controller('customers')
export class CustomersController {
    public constructor(private readonly customersService: CustomersService) { }

    @Get('/:phone')
    @HttpCode(HttpStatus.OK)
    public async getIndividualCar (
      @Param('phone') id: string,
    ): Promise<Customer> {
      const individualCar: Customer = await this.customersService.getCustomerByPhone(id);

      return individualCar;
    }
}
