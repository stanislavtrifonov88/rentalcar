
import * as priceDiscounts from '../discounts/discounts';
import { differenceInDays, dateFormatter } from '../constants/dateModifiers'
import { IndividualContractDTO } from '../../contracts/models/individualContract.dto';

export const estimatedDaysRented = (
  contractData: IndividualContractDTO, 
  differenceInDaysFn = differenceInDays,
  ): number => {
  if (contractData.startDate === '' && contractData.contractEndDate === '') {
    return 0;
  }

  const days = differenceInDaysFn(contractData.contractEndDate, contractData.startDate);

  if (days < 1) {
    return 1;
  }

  return Math.ceil(days);
};

export const currentDaysRented = (
  contractData: IndividualContractDTO,
  differenceInDaysFn = differenceInDays,
  dateFormatterFn = dateFormatter,
  today = new Date(),
): number => {
  const endTime = dateFormatterFn(today);
  const days = differenceInDaysFn(endTime, contractData.startDate);

  return Math.ceil(days);
};

export const overdueDays = (
  contractData: IndividualContractDTO,
  currentDaysRentedFunction = currentDaysRented,
  estimatedDaysRentedFunction = estimatedDaysRented,
): number => {
  const currentDaysNumber = currentDaysRentedFunction(contractData);
  const estimatedDaysNumber = estimatedDaysRentedFunction(contractData);

  return currentDaysNumber - estimatedDaysNumber;
};

export const daysDiscount = (
  contractData: IndividualContractDTO,
  daysRentedFunc = estimatedDaysRented
  ): number => {
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

  return 0;
};

export const ageDiscount = (
  contractData: IndividualContractDTO
  ): number => {
  if (contractData.borrowerAge > 25) {
    return priceDiscounts.ageDiscountAbove25;
  }
  if (contractData.borrowerAge >= 18 && contractData.borrowerAge <= 25) {
    return priceDiscounts.ageDiscountBelow25;
  }

  return 0;
};

const defaultDiscountFns = [ageDiscount, daysDiscount];

export const totalDiscount = (contractData: IndividualContractDTO, discountFns = defaultDiscountFns): number => {
  let discount = 0;

  discountFns.forEach((discountFn) => {
    discount += discountFn(contractData);
  });

  return discount;
};

export const estimatedPricePerDay = (
  contractData,
  estimatedTotalDiscountFn = totalDiscount,
) => {
  const totalDiscountPercent = estimatedTotalDiscountFn(contractData);

  return (1 - totalDiscountPercent) * contractData.price;
};

export const overduePenalty = (
  contractData: IndividualContractDTO,
  overdueDaysFn = overdueDays,
): number => {
  const overdueDaysNumber = overdueDaysFn(contractData);

  if (overdueDaysNumber < 1) {
    return 1;
  }
  if (overdueDaysNumber < 6) {
    return 1.5;
  }

  return 2;
};

export const estimatedTotalPrice = (
  contractData: IndividualContractDTO,
  estimatedPricePerDayFn = estimatedPricePerDay,
  estimatedDaysRentedFn = estimatedDaysRented,
): number => {
  const estiamtedPricePerDayValue = estimatedPricePerDayFn(contractData);
  const estimatedDaysRentedNumber = estimatedDaysRentedFn(contractData);

  return estiamtedPricePerDayValue * estimatedDaysRentedNumber;
};

export const currentPricePerDay = (
  contractData: IndividualContractDTO,
  estimatedPricePerDayFn = estimatedPricePerDay,
  overduePenaltyFn = overduePenalty,
): number => {
  const estimatedPricePerDayValue = estimatedPricePerDayFn(contractData);
  const overduePenaltyValue = overduePenaltyFn(contractData);

  return estimatedPricePerDayValue * overduePenaltyValue;
};

export const currentTotalPrice = (
  contractData: IndividualContractDTO,
  currentPricePerDayFn = currentPricePerDay,
  daysOverdueFn = overdueDays,
  estimatedTotalPriceFn = estimatedTotalPrice,
): number => {
  const currentPricePerDayValue = currentPricePerDayFn(contractData);
  const d = daysOverdueFn(contractData);
  const estimatedTotalPriceValue = estimatedTotalPriceFn(contractData);
  let priceOverContract = 0;

  if (d > 0) {
    priceOverContract = d * currentPricePerDayValue;
  }

  return estimatedTotalPriceValue + priceOverContract;
};