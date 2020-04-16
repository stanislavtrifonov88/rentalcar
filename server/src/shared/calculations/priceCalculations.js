
import * as priceDiscounts from '../discounts/discounts';
import { differenceInDays, dateFormatter } from '../constants/constants'

export const estimatedDaysRented = (startTime, endTime) => {
  if (startTime === '' && endTime === '') {
    return undefined;
  }

  const days = differenceInDays(endTime, startTime)

  if (days < 1) {
    return 1;
  }

  return Math.ceil(days);
};

export const currentDaysRented = (startTime, today = new Date()) => {
  const endTime = dateFormatter(today);
  const days = differenceInDays(endTime, startTime)
  
  return Math.ceil(days);
};

export const daysOverUnderContract = (
  startTime,
  endTime,
  currentDaysRentedFunction = currentDaysRented,
  estimatedDaysRentedFunction = estimatedDaysRented,
) => {
  const currentDaysNumber = currentDaysRentedFunction(startTime);
  const estimatedDaysNumber = estimatedDaysRentedFunction(startTime, endTime);

  return currentDaysNumber - estimatedDaysNumber;
};

export const estimatedDaysDiscount = (daysRented) => {
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

export const estimatedAgeDiscount = (borrowerAge) => {
  if (borrowerAge === '') {
    return undefined;
  }
  if (borrowerAge > 25) {
    return priceDiscounts.ageDiscountAbove25;
  }
  if (borrowerAge >= 18 && borrowerAge <= 25) {
    return priceDiscounts.ageDiscountBelow25;
  }

  return priceDiscounts.ageDiscountBelow18;
};

export const estimatedPricePerDay = (
  daysRented,
  borrowerAge,
  carBasePrice,
  estimatedDaysDiscountFunction = estimatedDaysDiscount,
  estimatedAgeDiscountFunction = estimatedAgeDiscount,
) => {
  const daysDiscount = estimatedDaysDiscountFunction(daysRented);
  const ageDiscount = estimatedAgeDiscountFunction(borrowerAge);

  return carBasePrice * daysDiscount * ageDiscount;
};


export const overduePenalty = (
  overUnderDaysRented,
) => {
  if (overUnderDaysRented < 1) {
    return 1;
  }
  if (overUnderDaysRented < 6) {
    return 1.5;
  }

  return 2;
};

export const currentPricePerDay = (
  overduePenaltyPercent,
  estimatedDailyPrice,
) => overduePenaltyPercent * estimatedDailyPrice;
