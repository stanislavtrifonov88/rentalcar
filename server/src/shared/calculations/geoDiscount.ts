import * as discounts from '../discounts/discounts';

export const geoDiscount = customerData => {
    customerData.phone.toString();
    let previousContracts = 0;
  
    if (customerData.phone.substring(0, 3) === '359') {
      previousContracts = discounts.geoDiscount;
    }
  
    if (customerData.phone.substring(0, 2) === '40') {
      previousContracts = discounts.geoDiscount;
    }
  
    return previousContracts;
  };