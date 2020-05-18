import * as loyaltyDiscounts from './discounts/loyaltyDiscounts';

export const loyaltyDiscount = (customerData) => {
    const previousContracts = customerData.previousContracts;
   let discount = 0

    if (previousContracts === 0) {
        discount = loyaltyDiscounts.previousContracts0;
    } else if(previousContracts >= 1 && previousContracts <= 4) {
        discount = loyaltyDiscounts.previousContracts1To4;
    }  else if(previousContracts >= 5 && previousContracts <= 9) {
        discount = loyaltyDiscounts.previousContracts5To9;
    }  else if(previousContracts >= 10 && previousContracts <= 19) {
        discount = loyaltyDiscounts.previousContracts10To19;
    } else if (previousContracts >= 20) {
        discount = loyaltyDiscounts.previousContractsAbove20;
    }

  return discount;
};

export const geoDiscount = (customerData) => {
    customerData.phone.toString()
    let geoDiscountPercent = 0
    if (customerData.phone.substring(0,3)  === '359') {
        geoDiscountPercent = loyaltyDiscounts.geoDiscount
    }

    if (customerData.phone.substring(0,2) === '40') {
        geoDiscountPercent = loyaltyDiscounts.geoDiscount
    }
    
  return geoDiscountPercent
};