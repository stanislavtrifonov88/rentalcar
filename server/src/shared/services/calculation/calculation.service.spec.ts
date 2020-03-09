import { Test, TestingModule } from '@nestjs/testing';
import { CalculationService } from './calculation.service';


describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationService],
    }).compile();

    service = module.get<CalculationService>(CalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('estimatedDaysRented should return only positive numbers or zero', async () => {
    return ;
  });

  it('estimatedDaysRented should throw an error if startDate < endDate ', async () => {
    return ;
  });

  it('currentDaysRented should return only positive numbers or zero', async () => {
    return ;
  });

  it('currentDaysRented should throw an error if startDate < endDate ', async () => {
    return ;
  });
});
