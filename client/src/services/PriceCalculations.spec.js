/* eslint-disable no-undef */
import * as priceCalculations from './PriceCalculations';
import * as priceDiscounts from './discounts/priceDiscounts';

describe('PriceCalcution service', () => {
  let contractData;

  beforeEach(async () => {
    contractData = {
      id: '71e542f1-0936-4319-8d66-f5768b770eb9',
      borrowerFirstName: 'asd',
      borrowerLastName: 'asd',
      borrowerAge: 23,
      startDate: '2020-01-01T15:20:00.000Z',
      contractEndDate: '2020-01-02T15:20:00.000Z',
      brand: 'Volkswagen',
      model: 'Golf',
      price: 100,
    };
  });


  it('estimatedDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Return time 2020.01.02 09:00 is considered 1 day)', () => {
  // Arramge
    const daysRented = jest.fn(() => 1);

    // Act

    const result = priceCalculations.estimatedDaysRented(
      contractData, daysRented,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('estimatedDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Return time 2020.01.02 10:45 is considered 2 days, even though its 1 day and 45 minutes.)', () => {
  // Arramge
    const daysRented = jest.fn(() => 1.1);


    // Act

    const result = priceCalculations.estimatedDaysRented(
      contractData, daysRented,
    );

    // Assert

    expect(result).toEqual(2);
  });

  it('estimatedDaysRented case 3: (same day return is considered 1 day)', () => {
  // Arramge
    const daysRented = jest.fn(() => 0.1);

    // Act

    const result = priceCalculations.estimatedDaysRented(
      contractData, daysRented,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('currentDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Current time: 2020.01.02 09:00 is considered 1 day)', () => {
  // Arramge
    const daysRented = jest.fn(() => 1);
    const dateFormatter = jest.fn(() => '2020.01.01T10:00:00.000Z');

    // Act

    const result = priceCalculations.currentDaysRented(contractData, daysRented, dateFormatter);

    // Assert

    expect(result).toEqual(1);
  });

  it('currentDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Current time:  2020.01.02 10:45 is considered 2 days, even though its 1 day and 45 minutes.)', () => {
  // Arramge
    const daysRented = jest.fn(() => 1.1);
    const dateFormatter = jest.fn(() => '2020.01.01T10:00:00.000Z');

    // Act

    const result = priceCalculations.currentDaysRented(contractData, daysRented, dateFormatter);


    // Assert

    expect(result).toEqual(2);
  });

  it('daysOverUnderContract should call return the number of days when the car is not returned on time', () => {
  // Arramge

    const mockCurrentDaysRented = jest.fn(() => 6);
    const mockDaysRented = jest.fn(() => 5);


    // Act

    const result = priceCalculations.overdueDays(
      contractData,
      mockCurrentDaysRented,
      mockDaysRented,
    );

    // Assert

    expect(result).toEqual(1);
  });

  it('daysOverUnderContract should call return the number of days when the car is in advance', () => {
  // Arramge

    const mockCurrentDaysRented = jest.fn((x) => 5);
    const mockDaysRented = jest.fn((x) => 6);


    // Act

    const result = priceCalculations.overdueDays(
      contractData,
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

    const result = priceCalculations.daysDiscount(contractData, mockDaysRented);

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscount1day);
  });

  it('daysDiscount should return -0.15% if the car is rented for 2-6 day', () => {
  // Arramge

    const mockDaysRented = jest.fn(() => 4);
    // Act

    const result = priceCalculations.daysDiscount(contractData, mockDaysRented);

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscount2to6days);
  });

  it('daysDiscount should return -0.25% if the car is rented for 7+ day', () => {
  // Arramge

    const mockDaysRented = jest.fn(() => 9);
    // Act

    const result = priceCalculations.daysDiscount(contractData, mockDaysRented);

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscount7PlusDays);
  });

  it('daysDiscount return a msg if rented days below below 1 day', () => {
  // Arramge

    const mockDaysRented = jest.fn(() => -1);
    // Act

    const result = priceCalculations.daysDiscount(contractData, mockDaysRented);

    // Assert

    expect(result).toEqual(priceDiscounts.daysDiscountNegativeDays);
  });

  it('ageDiscount should not add any penalty if the borrower is 26+ years old', () => {
  // Arramge
    contractData.borrowerAge = 33;


    // Act

    const result = priceCalculations.ageDiscount(contractData);

    // Assert

    expect(result).toEqual(priceDiscounts.ageDiscountAbove25);
  });

  it('ageDiscount should return +20% if the borrower is between 18 - 25 years old', () => {
  // Arramge
    contractData.borrowerAge = 20;

    // Act

    const result = priceCalculations.ageDiscount(contractData);

    // Assert

    expect(result).toEqual(priceDiscounts.ageDiscountBelow25);
  });

  it('ageDiscount should return a msg the borrower age is below 18', () => {
  // Arramge
    contractData.borrowerAge = 12;

    // Act

    const result = priceCalculations.ageDiscount(contractData);

    // Assert

    expect(result).toEqual(priceDiscounts.ageDiscountBelow18);
  });

  it('totalDiscount should return the sum of all the functions provided to it', () => {
    // Arramge

    const daysDiscountFunctionMock = jest.fn(() => -1);
    const ageDiscountFunctionMock = jest.fn(() => 2);
    const defaultDiscountFnsMock = [daysDiscountFunctionMock, ageDiscountFunctionMock];

    // Act

    const result = priceCalculations.totalDiscount(contractData, defaultDiscountFnsMock);

    // Assert

    expect(result).toEqual(1);
  });


  it('estimatedPricePerDay should return the base price after discouns', () => {
  // Arramge

    const totalDiscountMock = jest.fn((x) => 0.1);

    // Act

    const result = priceCalculations.estimatedPricePerDay(
      contractData, totalDiscountMock,
    );

    // Assert

    expect(result).toEqual(90);
  });


  it('overduePenalty should return 1 if overdue days < 1', () => {
  // Arramge

    const overdueDaysFn = jest.fn(() => 0);

    // Act

    const result = priceCalculations.overduePenalty(contractData, overdueDaysFn);

    // Assert

    expect(result).toEqual(1);
  });


  it('overduePenalty should return 1.5 if overdue days < 6', () => {
  // Arramge

    const overdueDaysFn = jest.fn(() => 5);

    // Act

    const result = priceCalculations.overduePenalty(contractData, overdueDaysFn);

    // Assert

    expect(result).toEqual(1.5);
  });


  it('overduePenalty should return 2 if overdue days >= 6', () => {
  // Arramge

    const overdueDaysFn = jest.fn(() => 7);

    // Act

    const result = priceCalculations.overduePenalty(contractData, overdueDaysFn);

    // Assert

    expect(result).toEqual(2);
  });

  it('estimatedTotalPrice should return the product of estiamtedPricePerDay and estimatedDaysRented', () => {
    // Arramge
    const estimatedDaysRentedMock = jest.fn(() => 2);
    const estiamtedPricePerDayMock = jest.fn(() => 2);

    // Act

    const result = priceCalculations.estimatedTotalPrice(
      contractData,
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
      contractData,
      estimatedPricePerDayMock,
      overduePenaltyMock,
    );
    // Assert

    expect(result).toEqual(4);
  });

  it('currentTotalPrice should return the estimatedTotalPrice if daysOverdue are <= 0', () => {
    // Arramge

    const currentPricePerDayMock = jest.fn(() => 2);
    const daysOverdueMock = jest.fn(() => 0);
    const estimatedTotalPriceMock = jest.fn(() => 10);


    // Act

    const result = priceCalculations.currentTotalPrice(
      contractData,
      currentPricePerDayMock,
      daysOverdueMock,
      estimatedTotalPriceMock,
    );
      // Assert

    expect(result).toEqual(10);
  });

  it('currentTotalPrice should return the estimatedTotalPrice if daysOverdue are <= 0', () => {
    // Arramge

    const currentPricePerDayMock = jest.fn(() => 2);
    const daysOverdueMock = jest.fn(() => 3);
    const estimatedTotalPriceMock = jest.fn(() => 10);

    // Act

    const result = priceCalculations.currentTotalPrice(
      contractData,
      currentPricePerDayMock,
      daysOverdueMock,
      estimatedTotalPriceMock,
    );

    // Assert

    expect(result).toEqual(16);
  });
});
