import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Body,
    Param,
  } from '@nestjs/common';

import { ContractsService } from './contracts.service';
import { Contract } from '../database/entities/contract.entity';
import { NewContractDTO } from './models/newContract.dto';


@Controller('contracts')
export class ContractsController {
    public constructor(private readonly contractsService: ContractsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAllAvailableCars () {
      const allContracts: Contract[] = await this.contractsService.getAllContracts();

      return allContracts;
    }

    @Post('/car/:carId')
    @HttpCode(HttpStatus.CREATED)
    public async newContract(
      @Body() body: NewContractDTO,
      @Param('carId') carId: string,
    ): Promise<Contract> {

      return await this.contractsService.createContract(body, carId);
    }

    @Post(':contractId')
    @HttpCode(HttpStatus.CREATED)
    public async returnCar(
      @Body() body: {name: number},
      @Param('contractId') contractId: string,
    ): Promise<Contract> {

      return await this.contractsService.returnCar(contractId, body);
    }
  
}
