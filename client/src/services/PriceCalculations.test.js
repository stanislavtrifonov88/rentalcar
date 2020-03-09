import * as priceCalculations from './PriceCalculations';
import * as priceDiscounts from './discounts/priceDiscounts';


it('estimatedDaysDiscount should assign 100% of car base price if the car is rented for 1 day', () => {
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-02-27T11:39',
    contractEndDate: '2020-03-13T11:04',
  };

  // Arramge
  const estimatedDaysRented = 1;

  // Act

  const result = priceCalculations.estimatedDaysDiscount(estimatedDaysRented);

  // Assert

  expect(result).toEqual(priceDiscounts.daysDiscount1day);
});

it('estimatedDaysDiscount should assign 85% of car base price if the car is rented for 2-6 day', () => {
  // Arramge
  const estimatedDaysRented = 4;

  // Act

  const result = priceCalculations.estimatedDaysDiscount(estimatedDaysRented);

  // Assert

  expect(result).toEqual(priceDiscounts.daysDiscount2to6days);
});

it('estimatedDaysDiscount should assign 75% of car base price if the car is rented for 7+ day', () => {
  // Arramge
  const estimatedDaysRented = 8;

  // Act

  const result = priceCalculations.estimatedDaysDiscount(estimatedDaysRented);

  // Assert

  expect(result).toEqual(priceDiscounts.daysDiscount7PlusDays);
});

it('estimatedDaysDiscount should not accept rented days below 1 day', () => {
  // Arramge
  const estimatedDaysRented = -1;


  // Act

  const result = priceCalculations.estimatedDaysDiscount(estimatedDaysRented);

  // Assert

  expect(result).toEqual(priceDiscounts.daysDiscountNegativeDays);
});

it('estimatedAgeDiscount should not add any penalty if the borrower is 26+ years old', () => {
  // Arramge
  const borrowerAge = 26;

  // Act

  const result = priceCalculations.estimatedAgeDiscount(borrowerAge);

  // Assert

  expect(result).toEqual(priceDiscounts.ageDiscountAbove25);
});

it('estimatedAgeDiscount should add 20% on the car base price if the borrower is between 18 - 25 years old', () => {
  // Arramge
  const borrowerAge = 18;

  // Act

  const result = priceCalculations.estimatedAgeDiscount(borrowerAge);

  // Assert

  expect(result).toEqual(priceDiscounts.ageDiscountBelow25);
});

it('estimatedAgeDiscount should not return a number if the borrower age is below 18', () => {
  // Arramge
  const borrowerAge = 7;

  // Act

  const result = priceCalculations.estimatedAgeDiscount(borrowerAge);

  // Assert

  expect(result).toEqual(priceDiscounts.ageDiscountBelow18);
});


it('estimatedPricePerDay should call estimatedAgeDiscount() and estimatedDaysDiscount()', () => {
  // Arramge
  const borrowerAge = 18;
  const carBasePrice = 80;
  const daysRented = 1;

  const estimatedDaysDiscountFunctionMock = jest.fn((x) => 1);
  const estimatedAgeDiscountFunctionMock = jest.fn((x) => 1);


  // Act

  const result = priceCalculations.estimatedPricePerDay(daysRented, borrowerAge, carBasePrice, estimatedDaysDiscountFunctionMock, estimatedAgeDiscountFunctionMock);

  // Assert

  expect(result).toEqual(80);
});

it('estimatedDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Return time 2020.01.02 09:00 is considered 1 day)', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  // Act

  const result = priceCalculations.estimatedDaysRented(contractMock.startDate, contractMock.contractEndDate);

  // Assert

  expect(result).toEqual(1);
});

it('estimatedDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Return time 2020.01.02 10:45 is considered 2 days, even though its 1 day and 45 minutes.)', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T10:45',
  };

  // Act

  const result = priceCalculations.estimatedDaysRented(contractMock.startDate, contractMock.contractEndDate);

  // Assert

  expect(result).toEqual(2);
});

it('estimatedDaysRented case 3: (same day return is considered 1 day)', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-01T12:00',
  };

  // Act

  const result = priceCalculations.estimatedDaysRented(contractMock.startDate, contractMock.contractEndDate);

  // Assert

  expect(result).toEqual(1);
});

it('currentDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Current time: 2020.01.02 09:00 is considered 1 day)', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const today = '2020-01-02T09:00'

  // Act

  const result = priceCalculations.estimatedDaysRented(contractMock.startDate, today);

  // Assert

  expect(result).toEqual(1);
});

it('currentDaysRented case 1: (Pick-up time: 2020.01.01 10:00. Current time:  2020.01.02 10:45 is considered 2 days, even though its 1 day and 45 minutes.)', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T10:45',
  };

  const today = '2020-01-02T10:45'

  // Act

  const result = priceCalculations.estimatedDaysRented(contractMock.startDate, today);

  // Assert

  expect(result).toEqual(2);
});

it('daysOverUnderContract should call return the number of days when the car is not returned on time', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const mockCurrentDaysRented = jest.fn((x) => 6);
  const mockEstimatedDaysRented = jest.fn((x) => 5);


  // Act

  const result = priceCalculations.daysOverUnderContract(contractMock.startDate, contractMock.contractEndDate, mockCurrentDaysRented, mockEstimatedDaysRented);

  // Assert

  expect(result).toEqual(1);
});

it('daysOverUnderContract should call return the number of days when the car is in advance', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const mockCurrentDaysRented = jest.fn((x) => 5);
  const mockEstimatedDaysRented = jest.fn((x) => 6);


  // Act

  const result = priceCalculations.daysOverUnderContract(contractMock.startDate, contractMock.contractEndDate, mockCurrentDaysRented, mockEstimatedDaysRented);

  // Assert

  expect(result).toEqual(-1);
});


it('overduePenalty should return 0 if overdue days < 1', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const overUnderDaysRented = -3;


  // Act

  const result = priceCalculations.overduePenalty(overUnderDaysRented);

  // Assert

  expect(result).toEqual(0);
});


it('overduePenalty should return 1.5 if overdue days < 6', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const overUnderDaysRented = 5;


  // Act

  const result = priceCalculations.overduePenalty(overUnderDaysRented);

  // Assert

  expect(result).toEqual(1.5);
});


it('overduePenalty should return 2 if overdue days >= 6', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const overUnderDaysRented = 7;


  // Act

  const result = priceCalculations.overduePenalty(overUnderDaysRented);

  // Assert

  expect(result).toEqual(2);
});


it('currentPricePerDay should return the product of its inputs', () => {
  // Arramge
  const contractMock = {
    borrowerFirstName: 'Batman',
    borrowerLastName: 'Ivanov',
    borrowerAge: '22',
    startDate: '2020-01-01T10:00',
    contractEndDate: '2020-01-02T09:00',
  };

  const overduePenaltyPercent = 2
  const estimatedDailyPrice = 2


  // Act

  const result = priceCalculations.currentPricePerDay(overduePenaltyPercent, estimatedDailyPrice);

  // Assert

  expect(result).toEqual(4);
});