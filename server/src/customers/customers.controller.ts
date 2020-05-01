import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../database/entities/customer.entity';
import { IndividualCustomerDTO } from './models/individualCustomerDTO';

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
}
