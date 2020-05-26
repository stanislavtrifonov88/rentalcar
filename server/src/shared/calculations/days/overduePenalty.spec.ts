
import * as discounts from '../../discounts/discounts';
import { getReturnCarData } from '../getReturnedData';
import { overduePenalty } from './overduePenalty';

describe('overduePenalty', () => {
    const daysOverdue = [
      {
        name:
          'case 1.1: should return priceDiscounts.overduePenaltyBelow1Day if overdue days < 1',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 0,
        result: discounts.overduePenaltyBelow1Day,
      },
      {
        name: 'case 1.2: should return 1 if overdue days < 1',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 0.99,
        result: discounts.overduePenaltyBelow1Day,
      },
      {
        name:
          'case 2.1: should return priceDiscounts.overduePenaltyBelow1Day if overdue days between 2-6',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 2,
        result: discounts.overduePenalty2To6Days,
      },
      {
        name:
          'case 2.2: should return priceDiscounts.overduePenaltyBelow1Day if overdue days between 2-6',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 4,
        result: discounts.overduePenalty2To6Days,
      },
      {
        name:
          'case 2.3: should return priceDiscounts.overduePenaltyBelow1Day if overdue days between 2-6',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 6,
        result: discounts.overduePenalty2To6Days,
      },
      {
        name:
          'case 3.1: should return priceDiscounts.overduePentaltyAbove6Days if overdue days are 7+',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 7,
        result: discounts.overduePentaltyAbove6Days,
      },
      {
        name:
          'case 3.2: should return priceDiscounts.overduePentaltyAbove6Days if overdue days are 7+',
        input: { contractEndDate: 'not applicable' },
        overdueDays: 27,
        result: discounts.overduePentaltyAbove6Days,
      },
    ];
  
    daysOverdue.forEach(test => {
      it(test.name, () => {
        //arrange
        const overdueDaysFn = jest.fn(() => test.overdueDays);
        const returnedCarData = getReturnCarData(test.input);
        //act
        const result = overduePenalty(
          returnedCarData,
          overdueDaysFn,
        );
        //assert
        expect(result).toEqual(test.result);
      });
    });
  });