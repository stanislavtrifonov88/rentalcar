import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../database/entities/car.entity';
import { Class } from '../database/entities/class.entity';
import { identity } from 'rxjs';

describe('CarsService', () => {
  let service: CarsService;
  const carsRepository = {
    find() {
      /* empty */
    },
    findOne() {
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

  it('getAllAvailableCars should call *find* method with the correct filtering object', async () => {

    // Arrange

    const spy = jest
      .spyOn(carsRepository, 'find')
      .mockImplementation(async () => []);

    const expectedObject = {
      where: {
        isBorrowed: false,
        isDeleted: false,
      },
      relations: ['className'],
    };

    // Act

    await service.getAllAvailableCars();

    /// Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedObject);

    spy.mockClear();
  });

  it('getAllAvailableCars should return the result from *find*', async () => {

    // Arrange
    const carMock = 'test'

    const spy = jest
      .spyOn(carsRepository, 'find')
      .mockImplementation(async () => carMock);

    // Act
    const result = await service.getAllAvailableCars()

    /// Assert
    expect(result).toBe(carMock)

    spy.mockClear();
  });


  it('getIndividualCar should call *findOne* method with the correct filtering object', async () => {

    // Arrange
    const id = 'test'

    const spy = jest
      .spyOn(carsRepository, 'findOne')
      .mockImplementation(async () => []);

    const expectedObject = {
      where: {
        id: id,
        isBorrowed: false,
        isDeleted: false,
      },
      relations: ['className'],
    };

    // Act

    await service.getIndividualCar(id);

    /// Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedObject);

    spy.mockClear();
  });


  it('getIndividualCar should return the result from *findOne*', async () => {

    // Arrange
    const id = '1234'
    const carMock = 'test'

    const spy = jest
      .spyOn(carsRepository, 'findOne')
      .mockImplementation(async () => carMock);

    // Act
    const result = await service.getIndividualCar(id)

    /// Assert
    expect(result).toBe(carMock)

    spy.mockClear();
  });
});
