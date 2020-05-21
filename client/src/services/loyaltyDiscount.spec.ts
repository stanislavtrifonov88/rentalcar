import { loyaltyDiscount } from './loyaltyDiscount';
import * as discounts from './discounts/priceDiscounts';

describe('loyaltyDiscount', () => {
  const getCustomerData = (previousContracts) => ({ previousContracts })

  const tests = [
    { name: "case 1: given no previous contracts, should return previousContracts0", previousContracts: 0, expectedDiscount: discounts.previousContracts0},
    { name: "case 2: given 1-4 previous contracts, should return previousContracts1To4", previousContracts: 4, expectedDiscount: discounts.previousContracts1To4},
    { name: "case 3: given 5-9 previous contracts, should return previousContracts5To9", previousContracts: 9, expectedDiscount: discounts.previousContracts5To9},
    { name: "case 4: given 10-19 previous contracts, should return previousContracts1To4", previousContracts: 19, expectedDiscount: discounts.previousContracts10To19},
    { name: "case 5: given 20+ previous contracts, should return previousContracts1To4", previousContracts: 20, expectedDiscount: discounts.previousContractsAbove20},
  ]

  tests.forEach((test)=> {
    it(test.name, () => {
      //arrange
      const customerData =  getCustomerData(test.previousContracts);
      //act
      const result = loyaltyDiscount(customerData);
      //assert
      expect(result).toEqual(test.expectedDiscount)
    })
  })
})