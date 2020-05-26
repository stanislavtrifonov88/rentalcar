import * as discounts from '../../discounts/discounts';
import { estimatedDaysRented } from '../days/estimatedDaysRented';

export const daysDiscount = (
    contractData,
    daysRentedFunc = estimatedDaysRented,
  ) => {
    const daysRented = daysRentedFunc(contractData);
  
    if (daysRented === 1) {
      return discounts.daysDiscount1day;
    }
  
    if (daysRented >= 2 && daysRented <= 6) {
      return discounts.daysDiscount2to6days;
    }
  
    if (daysRented > 6) {
      return discounts.daysDiscount7PlusDays;
    }
  
    return discounts.daysDiscountNegativeDays;
  };