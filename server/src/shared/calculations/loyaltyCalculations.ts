

export const loyaltyDiscount = (customerData) => {
    const previousContracts = customerData.contracts.length;
   let discount = 0

    if (previousContracts === 0) {
        discount = 0.2;
    } else if(previousContracts >= 1 && previousContracts <= 4) {
        discount = 0;
    }  else if(previousContracts >= 5 && previousContracts <= 9) {
        discount = 0.5;
    }  else if(previousContracts >= 10 && previousContracts <= 19) {
        discount = 0.7;
    } else if (previousContracts >= 20) {
        discount = 0.7;
    }

  return discount;
};

export const geoDiscount = (customerData) => {
    const previousContracts = 0.05

  return previousContracts
};