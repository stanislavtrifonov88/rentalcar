import { getReturnCarData } from '../getReturnedData.spec';
import { overdueDays } from './overdueDays';

describe('daysOverdue', () => {
    const daysOverdue = [
      {
        name:
          'case 1: should return a positive number when the car is returned with a delay',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        currentDaysRented: 6,
        estimatedDaysRented: 5,
        result: 1,
      },
      {
        name: 'case 2: should return 0 if the car is return on the expected day',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        currentDaysRented: 5,
        estimatedDaysRented: 5,
        result: 0,
      },
      {
        name:
          'case 3: should return negative number when the car is returned in advance',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        currentDaysRented: 5,
        estimatedDaysRented: 6,
        result: -1,
      },
    ];
  
    daysOverdue.forEach(test => {
      it(test.name, () => {
        //arrange
        const mockCurrentDaysRented = jest.fn(() => test.currentDaysRented);
        const mockEstimatedDaysRented = jest.fn(() => test.estimatedDaysRented);
        const returnedCarData = getReturnCarData(test.input);
        //act
        const result = overdueDays(
          returnedCarData,
          mockCurrentDaysRented,
          mockEstimatedDaysRented,
        );
        //assert
        expect(result).toEqual(test.result);
      });
    });
  });