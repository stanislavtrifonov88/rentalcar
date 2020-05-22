import * as discounts from '../discounts/discounts';
import { differenceInDays, dateFormatter } from '../constants/dateModifiers';
import { totalDiscount } from './discount_formulas/totalDiscount';
import { estimatedDaysRented } from './days_formulas/estimatedDaysRented';
import { currentDaysRented } from './days_formulas/currentDaysRented';
import { overdueDays } from './days_formulas/overdueDays';

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
    return discounts.overduePenaltyBelow1Day;
  }
  if (overdueDaysNumber <= 6) {
    return discounts.overduePenalty2To6Days;
  }

  return discounts.overduePentaltyAbove6Days;
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
