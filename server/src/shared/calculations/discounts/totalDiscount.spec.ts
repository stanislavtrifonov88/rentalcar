import { totalDiscount } from './totalDiscount';
import { getReturnCarData } from '../getReturnedData.spec';

describe('totalDiscount', () => {
    const returnedCarData = getReturnCarData({ phone:'359888111444' });
    const daysDiscountFunctionMock = jest.fn(() => -1);
    const ageDiscountFunctionMock = jest.fn(() => 2);
    const loyaltyDiscountFunctionMock = jest.fn(() => 2);
    const geoDiscountFunctionMock = jest.fn(() => 2);
    
    it('should return the sum of all the functions provided to it', () => {
      // Arramge
      const defaultDiscountFnsMock: any = [
        daysDiscountFunctionMock,
        ageDiscountFunctionMock,
      ];
    
      // Act
      const result = totalDiscount(
        returnedCarData,
        defaultDiscountFnsMock,
      );
      // Assert
    
      expect(result).toEqual(1);
    });
    
    it('should return the sum of all the functions provided to it', () => {
      // Arramge
      const defaultDiscountFnsMock: any = [
        daysDiscountFunctionMock,
        ageDiscountFunctionMock,
        loyaltyDiscountFunctionMock,
        geoDiscountFunctionMock,
      ];
    
      // Act
      const result = totalDiscount(
        returnedCarData,
        defaultDiscountFnsMock,
      );
    
      // Assert
      expect(result).toEqual(5);
    });
    });