import * as loyaltyDiscounts from '../discounts/loyaltyDiscounts';

export const loyaltyDiscount = (customerData) => {
    const previousContracts = customerData.contracts.length;
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
    const previousContracts = 0.05

  return previousContracts
};