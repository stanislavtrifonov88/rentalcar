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

describe('estimatedDaysRented', () => {
  const daysRented = [
    { name: "case 1.1: if dates are not defined or empty string return 0",
      input: { startDate: undefined, contractEndDate: ''  },
      daysRented: 1, 
      result: 0 },

    { name: "case 1.2: if dates are not defined or empty string return 0",
      input: { startDate: '', contractEndDate: undefined  },
      daysRented: 1, 
      result: 0 },

    { name: "case 1.3: if dates are not defined or empty string return 0",
      input: { startDate: '', contractEndDate: ''  },
      daysRented: 1, 
      result: 0 },

    {name: "case: 2.1: if difference between dates is between 0 and 1, it is considered as 1 day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 0.01, 
      result: 1 },

    {name: "case: 2.2: if difference between dates is between 0 and 1, it is considered as 1 day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 0.5, 
      result: 1 },

    {name: "case: 2.3: if difference between dates is between 0 and 1, it is considered as 1 day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 0.99, 
      result: 1 },

    { name: "case 3: if difference between dates is 1 day - no change",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 1, 
      result: 1 },

    { name: "case 4: if more than 1 it should round ceiling",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 1.1, 
      result: 2 },
  ];

// testing estimatedDaysRented

daysRented.forEach(test => {
  it(test.name, () => {
    //arrange
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
})

describe('currentDaysRented', () => {
  const daysRented = [
    { name: "case 1.1: if dates are not defined or empty string return 0",
      input: { startDate: undefined, contractEndDate: ''  },
      daysRented: 1, 
      dateFormatter: {},
      result: 0 },

    { name: "case 1.2: if dates are not defined or empty string return 0",
      input: { startDate: '', contractEndDate: undefined  },
      daysRented: 1, 
      dateFormatter: {},
      result: 0 },

    { name: "case 1.3: if dates are not defined or empty string return 0",
      input: { startDate: '', contractEndDate: ''  },
      daysRented: 1, 
      dateFormatter: {},
      result: 0 },

    {name: "case: 2.1: if difference between dates is between 0 and 1, it is considered as 1 day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 0.01, 
      dateFormatter: {},
      result: 1 },

    {name: "case: 2.2: if difference between dates is between 0 and 1, it is considered as 1 day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 0.5, 
      dateFormatter: {},
      result: 1 },

    {name: "case: 2.3: if difference between dates is between 0 and 1, it is considered as 1 day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 0.99, 
      dateFormatter: {},
      result: 1 },

    { name: "case 3: if difference between dates is 1 day - no change",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 1, 
      dateFormatter: {},
      result: 1 },

    { name: "case 4: if more than 1 it should round ceiling",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      daysRented: 1.1, 
      dateFormatter: {},
      result: 2 },
  ];

// testing estimatedDaysRented

daysRented.forEach(test => {
  it(test.name, () => {
    //arrange
    const daysRentedMock = jest.fn(() => test.daysRented);
    const dateFormatterMock: any = jest.fn(() => test.dateFormatter);
    const returnedCarData = getReturnCarData(test.input);
    //act
    const result = priceCalculations.currentDaysRented(
      returnedCarData,
      daysRentedMock,
      dateFormatterMock,
    );
    //assert
    expect(result).toEqual(test.result);
  })
})

// testing currentDaysRented
});

describe('daysOverdue', () => {
  const daysOverdue = [
    { name: "case 1: should return a positive number when the car is returned with a delay",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      currentDaysRented: 6, 
      estimatedDaysRented: 5,
      result: 1 },
    { name: "case 2: should return 0 if the car is return on the expected day",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      currentDaysRented: 5, 
      estimatedDaysRented: 5,
      result: 0 },
    { name: "case 3: should return negative number when the car is returned in advance",
      input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
      currentDaysRented: 5, 
      estimatedDaysRented: 6,
      result: -1 },
  ];

  daysOverdue.forEach(test => {
    it(test.name, () => {
      //arrange
      const mockCurrentDaysRented = jest.fn(() => test.currentDaysRented);
      const mockEstimatedDaysRented = jest.fn(() => test.estimatedDaysRented);
      const returnedCarData = getReturnCarData(test.input);
      //act
      const result = priceCalculations.overdueDays(
        returnedCarData,
        mockCurrentDaysRented,
        mockEstimatedDaysRented,
      );
      //assert
      expect(result).toEqual(test.result);
    })
  })
});


describe('daysDiscount', () => {
const daysOverdue = [
  { name: "case 1:  should return priceDiscounts.daysDiscount1day if the car is rented for 1 day",
    input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
    mockDaysRented: 1, 
    result: priceDiscounts.daysDiscount1day },
  { name: "case 2.1:  should return priceDiscounts.daysDiscount2to6days if the car is rented for 2-6 days",
    input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
    mockDaysRented: 2, 
    result: priceDiscounts.daysDiscount2to6days },
  { name: "case 2.2:  should return priceDiscounts.daysDiscount2to6days if the car is rented for 2-6 days",
    input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
    mockDaysRented: 4, 
    result: priceDiscounts.daysDiscount2to6days },
  { name: "case 2.3:  should return priceDiscounts.daysDiscount2to6days if the car is rented for 2-6 days",
    input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
    mockDaysRented: 4, 
    result: priceDiscounts.daysDiscount2to6days },
  { name: "case 3:  should return priceDiscounts.daysDiscount7PlusDays if the car is rented for 6+ days",
    input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
    mockDaysRented: 7, 
    result: priceDiscounts.daysDiscount7PlusDays },
  { name: "case 4:  should return priceDiscounts.daysDiscountNegativeDays if the car is rented for < 0 days",
    input: { startDate: 'not needed', contractEndDate: 'not applicable'  },
    mockDaysRented: -1, 
    result: priceDiscounts.daysDiscountNegativeDays },
];

daysOverdue.forEach(test => {
  it(test.name, () => {
    //arrange
    const mockDaysRented = jest.fn(() => test.mockDaysRented);
    const returnedCarData = getReturnCarData(test.input);
    //act
    const result = priceCalculations.daysDiscount(
      returnedCarData,
      mockDaysRented,
    );
    //assert
    expect(result).toEqual(test.result);
  })
})
});


describe('ageDiscount', () => {
const daysOverdue = [
  { name: "case 1.1: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
    input: { age: -1 },
    result: priceDiscounts.ageDiscountBelow18 },
  { name: "case 1.2: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
    input: { age: 0 },
    result: priceDiscounts.ageDiscountBelow18 },
  { name: "case 1.3: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
    input: { age: 17 },
    result: priceDiscounts.ageDiscountBelow18 },
  { name: "case 2.1: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
    input: { age: 18 },
    result: priceDiscounts.ageDiscount18To25 },
  { name: "case 2.2: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
    input: { age: 23 },
    result: priceDiscounts.ageDiscount18To25 },
  { name: "case 2.3: should return priceDiscounts.ageDiscount18To25 if the borrower is between 18 - 25 years old",
    input: { age: 25 },
    result: priceDiscounts.ageDiscount18To25 },
  { name: "case 3.1: should not add any penalty if the borrower is 26+ years old",
    input: { age: 26 },
    result: priceDiscounts.ageDiscountAbove26 },
  { name: "case 3.2: should not add any penalty if the borrower is 26+ years old",
    input: { age: 85 },
    result: priceDiscounts.ageDiscountAbove26 },
];

daysOverdue.forEach(test => {
  it(test.name, () => {
    //arrange
    const returnedCarData = getReturnCarData(test.input);
    //act
    const result = priceCalculations.ageDiscount(
      returnedCarData,
    );
    //assert
    expect(result).toEqual(test.result);
  })
})
});


describe('ageDiscount', () => {
const returnedCarData = getReturnCarData({ phone:'359888111444' });
const daysDiscountFunctionMock = jest.fn(() => -1);
const ageDiscountFunctionMock = jest.fn(() => 2);
const loyaltyDiscountFunctionMock = jest.fn(() => 2);
const geoDiscountFunctionMock = jest.fn(() => 2);

it('totalDiscount should return the sum of all the functions provided to it', () => {
  // Arramge
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

it('totalDiscount should return the sum of all the functions provided to it', () => {
  // Arramge
  const defaultDiscountFnsMock: any = [
    daysDiscountFunctionMock,
    ageDiscountFunctionMock,
    loyaltyDiscountFunctionMock,
    geoDiscountFunctionMock,
  ];

  // Act
  const result = priceCalculations.totalDiscount(
    returnedCarData,
    defaultDiscountFnsMock,
  );

  // Assert
  expect(result).toEqual(5);
});
});

describe('estimatedPricePerDay', () => {
it('should return the base price after discouns', () => {
  // Arramge
  const returnedCarData = getReturnCarData({ phone:'359888111444' });
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


describe('overduePenalty', () => {
const daysOverdue = [
  { name: "case 1.1: should return priceDiscounts.overduePenaltyBelow1Day if overdue days < 1",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 0,
    result: priceDiscounts.overduePenaltyBelow1Day },
  { name: "case 1.2: should return 1 if overdue days < 1",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 0.99,
    result: priceDiscounts.overduePenaltyBelow1Day },
  { name: "case 2.1: should return priceDiscounts.overduePenaltyBelow1Day if overdue days between 2-6",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 2,
    result: priceDiscounts.overduePenalty2To6Days },
  { name: "case 2.2: should return priceDiscounts.overduePenaltyBelow1Day if overdue days between 2-6",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 4,
    result: priceDiscounts.overduePenalty2To6Days },
  { name: "case 2.3: should return priceDiscounts.overduePenaltyBelow1Day if overdue days between 2-6",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 6,
    result: priceDiscounts.overduePenalty2To6Days },
  { name: "case 3.1: should return priceDiscounts.overduePentaltyAbove6Days if overdue days are 7+",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 7,
    result: priceDiscounts.overduePentaltyAbove6Days },
  { name: "case 3.2: should return priceDiscounts.overduePentaltyAbove6Days if overdue days are 7+",
    input: { contractEndDate: 'not applicable' },
    overdueDays: 27,
    result: priceDiscounts.overduePentaltyAbove6Days },

];

daysOverdue.forEach(test => {
  it(test.name, () => {
    //arrange
    const overdueDaysFn = jest.fn(() => test.overdueDays);
    const returnedCarData = getReturnCarData(test.input);
    //act
    const result = priceCalculations.overduePenalty(
      returnedCarData,
      overdueDaysFn
    );
    //assert
    expect(result).toEqual(test.result);
  })
})
});

describe('estimatedTotalPrice', () => {
const returnedCarData = getReturnCarData({ phone:'not applicable' });

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
const returnedCarData = getReturnCarData({ phone:'not applicable' });
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
  { name: "case 1: should return the total price without interest when car returned on time",
    input: { contractEndDate: 'not applicable' },
    currentPricePerDay: 10, daysOverdue: 0, estimatedPricePerDay: 11, currentDaysRented: 10,
    result: 110 },
  { name: "case 2: should return the total price without interest when car returned in advance",
    input: { contractEndDate: 'not applicable' },
    currentPricePerDay: 10, daysOverdue: -1, estimatedPricePerDay: 11, currentDaysRented: 10,
    result: 110 },
  { name: "case 3: should return the total price with interest when there is a late car return",
    input: { contractEndDate: 'not applicable' },
    currentPricePerDay: 11, daysOverdue: 1, estimatedPricePerDay: 10, currentDaysRented: 11,
    result: 111 },
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

  })
})
});

  



