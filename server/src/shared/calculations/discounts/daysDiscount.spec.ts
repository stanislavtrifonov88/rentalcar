
import * as discounts from '../../discounts/discounts';
import { daysDiscount } from './daysDiscount';

const getReturnCarData = (input) => {
    const defaults = {
      startDate: '2020-05-18T11:55:00.000Z',
      contractEndDate: '2020-05-20T22:01:00.000Z',
      phone: '359888111444',
      age: 52,
      price: 70,
      previousContracts: 54,
    }
    return Object.assign(defaults, input);
  }

describe('daysDiscount', () => {
    const daysOverdue = [
      { name: "case 1:  should return priceDiscounts.daysDiscount1day if the car is rented for 1 day",
        input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
        mockDaysRented: 1, 
        result: discounts.daysDiscount1day },
      { name: "case 2.1:  should return priceDiscounts.daysDiscount2to6days if the car is rented for 2-6 days",
        input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
        mockDaysRented: 2, 
        result: discounts.daysDiscount2to6days },
      { name: "case 2.2:  should return priceDiscounts.daysDiscount2to6days if the car is rented for 2-6 days",
        input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
        mockDaysRented: 4, 
        result: discounts.daysDiscount2to6days },
      { name: "case 2.3:  should return priceDiscounts.daysDiscount2to6days if the car is rented for 2-6 days",
        input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
        mockDaysRented: 4, 
        result: discounts.daysDiscount2to6days },
      { name: "case 3:  should return priceDiscounts.daysDiscount7PlusDays if the car is rented for 6+ days",
        input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
        mockDaysRented: 7, 
        result: discounts.daysDiscount7PlusDays },
      { name: "case 4:  should return priceDiscounts.daysDiscountNegativeDays if the car is rented for < 0 days",
        input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
        mockDaysRented: -1, 
        result: discounts.daysDiscountNegativeDays },
    ];
    
    daysOverdue.forEach(test => {
      it(test.name, () => {
        //arrange
        const mockDaysRented = jest.fn(() => test.mockDaysRented);
        const returnedCarData = getReturnCarData(test.input);
        //act
        const result = daysDiscount(
          returnedCarData,
          mockDaysRented,
        );
        //assert
        expect(result).toEqual(test.result);
      })
    })
    });