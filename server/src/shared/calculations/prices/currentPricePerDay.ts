import { estimatedPricePerDay } from './index';
import { overduePenalty } from '../days/index';

export const currentPricePerDay = (
    contractData,
    estimatedPricePerDayFn = estimatedPricePerDay,
    overduePenaltyFn = overduePenalty,
  ) => {
    const estimatedPricePerDayValue = estimatedPricePerDayFn(contractData);
    const overduePenaltyValue = overduePenaltyFn(contractData);
  
    return estimatedPricePerDayValue * overduePenaltyValue;
  };