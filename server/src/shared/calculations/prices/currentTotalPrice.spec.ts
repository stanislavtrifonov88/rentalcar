import { getReturnCarData } from '../getReturnedData';
import { currentTotalPrice } from './currentTotalPrice';


describe('CurrentTotalPrice ', () => {
    const currentTotalPriceData = [
      {
        name:
          'case 1: should return the total price without interest when car returned on time',
        input: { contractEndDate: 'not applicable' },
        currentPricePerDay: 10,
        daysOverdue: 0,
        estimatedPricePerDay: 11,
        currentDaysRented: 10,
        result: 110,
      },
      {
        name:
          'case 2: should return the total price without interest when car returned in advance',
        input: { contractEndDate: 'not applicable' },
        currentPricePerDay: 10,
        daysOverdue: -1,
        estimatedPricePerDay: 11,
        currentDaysRented: 10,
        result: 110,
      },
      {
        name:
          'case 3: should return the total price with interest when there is a late car return',
        input: { contractEndDate: 'not applicable' },
        currentPricePerDay: 11,
        daysOverdue: 1,
        estimatedPricePerDay: 10,
        currentDaysRented: 11,
        result: 111,
      },
    ];
  
    currentTotalPriceData.forEach(test => {
      it(test.name, () => {
        //arrange
        const currentPricePerDayMock = jest.fn(() => test.currentPricePerDay);
        const daysOverdueMock = jest.fn(() => test.daysOverdue);
        const estimatedPricePerDayMock = jest.fn(() => test.estimatedPricePerDay);
        const currentDaysRentedMock = jest.fn(() => test.currentDaysRented);
        const returnedCarData = getReturnCarData(test.input);
  
        //act
        const result = currentTotalPrice(
          returnedCarData,
          currentPricePerDayMock,
          daysOverdueMock,
          estimatedPricePerDayMock,
          currentDaysRentedMock,
        );
  
        //assert
        expect(result).toEqual(test.result);
      });
    });
  });
  