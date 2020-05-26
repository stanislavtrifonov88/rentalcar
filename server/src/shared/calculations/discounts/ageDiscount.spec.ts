import * as discounts from '../../discounts/discounts';
import { ageDiscount } from './ageDiscount';
import { getReturnCarData } from '../getReturnedData';

describe('ageDiscount', () => {
    const daysOverdue = [
      { name: "case 1.1: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
        input: { age: -1 },
        result: discounts.ageDiscountBelow18 },
      { name: "case 1.2: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
        input: { age: 0 },
        result: discounts.ageDiscountBelow18 },
      { name: "case 1.3: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
        input: { age: 17 },
        result: discounts.ageDiscountBelow18 },
      { name: "case 2.1: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
        input: { age: 18 },
        result: discounts.ageDiscount18To25 },
      { name: "case 2.2: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
        input: { age: 23 },
        result: discounts.ageDiscount18To25 },
      { name: "case 2.3: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
        input: { age: 25 },
        result: discounts.ageDiscount18To25 },
      { name: "case 3.1: should not add any penalty if the borrower is 26+ years old",
        input: { age: 26 },
        result: discounts.ageDiscountAbove26 },
      { name: "case 3.2: should not add any penalty if the borrower is 26+ years old",
        input: { age: 85 },
        result: discounts.ageDiscountAbove26 },
    ];
    
    daysOverdue.forEach(test => {
      it(test.name, () => {
        //arrange
        const returnedCarData = getReturnCarData(test.input);
        //act
        const result = ageDiscount(
          returnedCarData,
        );
        //assert
        expect(result).toEqual(test.result);
      })
    })
    });