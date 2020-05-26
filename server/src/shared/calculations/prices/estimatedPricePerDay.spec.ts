import { estimatedPricePerDay } from './estimatedPricePerDay';
import { getReturnCarData } from '../getReturnedData';

describe('estimatedPricePerDay', () => {
    it('should return the base price after discouns', () => {
      // Arramge
      const returnedCarData = getReturnCarData({ phone: '359888111444' });
      const totalDiscountMock = jest.fn(x => -0.1);
  
      // Act
      const result = estimatedPricePerDay(
        returnedCarData,
        totalDiscountMock,
      );
  
      // Assert
      expect(result).toEqual(63);
    });
  });