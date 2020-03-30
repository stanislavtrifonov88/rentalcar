import { Test, TestingModule } from '@nestjs/testing';
import { ContractsService } from './contracts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { CarsService } from '../cars/cars.service';
import * as errorMessages from '../shared/errors/error.messages';

describe('ContractsService', () => {
  let service: ContractsService;
  let spy;
  let expectedObject;

  const contractsRepository = {
    find() {
      /* empty */
    },
    findOne() {
      /* empty */
    },
    save() {
      /* empty */
    },
    create() {
      /* empty */
    },
  };

  const carsRepository = {
    find() {
        /* empty */
      },
    findOne() {
        /* empty */
      },
    save() {
        /* empty */
      },
  };

  const carsService = {
    getAllAvailableCars() {
      /* empty */
    },

    getIndividualCar() {
      /* empty */
    },

    getAvailableCarById() {
      /* empty */
    },
    getBorrowedCarById() {
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
        {
          provide: CarsService,
          useValue: carsService,
        },
      ],
    }).compile();

    service = module.get<ContractsService>(ContractsService);


  spy = jest
    .spyOn(contractsRepository, 'find')
    .mockImplementation(async () => ['test']);

  expectedObject = {
    where: {
      deliveredDate: null,
      isDeleted: false,
    },
  };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllContracts should call *find* method with the correct filtering object', async () => {
    // Arrange

    // Act

    await service.getAllContracts();

    /// Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedObject);

    spy.mockClear();
  });


  it('getAllContracts should call *transformToContractDTO* function with the correct filtering object', async () => {
    // Arrange
    const mockedCallValue = 'test'

    const mockTransformer = jest.fn();
    mockTransformer.mockReturnValue(mockedCallValue)

    // Act

    await service.getAllContracts(mockTransformer);

    /// Assert

    expect(mockTransformer).toHaveBeenCalledTimes(1);
    expect(mockTransformer).toHaveBeenCalledWith('test');

    spy.mockClear();
  });

});
