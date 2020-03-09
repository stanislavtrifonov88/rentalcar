import { Test, TestingModule } from '@nestjs/testing';
import { ContractsService } from './contracts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';

describe('ContractsService', () => {
  let service: ContractsService;
  const contractsRepository = {
    find() {
      /* empty */
    },
    findOne() {
      /* empty */
    },
  };

  const carsRepository = {
    findOne() {
      /* empty */
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        {
          provide: getRepositoryToken(Contract),
          useValue: contractsRepository,
        },
        {
          provide: getRepositoryToken(Car),
          useValue: carsRepository,
        },
      ],
    }).compile();

    service = module.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllContracts should call *find* method with the correct filtering object', async () => {
    // Arrange

    const spy = jest
      .spyOn(contractsRepository, 'find')
      .mockImplementation(async () => []);

    const expectedObject = {
      where: {
        deliveredDate: 'n/a',
        isDeleted: false,
      },
      relations: ['car', 'car.className'],
    };

    // Act

    await service.getAllContracts();

    /// Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedObject);

    spy.mockClear();
  });

  it('getAllContracts should return the result from *find*', async () => {
    // Arrange
    const contractMock = 'test';

    const spy = jest
      .spyOn(contractsRepository, 'find')
      .mockImplementation(async () => contractMock);

    // Act
    const result = await service.getAllContracts();

    /// Assert
    expect(result).toBe(contractMock);

    spy.mockClear();
  });
});
