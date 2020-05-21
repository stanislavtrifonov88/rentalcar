import * as discounts from '../discounts/discounts';

export const loyaltyDiscount = customerData => {
  const previousContracts = customerData.previousContracts;
  let discount = 0;

  if (previousContracts === 0) {
    discount = discounts.previousContracts0;
  } else if (previousContracts >= 1 && previousContracts <= 4) {
    discount = discounts.previousContracts1To4;
  } else if (previousContracts >= 5 && previousContracts <= 9) {
    discount = discounts.previousContracts5To9;
  } else if (previousContracts >= 10 && previousContracts <= 19) {
    discount = discounts.previousContracts10To19;
  } else if (previousContracts >= 20) {
    discount = discounts.previousContractsAbove20;
  }

  return discount;
};


