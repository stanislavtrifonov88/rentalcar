import * as priceCalculations from './priceCalculations';
import * as priceDiscounts from '../discounts/discounts';

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

describe('PriceCalcution estimatedDaysRented', () => {
  let returnedCarData;

  beforeEach(async () => {
    returnedCarData = {
      startDate: '2020-05-18T11:55:00.000Z',
      contractEndDate: '2020-05-20T22:01:00.000Z',
      phone: '359888111444',
      age: 52,
      price: 70,
      previousContracts: 54,
    };
  });


  const estimatedDaysRented = [
    { name: "if dates are not defined or empty string return 0",
      input: { startDate: undefined, contractEndDate: ''  },
      daysRented: 1, 
      result: 0 },

    {name: "if difference between dates is less than 1 it is considered as 1 day",
      input: { startDate: 'who cares', contractEndDate: 'not applicable'  },
      daysRented: 0.1, 
      result: 1 },

      { name: "if difference between dates is 1 day - no change",
      input: { startDate: 'who cares', contractEndDate: 'not applicable'  },
      daysRented: 1, 
      result: 1 },

      { name: "if more than 1 it should round ceiling",
      input: { startDate: 'who cares', contractEndDate: 'not applicable'  },
      daysRented: 1.1, 
      result: 2 },
  ]

  estimatedDaysRented.forEach(test => {
    it(test.name, () => {
      //setup
      const daysRentedMock = jest.fn(() => test.daysRented);
      const returnedCarData = getReturnCarData(test.input);
      //act
      const result = priceCalculations.estimatedDaysRented(
        returnedCarData,
        daysRentedMock,
      );
      //assert
      expect(result).toEqual(test.result);
    })
  })


  it('estimatedDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Return time 2020.01.02 09:00 is considered 1 day)', () => {
    // Arramge
    const daysRented = jest.fn(() => 1);

    // Act

    const result = priceCalculations.estimatedDaysRented(
      returnedCarData,
      daysRented,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('estimatedDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Return time 2020.01.02 10:45 is considered 2 days, even though its 1 day and 45 minutes.)', () => {
    // Arramge
    const daysRented = jest.fn(() => 1.1);

    // Act

    const result = priceCalculations.estimatedDaysRented(
      returnedCarData,
      daysRented,
    );

    // Assert

    expect(result).toEqual(2);
  });

  it('estimatedDaysRented case 3: (same day return is considered 1 day)', () => {
    // Arramge
    const daysRented = jest.fn(() => 0.1);

    // Act

    const result = priceCalculations.estimatedDaysRented(
      returnedCarData,
      daysRented,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('currentDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Current time: 2020.01.02 09:00 is considered 1 day)', () => {
    // Arramge
    const daysRented = jest.fn(() => 1);
    const dateFormatter = jest.fn(() => '2020.01.01T10:00:00.000Z');

    // Act

    const result = priceCalculations.currentDaysRented(
      returnedCarData,
      daysRented,
      dateFormatter,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('currentDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Current time:  2020.01.02 10:45 is considered 2 days, even though its 1 day and 45 minutes.)', () => {
    // Arramge
    const daysRented = jest.fn(() => 1.1);
    const dateFormatter = jest.fn(() => '2020.01.01T10:00:00.000Z');

    // Act

    const result = priceCalculations.currentDaysRented(
      returnedCarData,
      daysRented,
      dateFormatter,
    );

    // Assert

    expect(result).toEqual(2);
  });

  it('daysOverUnderContract should call return the number of days when the car is not returned on time', () => {
    // Arramge

    const mockCurrentDaysRented = jest.fn(() => 6);
    const mockDaysRented = jest.fn(() => 5);

    // Act

    const result = priceCalculations.overdueDays(
      returnedCarData,
      mockCurrentDaysRented,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('daysOverUnderContract should call return the number of days when the car is in advance', () => {
    // Arramge

    const mockCurrentDaysRented = jest.fn(x => 5);
    const mockDaysRented = jest.fn(x => 6);

    // Act

    const result = priceCalculations.overdueDays(
      returnedCarData,
      mockCurrentDaysRented,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(-1);
  });

  it('daysDiscount should return 0 if the car is rented for 1 day', () => {
    // Arramge

    const mockDaysRented = jest.fn(() => 1);
    // Act

    const result = priceCalculations.daysDiscount(
      returnedCarData,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscount1day);
  });

  it('daysDiscount should return -0.15% if the car is rented for 2-6 day', () => {
    // Arramge

    const mockDaysRented = jest.fn(() => 4);
    // Act

    const result = priceCalculations.daysDiscount(
      returnedCarData,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscount2to6days);
  });

  it('daysDiscount should return -0.25% if the car is rented for 7+ day', () => {
    // Arramge

    const mockDaysRented = jest.fn(() => 9);
    // Act

    const result = priceCalculations.daysDiscount(
      returnedCarData,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscount7PlusDays);
  });

  it('daysDiscount return a msg if rented days below below 1 day', () => {
    // Arramge

    const mockDaysRented = jest.fn(() => -1);
    // Act

    const result = priceCalculations.daysDiscount(
      returnedCarData,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscountNegativeDays);
  });

  it('ageDiscount should not add any penalty if the borrower is 26+ years old', () => {
    // Arramge
    returnedCarData.borrowerAge = 33;

    // Act

    const result = priceCalculations.ageDiscount(returnedCarData);

    // Assert

    expect(result).toEqual(priceDiscounts.ageDiscountAbove25);
  });

  it('ageDiscount should return +20% if the borrower is between 18 - 25 years old', () => {
    // Arramge
    returnedCarData.borrowerAge = 20;

    // Act

    const result = priceCalculations.ageDiscount(returnedCarData);

    // Assert

    expect(result).toEqual(priceDiscounts.ageDiscountBelow25);
  });

  it('ageDiscount should return a msg the borrower age is below 18', () => {
    // Arramge
    returnedCarData.borrowerAge = 12;

    // Act

    const result = priceCalculations.ageDiscount(returnedCarData);

    // Assert

    expect(result).toEqual(priceDiscounts.ageDiscountBelow18);
  });

  it('totalDiscount should return the sum of all the functions provided to it', () => {
    // Arramge

    const daysDiscountFunctionMock = jest.fn(() => -1);
    const ageDiscountFunctionMock = jest.fn(() => 2);
    const defaultDiscountFnsMock: any = [
      daysDiscountFunctionMock,
      ageDiscountFunctionMock,
    ];

    // Act

    const result = priceCalculations.totalDiscount(
      returnedCarData,
      defaultDiscountFnsMock,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('estimatedPricePerDay should return the base price after discouns', () => {
    // Arramge

    const totalDiscountMock = jest.fn(x => -0.1);

    // Act

    const result = priceCalculations.estimatedPricePerDay(
      returnedCarData,
      totalDiscountMock,
    );

    // Assert

    expect(result).toEqual(63);
  });

  it('overduePenalty should return 1 if overdue days < 1', () => {
    // Arramge

    const overdueDaysFn = jest.fn(() => 0);

    // Act

    const result = priceCalculations.overduePenalty(
      returnedCarData,
      overdueDaysFn,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('overduePenalty should return 1.5 if overdue days < 6', () => {
    // Arramge

    const overdueDaysFn = jest.fn(() => 5);

    // Act

    const result = priceCalculations.overduePenalty(
      returnedCarData,
      overdueDaysFn,
    );

    // Assert

    expect(result).toEqual(1.5);
  });

  it('overduePenalty should return 2 if overdue days >= 6', () => {
    // Arramge

    const overdueDaysFn = jest.fn(() => 7);

    // Act

    const result = priceCalculations.overduePenalty(
      returnedCarData,
      overdueDaysFn,
    );

    // Assert

    expect(result).toEqual(2);
  });

  it('estimatedTotalPrice should return the product of estiamtedPricePerDay and estimatedDaysRented', () => {
    // Arramge
    const estimatedDaysRentedMock = jest.fn(() => 2);
    const estiamtedPricePerDayMock = jest.fn(() => 2);

    // Act

    const result = priceCalculations.estimatedTotalPrice(
      returnedCarData,
      estimatedDaysRentedMock,
      estiamtedPricePerDayMock,
    );

    // Assert

    expect(result).toEqual(4);
  });

  it('currentPricePerDay should return the product of its inputs', () => {
    // Arramge

    const overduePenaltyMock = jest.fn(() => 2);
    const estimatedPricePerDayMock = jest.fn(() => 2);

    // Act

    const result = priceCalculations.estimatedTotalPrice(
      returnedCarData,
      estimatedPricePerDayMock,
      overduePenaltyMock,
    );
    // Assert

    expect(result).toEqual(4);
  });

  it('currentTotalPrice should return the correct amount when car is returned on time or before schedule', () => {
    // Arramge

    const currentPricePerDayMock = jest.fn(() => 10);
    const daysOverdueMock = jest.fn(() => 0);
    const estimatedPricePerDayMock = jest.fn(() => 11);
    const currentDaysRentedMock = jest.fn(() => 10);

    // Act

    const result = priceCalculations.currentTotalPrice(
      returnedCarData,
      currentPricePerDayMock,
      daysOverdueMock,
      estimatedPricePerDayMock,
      currentDaysRentedMock,
    );
    // Assert

    expect(result).toEqual(110);
  });

  
  const callCurrentTotalPrice = (returnedCarData, { currentPricePerDay, daysOverdue, estimatedPricePerDay, currentDaysRented }) => {
    const currentPricePerDayMock = jest.fn(() => currentPricePerDay);
    const daysOverdueMock = jest.fn(() => daysOverdue);
    const estimatedPricePerDayMock = jest.fn(() => estimatedPricePerDay);
    const currentDaysRentedMock = jest.fn(() => currentDaysRented);

    return priceCalculations.currentTotalPrice(returnedCarData,
      currentPricePerDayMock,
      daysOverdueMock,
      estimatedPricePerDayMock,
      currentDaysRentedMock,)
  }

  it('currentTotalPrice should return the correct total price including interest for the overdue days', () => {
    // Arramge
    const input = { currentPricePerDay: 10, daysOverdue: 2, estimatedPricePerDay: 11, currentDaysRented: 10 }
    const returnedCarData = getReturnCarData({});
    // Act
    const result = callCurrentTotalPrice(returnedCarData, input)

    // Assert
    expect(result).toEqual(108);
  });
});
