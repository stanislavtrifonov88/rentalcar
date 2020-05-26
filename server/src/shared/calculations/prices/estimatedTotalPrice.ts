import { estimatedPricePerDay } from './estimatedPricePerDay';
import { estimatedDaysRented } from '../days/estimatedDaysRented';

export const estimatedTotalPrice = (
    contractData,
    estimatedPricePerDayFn = estimatedPricePerDay,
    estimatedDaysRentedFn = estimatedDaysRented,
  ) => {
    const estiamtedPricePerDayValue = estimatedPricePerDayFn(contractData);
    const estimatedDaysRentedNumber = estimatedDaysRentedFn(contractData);
  
    return estiamtedPricePerDayValue * estimatedDaysRentedNumber;
  };