import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { Car } from '../database/entities/car.entity';
import { Class } from '../database/entities/class.entity';
import * as errorMessages from '../shared/errors/error.messages'

describe('CarsService', () => {
  let service: CarsService;

  const carsRepository = {
    find(): any {
      /* empty */
    },
    findOne(): any {
      /* empty */
    },
  };

  const classesRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: carsRepository,
        },
        {
          provide: getRepositoryToken(Class),
          useValue: classesRepository,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAvailableCarById should call *findOne* method with the correct filtering object', async () => {

    // Arrange
    const id = 'test'

    const spy = jest
      .spyOn(carsRepository, 'findOne')
      .mockImplementation(async () => []);

    const expectedObject = {
      where: {
        id,
        isDeleted: false,
      },
    };

    // Act

    await service.getAvailableCarById(id);

    // / Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedObject);

    spy.mockClear();
  });




  it('getAllAvailableCars should call *find* method with the correct filtering object', async () => {

    // Arrange

    const spy = jest
      .spyOn(carsRepository, 'find')
      .mockImplementation(async () => ['test']);

    const expectedObject = {
      where: {
        isBorrowed: false,
        isDeleted: false,
      },
    };

    const mockTransformer = jest.fn();
    mockTransformer.mockReturnValue("test")

    // Act

    await service.getAllAvailableCars(mockTransformer);

    // / Assert

    expect(mockTransformer).toHaveBeenCalledTimes(1);
    expect(mockTransformer).toHaveBeenCalledWith("test");

    spy.mockClear();
  });

  it('getIndividualCar should call transformToCarDTO function once', async () => {

    // Arrange
    const id = 'test'

    const mockTransformer = jest.fn();
    mockTransformer.mockReturnValue("test")

    // Act

    await service.getIndividualCar(id, mockTransformer);

    // / Assert

    expect(mockTransformer).toHaveBeenCalledTimes(1);

  });

  it('getIndividualCar should return the result of transformToCarDTO', async () => {

    // Arrange
    const id = '123';
    const mockedResult = 'test'

    const mockTransformer = jest.fn();
    mockTransformer.mockReturnValue("test")

    // Act

    const result = await service.getIndividualCar(id, mockTransformer);

    // / Assert
    expect(result).toBe(mockedResult)

  });


  it('getAvailableCarById should throw an error if *findOne* method returns undefined', async () => {

    // Arrange
    const id = '12345'

    const spy = jest
      .spyOn(carsRepository, 'findOne')
      .mockImplementation(async () => undefined);

    const expectedObject = {
      where: {
        id,
        isBorrowed: false,
        isDeleted: false,
      },
    };


    // Act && Assert

    await expect(service.getAvailableCarById(id)).rejects.toThrowError(errorMessages.carNotFound);

    spy.mockClear();
  });


  it('getBorrowedCarById should throw an error if *findOne* method returns undefined', async () => {

    // Arrange
    const id = '12345'

    const spy = jest
      .spyOn(carsRepository, 'findOne')
      .mockImplementation(async () => undefined);

    const expectedObject = {
      where: {
        id,
        isBorrowed: false,
        isDeleted: false,
      },
    };

    // Act && Assert

    await expect(service.getBorrowedCarById(id)).rejects.toThrowError(errorMessages.borrowedCarNotFound);

    spy.mockClear();
  });

});
