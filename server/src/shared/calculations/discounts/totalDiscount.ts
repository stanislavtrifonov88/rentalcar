
import { ageDiscount } from './ageDiscount';
import { daysDiscount } from './daysDiscount';
import { loyaltyDiscount } from './loyaltyDiscount';
import { geoDiscount } from './geoDiscount';

const defaultDiscountFns = [
    ageDiscount,
    daysDiscount,
    loyaltyDiscount,
    geoDiscount,
  ];
  
  export const totalDiscount = (
    contractData,
    discountFns = defaultDiscountFns,
  ) => {
    let discount = 0;
  
    discountFns.forEach(discountFn => {
      discount += discountFn(contractData);
    });
  
    return discount;
  };