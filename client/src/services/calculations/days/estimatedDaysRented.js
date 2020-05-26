import { differenceInDays, dateFormatter } from '../../dates/dateModifiers';

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