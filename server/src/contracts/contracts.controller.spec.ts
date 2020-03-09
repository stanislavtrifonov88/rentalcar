import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

describe('Contracts Controller', () => {
  let controller: ContractsController;
  const contractsService = {
    getAllContracts() {
      /*empty*/
    },
    returnCar() {
      /*empty*/
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [{ provide: ContractsService, useValue: contractsService }],
    }).compile();

    controller = module.get<ContractsController>(ContractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllContracts should return the result from contractsService.getAllContracts()', async () => {
    // Arrange
    const output = 'test';

    const spy = jest
      .spyOn(contractsService, 'getAllContracts')
      .mockImplementation(async () => output);

  // Act

  const result = await contractsService.getAllContracts()

  // Assert

  expect(spy).toHaveBeenCalledTimes(1)
  expect(result).toEqual(output);

  spy.mockClear();
});
});
