import { estimatedPricePerDay } from './estimatedPricePerDay';
import { overduePenalty } from '../days/overduePenalty';

export const currentPricePerDay = (
    contractData,
    estimatedPricePerDayFn = estimatedPricePerDay,
    overduePenaltyFn = overduePenalty,
  ) => {
    const estimatedPricePerDayValue = estimatedPricePerDayFn(contractData);
    const overduePenaltyValue = overduePenaltyFn(contractData);
  
    return estimatedPricePerDayValue * overduePenaltyValue;
  };