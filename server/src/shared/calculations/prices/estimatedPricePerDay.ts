import { totalDiscount } from '../discounts/totalDiscount';

export const estimatedPricePerDay = (
    contractData,
    estimatedTotalDiscountFn = totalDiscount,
  ) => {
    const totalDiscountPercent = estimatedTotalDiscountFn(contractData);
  
    return (1 + totalDiscountPercent) * contractData.price;
  };