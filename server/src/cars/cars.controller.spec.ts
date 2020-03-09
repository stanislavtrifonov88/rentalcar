import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

describe('Cars Controller', () => {
  let controller: CarsController;
  const carsService = {
    getAllAvailableCars() {
      /* empty */
    },

    getIndividualCar() {
      /* empty */
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: carsService,
        },
      ],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllAvailableCars should return the result from carsService.getAllAvailableCars()', async () => {
    // Arrange
    const output = 'test';

    const spy = jest
      .spyOn(carsService, 'getAllAvailableCars')
      .mockImplementation(async () => output);

    // Act

    const result = await carsService.getAllAvailableCars();

    // Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(output);

    spy.mockClear();
  });

  it('getIndividualCar should return the result from carsService.getIndividualCar()', async () => {
    // Arrange
    const output = 'test';

    const spy = jest
      .spyOn(carsService, 'getIndividualCar')
      .mockImplementation(async () => output);

    // Act

    const result = await carsService.getIndividualCar();

    // Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(output);

    spy.mockClear();
  });
});
