import defaultDiscountFns from "./discounts"

interface ContractData {
  
}


class DiscountCalc {

  calcDiscounts(contractData: ContractData,discountFns: Array<(c: ContractData) => number>): number {    

    const realDiscountFn = discountFns ?? defaultDiscountFns;

    let discount = 0;

    realDiscountFn.forEach(discountFn => {
      discount += discountFn(contractData);
    });    

    return discount;
  }
}

