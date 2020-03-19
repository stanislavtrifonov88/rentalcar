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
import { IndividualContractDTO } from './models/individualContract.dto';


@Controller('contracts')
export class ContractsController {
    public constructor(private readonly contractsService: ContractsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAllAvailableCars () {
      const allContracts: IndividualContractDTO[] = await this.contractsService.getAllContracts();
      console.log(allContracts)

      return allContracts;
    }

    @Post('/car/:carId')
    @HttpCode(HttpStatus.CREATED)
    public async newContract(
      @Body() body: NewContractDTO,
      @Param('carId') carId: string,
    ): Promise<IndividualContractDTO> {

      const individualContract: IndividualContractDTO = await this.contractsService.createContract(body, carId);

      return individualContract;
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
