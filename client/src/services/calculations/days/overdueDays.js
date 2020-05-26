import { estimatedDaysRented } from './estimatedDaysRented';
import { currentDaysRented } from './currentDaysRented';

export const overdueDays = (
    contractData,
    currentDaysRentedFunction = currentDaysRented,
    estimatedDaysRentedFunction = estimatedDaysRented,
  ) => {
    const currentDaysNumber = currentDaysRentedFunction(contractData);
    const estimatedDaysNumber = estimatedDaysRentedFunction(contractData);
  
    return currentDaysNumber - estimatedDaysNumber;
  };