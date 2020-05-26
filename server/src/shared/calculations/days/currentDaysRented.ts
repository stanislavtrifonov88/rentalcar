import { differenceInDays, dateFormatter } from '../../constants/dateModifiers';

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