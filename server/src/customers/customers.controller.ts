import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { IndividualCustomerDTO } from './models/individualCustomerDTO';
import { NewCustomerDTO } from './models/newCustomerDTO';

@Controller('customers')
export class CustomersController {
  public constructor(private readonly customersService: CustomersService) {}

  @Put('')
  @HttpCode(HttpStatus.OK)
  public async getIndividualCustomer(
    @Body() body,
  ): Promise<IndividualCustomerDTO> {
    const individualCar: IndividualCustomerDTO = await this.customersService.getCustomerByPhone(
      body.phone,
    );

    return individualCar;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async newCustomer(
    @Body() body: NewCustomerDTO,
  ): Promise<IndividualCustomerDTO> {
    const newCustomer: IndividualCustomerDTO = await this.customersService.createNewCustomer(
      body,
    );

    return newCustomer;
  }
}
