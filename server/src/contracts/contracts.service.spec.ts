import { Test, TestingModule } from '@nestjs/testing';
import { ContractsService } from './contracts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { CarsService } from '../cars/cars.service';
import * as errorMessages from '../shared/errors/error.messages';

describe('ContractsService', () => {
  let service: ContractsService;

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
      create() {
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


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('returnCar should call *find* method with the correct filtering object', async () => {
  //   // Arrange

  //   const mockId = 'test';
  //   const mockedBody: any = 'test';
  //   const mockedResult: any = {test: 'test'}

  //   const spy = jest
  //     .spyOn(contractsRepository, 'findOne')
  //     .mockImplementation(async () => mockedResult);

  //   const expectedObject = {
  //     where: {
  //       id: mockId,
  //       deliveredDate: null,
  //     },
  //   };

  //   const spy2 = jest
  //   .spyOn(carsRepository, 'findOne')
  //   .mockImplementation(async () => mockedResult);

  // const expectedObject2 = {
  //   where: {
  //     id: await mockId,
  //     isBorrowed: true,
  //     isDeleted: false,
  //   },
  // };

  //   // Act

  //   await service.returnCar(mockId, mockedBody);

  //   /// Assert

  //   expect(spy).toHaveBeenCalledTimes(1);
  //   expect(spy).toHaveBeenCalledWith(expectedObject);
  //   // await expect(service.returnCar(mockId, mockedBody)).rejects.toThrowError(errorMessages.contractNotFound.msg);

  //   // spy.mockClear();
  //   // spy2.mockClear();
  // });

  it('getAllContracts should call *find* method with the correct filtering object', async () => {
    // Arrange

    const spy = jest
      .spyOn(contractsRepository, 'find')
      .mockImplementation(async () => []);

    const expectedObject = {
      where: {
        deliveredDate: null,
        isDeleted: false,
      },
    };

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

    const spy = jest
      .spyOn(contractsRepository, 'find')
      .mockImplementation(async () => [mockedCallValue,]);

    const expectedObject = {
      where: {
        deliveredDate: null,
        isDeleted: false,
      },
    };

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
