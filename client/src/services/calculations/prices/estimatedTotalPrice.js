import { estimatedPricePerDay } from './index';
import { estimatedDaysRented } from '../days/index';

export const estimatedTotalPrice = (
  contractData,
  estimatedPricePerDayFn = estimatedPricePerDay,
  estimatedDaysRentedFn = estimatedDaysRented,
) => {
  const estiamtedPricePerDayValue = estimatedPricePerDayFn(contractData);
  const estimatedDaysRentedNumber = estimatedDaysRentedFn(contractData);

  return estiamtedPricePerDayValue * estimatedDaysRentedNumber;
};
