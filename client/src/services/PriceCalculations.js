import * as priceDiscounts from "./discounts/priceDiscounts";
import { differenceInDays, dateFormatter } from "../shared/dateModifiers";
import { loyaltyDiscount } from "./loyaltyDiscount";
import { geoDiscount } from "./geoDiscount";


export const estimatedDaysRented = (
  contractData,
  differenceInDaysFn = differenceInDays,
) => {
  
  if (!contractData.startDate && !contractData.contractEndDate) {
    return 0;
  }

  const days = differenceInDaysFn(
    contractData.contractEndDate,
    contractData.startDate,
  );

  if (days >= 0 && days < 1) {
    return 1;
  }

  return Math.ceil(days);
};

export const currentDaysRented = (
  contractData,
  differenceInDaysFn = differenceInDays,
  dateFormatterFn = dateFormatter,
  today = new Date(),
) => {

  if (!contractData.startDate) {
    return 0;
  }

  const endTime = dateFormatterFn(today);
  const days = differenceInDaysFn(endTime, contractData.startDate);

  return Math.ceil(days);
};

export const overdueDays = (
  contractData,
  currentDaysRentedFunction = currentDaysRented,
  estimatedDaysRentedFunction = estimatedDaysRented,
) => {
  const currentDaysNumber = currentDaysRentedFunction(contractData);
  const estimatedDaysNumber = estimatedDaysRentedFunction(contractData);

  return currentDaysNumber - estimatedDaysNumber;
};

export const daysDiscount = (
  contractData,
  daysRentedFunc = estimatedDaysRented,
) => {
  const daysRented = daysRentedFunc(contractData);

  if (daysRented === 1) {
    return priceDiscounts.daysDiscount1day;
  }

  if (daysRented >= 2 && daysRented <= 6) {
    return priceDiscounts.daysDiscount2to6days;
  }

  if (daysRented > 6) {
    return priceDiscounts.daysDiscount7PlusDays;
  }

  return priceDiscounts.daysDiscountNegativeDays;
};

export const ageDiscount = contractData => {
  if (contractData.age > 25) {
    return priceDiscounts.ageDiscountAbove26;
  }
  if (contractData.age >= 18 && contractData.age <= 25) {
    return priceDiscounts.ageDiscount18To25;
  }

  return 0;
};

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

export const estimatedPricePerDay = (
  contractData,
  estimatedTotalDiscountFn = totalDiscount,
) => {
  const totalDiscountPercent = estimatedTotalDiscountFn(contractData);

  return (1 + totalDiscountPercent) * contractData.price;
};

export const overduePenalty = (contractData, overdueDaysFn = overdueDays) => {
  const overdueDaysNumber = overdueDaysFn(contractData);

  if (overdueDaysNumber < 1) {
    return priceDiscounts.overduePenaltyBelow1Day;
  }
  if (overdueDaysNumber <= 6) {
    return priceDiscounts.overduePenalty2To6Days;
  }

  return priceDiscounts.overduePentaltyAbove6Days;
};

export const estimatedTotalPrice = (
  contractData,
  estimatedPricePerDayFn = estimatedPricePerDay,
  estimatedDaysRentedFn = estimatedDaysRented,
) => {
  const estiamtedPricePerDayValue = estimatedPricePerDayFn(contractData);
  const estimatedDaysRentedNumber = estimatedDaysRentedFn(contractData);

  return estiamtedPricePerDayValue * estimatedDaysRentedNumber;
};

export const currentPricePerDay = (
  contractData,
  estimatedPricePerDayFn = estimatedPricePerDay,
  overduePenaltyFn = overduePenalty,
) => {
  const estimatedPricePerDayValue = estimatedPricePerDayFn(contractData);
  const overduePenaltyValue = overduePenaltyFn(contractData);

  return estimatedPricePerDayValue * overduePenaltyValue;
};

export const currentTotalPrice = (
  contractData,
  currentPricePerDayFn = currentPricePerDay,
  daysOverdueFn = overdueDays,
  estimatedPricePerDayFn = estimatedPricePerDay,
  currentDaysRentedFn = currentDaysRented,
) => {
  const currentPricePerDayValue = currentPricePerDayFn(contractData);
  const daysOverdueNumber = daysOverdueFn(contractData);
  const estimatedPricePerDayValue = estimatedPricePerDayFn(contractData);
  const currentDaysRentedNumber = currentDaysRentedFn(contractData);
  let priceOverContract = 0;
  let estimatedPrice = 0;

  if (daysOverdueNumber > 0) {
    priceOverContract = daysOverdueNumber * currentPricePerDayValue;
    estimatedPrice =
      (currentDaysRentedNumber - daysOverdueNumber) * estimatedPricePerDayValue;
  }

  if (daysOverdueNumber <= 0) {
    estimatedPrice = currentDaysRentedNumber * estimatedPricePerDayValue;
  }

  return estimatedPrice + priceOverContract;
};