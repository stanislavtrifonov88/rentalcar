import { estimatedDaysRented } from './estimatedDaysRented';
import { getReturnCarData } from '../getReturnedData';

describe('estimatedDaysRented', () => {
    const daysRented = [
      {
        name: 'case 1.1: if dates are not defined or empty string return 0',
        input: { startDate: undefined, contractEndDate: '' },
        daysRented: 1,
        result: 0,
      },
  
      {
        name: 'case 1.2: if dates are not defined or empty string return 0',
        input: { startDate: '', contractEndDate: undefined },
        daysRented: 1,
        result: 0,
      },
  
      {
        name: 'case 1.3: if dates are not defined or empty string return 0',
        input: { startDate: '', contractEndDate: '' },
        daysRented: 1,
        result: 0,
      },
  
      {
        name: 'case: 2.1: if difference between dates is between 0 and 1, it is considered as 1 day',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        daysRented: 0.01,
        result: 1,
      },
  
      {
        name: 'case: 2.2: if difference between dates is between 0 and 1, it is considered as 1 day',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        daysRented: 0.5,
        result: 1,
      },
  
      {
        name: 'case: 2.3: if difference between dates is between 0 and 1, it is considered as 1 day',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        daysRented: 0.99,
        result: 1,
      },
  
      {
        name: 'case 3: if difference between dates is 1 day - no change',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        daysRented: 1,
        result: 1,
      },
  
      {
        name: 'case 4: if more than 1 it should round ceiling',
        input: { startDate: 'not needed', contractEndDate: 'not applicable' },
        daysRented: 1.1,
        result: 2,
      },
    ];
  
    // testing estimatedDaysRented
  
    daysRented.forEach(test => {
      it(test.name, () => {
        //arrange
        const daysRentedMock = jest.fn(() => test.daysRented);
        const returnedCarData = getReturnCarData(test.input);
        //act
        const result = estimatedDaysRented(
          returnedCarData,
          daysRentedMock,
        );
        //assert
        expect(result).toEqual(test.result);
      });
    });
  });