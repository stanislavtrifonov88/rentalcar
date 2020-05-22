import { geoDiscount } from './geoDiscount';
import * as discounts from './discounts/priceDiscounts';

describe("geoDiscount", () => {
    const getCustomerData = (phone) => ({ phone })
  
    const tests = [
      { name: "given 359 phone should return geoDiscount", phone: '359885885885', expectedDiscount: discounts.geoDiscount},
      { name: "given 40 phone should return geoDiscount", phone: '40885885885', expectedDiscount: discounts.geoDiscount},
      { name: "given 351 phone should return no discount", phone: '351351356', expectedDiscount: 0},
    ]
  
    tests.forEach((test)=> {
      it(test.name, () => {
        //arrange
        const customerData = getCustomerData(test.phone);
        //act
        const result = geoDiscount(customerData);
        //assert
        expect(result).toEqual(test.expectedDiscount)
      })
    })
  })