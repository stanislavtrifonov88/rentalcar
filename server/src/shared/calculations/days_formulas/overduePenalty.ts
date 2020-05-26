import * as discounts from '../../discounts/discounts';
import { overdueDays } from './overdueDays';

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