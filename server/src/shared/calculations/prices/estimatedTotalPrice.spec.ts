import { getReturnCarData } from '../getReturnedData';
import { estimatedTotalPrice } from './estimatedTotalPrice';

describe('estimatedTotalPrice', () => {
    const returnedCarData = getReturnCarData({ phone: 'not applicable' });
  
    it('should return the product of estiamtedPricePerDay and estimatedDaysRented', () => {
      // Arramge
      const estimatedDaysRentedMock = jest.fn(() => 2);
      const estiamtedPricePerDayMock = jest.fn(() => 2);
  
      // Act
      const result = estimatedTotalPrice(
        returnedCarData,
        estimatedDaysRentedMock,
        estiamtedPricePerDayMock,
      );
  
      // Assert
      expect(result).toEqual(4);
    });
  });