import * as priceCalculations from './priceCalculations';
import * as discounts from '../discounts/discounts';
import { getReturnCarData } from './getReturnedData.spec';

describe('estimatedPricePerDay', () => {
  it('should return the base price after discouns', () => {
    // Arramge
    const returnedCarData = getReturnCarData({ phone: '359888111444' });
    const totalDiscountMock = jest.fn(x => -0.1);

    // Act
    const result = priceCalculations.estimatedPricePerDay(
      returnedCarData,
      totalDiscountMock,
    );

    // Assert
    expect(result).toEqual(63);
  });
});


describe('estimatedTotalPrice', () => {
  const returnedCarData = getReturnCarData({ phone: 'not applicable' });

  it('should return the product of estiamtedPricePerDay and estimatedDaysRented', () => {
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
});

describe('currentPricePerDay ', () => {
  const returnedCarData = getReturnCarData({ phone: 'not applicable' });
  it('should return the product of its inputs', () => {
    // Arramge
    const estimatedPricePerDayMock = jest.fn(() => 2);
    const overduePenaltyMock: any = jest.fn(() => 2);

    // Act
    const result = priceCalculations.currentPricePerDay(
      returnedCarData,
      estimatedPricePerDayMock,
      overduePenaltyMock,
    );
    // Assert

    expect(result).toEqual(4);
  });
});

describe('CurrentTotalPrice ', () => {
  const currentTotalPrice = [
    {
      name:
        'case 1: should return the total price without interest when car returned on time',
      input: { contractEndDate: 'not applicable' },
      currentPricePerDay: 10,
      daysOverdue: 0,
      estimatedPricePerDay: 11,
      currentDaysRented: 10,
      result: 110,
    },
    {
      name:
        'case 2: should return the total price without interest when car returned in advance',
      input: { contractEndDate: 'not applicable' },
      currentPricePerDay: 10,
      daysOverdue: -1,
      estimatedPricePerDay: 11,
      currentDaysRented: 10,
      result: 110,
    },
    {
      name:
        'case 3: should return the total price with interest when there is a late car return',
      input: { contractEndDate: 'not applicable' },
      currentPricePerDay: 11,
      daysOverdue: 1,
      estimatedPricePerDay: 10,
      currentDaysRented: 11,
      result: 111,
    },
  ];

  currentTotalPrice.forEach(test => {
    it(test.name, () => {
      //arrange
      const currentPricePerDayMock = jest.fn(() => test.currentPricePerDay);
      const daysOverdueMock = jest.fn(() => test.daysOverdue);
      const estimatedPricePerDayMock = jest.fn(() => test.estimatedPricePerDay);
      const currentDaysRentedMock = jest.fn(() => test.currentDaysRented);
      const returnedCarData = getReturnCarData(test.input);

      //act
      const result = priceCalculations.currentTotalPrice(
        returnedCarData,
        currentPricePerDayMock,
        daysOverdueMock,
        estimatedPricePerDayMock,
        currentDaysRentedMock,
      );

      //assert
      expect(result).toEqual(test.result);
    });
  });
});
