
import { currentPricePerDay } from './currentPricePerDay';
import { overdueDays } from '../days/overdueDays';
import { estimatedPricePerDay } from './estimatedPricePerDay';
import { currentDaysRented } from '../days/currentDaysRented';

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
  