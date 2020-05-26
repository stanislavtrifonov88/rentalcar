import * as discounts from '../../discounts/discounts';

export const ageDiscount = contractData => {
    if (contractData.age > 25) {
      return discounts.ageDiscountAbove26;
    }
    if (contractData.age >= 18 && contractData.age <= 25) {
      return discounts.ageDiscount18To25;
    }
  
    return 0;
  };