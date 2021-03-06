import { getReturnCarData } from '../getReturnedData';
import { currentPricePerDay } from './currentPricePerDay';

describe('currentPricePerDay ', () => {
    const returnedCarData = getReturnCarData({ phone: 'not applicable' });
    it('should return the product of its inputs', () => {
      // Arramge
      const estimatedPricePerDayMock = jest.fn(() => 2);
      const overduePenaltyMock = jest.fn(() => 2);
  
      // Act
      const result = currentPricePerDay(
        returnedCarData,
        estimatedPricePerDayMock,
        overduePenaltyMock,
      );
      // Assert
  
      expect(result).toEqual(4);
    });
  });