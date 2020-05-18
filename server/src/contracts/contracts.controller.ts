import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';

import { ContractsService } from './contracts.service';
import { NewContractDTO } from './models/newContract.dto';
import { IndividualContractDTO } from './models/individualContract.dto';

@Controller('contracts')
export class ContractsController {
  public constructor(private readonly contractsService: ContractsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllAvailableCars(): Promise<IndividualContractDTO[]> {
    const allContracts: IndividualContractDTO[] = await this.contractsService.getAllContracts();

    return allContracts;
  }

  @Post('/car/:carId')
  @HttpCode(HttpStatus.CREATED)
  public async newContract(
    @Body() body,
    @Param('carId') carId: string,
  ): Promise<IndividualContractDTO> {
    const individualContract: IndividualContractDTO = await this.contractsService.createContract(
      body,
      carId,
    );

    return individualContract;
  }

  @Put(':contractId')
  @HttpCode(HttpStatus.CREATED)
  public async returnCar(
    @Body() body: {},
    @Param('contractId') contractId: string,
  ): Promise<IndividualContractDTO> {
    const returnedCar: IndividualContractDTO = await this.contractsService.returnCar(
      contractId,
    );

    return returnedCar;
  }
}
