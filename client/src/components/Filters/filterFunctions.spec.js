/* eslint-disable no-undef */
import { createList, applyFilters, applySearch } from './filterFunctions';

describe('filterFunctions', () => {
  let carsArray;
  let criteria;
  let filterProperties;
  let mockResult;

  beforeEach(async () => {
    carsArray = [
      {
        id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
        brand: 'Opel',
        model: 'Corsa',
        picture: 'http://localhost:3001/img/opelCorsa.jpeg',
        className: 'A',
        price: 50,
      },
      {
        id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
        brand: 'Opel',
        model: 'Astra',
        picture: 'http://localhost:3001/img/opelCorsa.jpeg',
        className: 'B',
        price: 50,
      },
      {
        id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
        brand: 'BMW',
        model: 'Opel',
        picture: 'http://localhost:3001/img/opelCorsa.jpeg',
        className: 'B',
        price: 50,
      },
      {
        id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
        brand: 'VW',
        model: 'Golf',
        picture: 'http://localhost:3001/img/opelCorsa.jpeg',
        className: 'C',
        price: 50,
      },
    ];
    criteria = {
      brand: '',
      model: '',
      className: '',
    };

    filterProperties = ['brand', 'model'];
    mockResult = [
      {
        id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
        brand: 'Opel',
        model: 'Corsa',
        picture: 'http://localhost:3001/img/opelCorsa.jpeg',
        className: 'A',
        price: 50,
      },
    ];
  });

  // it('applyFilter should return the input array if no criteria are provided', () => {
  //   // Arramge & Act

  //   const result = applyFilters(carsArray, criteria);

  //   // Assert

  //   expect(result).toEqual(carsArray);
  // });

  // it('applyFilter should filter by brand if only brand is provided', () => {
  //   // Arramge
  //   criteria.brand = 'Opel';
  //   mockResult = [
  //     {
  //       id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
  //       brand: 'Opel',
  //       model: 'Corsa',
  //       picture: 'http://localhost:3001/img/opelCorsa.jpeg',
  //       className: 'A',
  //       price: 50,
  //     },
  //     {
  //       id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
  //       brand: 'Opel',
  //       model: 'Astra',
  //       picture: 'http://localhost:3001/img/opelCorsa.jpeg',
  //       className: 'B',
  //       price: 50,
  //     },
  //   ];
  //   // Act

  //   const result = applyFilters(carsArray, criteria);

  //   // Assert

  //   expect(result).toEqual(mockResult);
  // });

  // it('applyFilter should filter by model if only model is provided', () => {
  //   // Arramge
  //   criteria.model = 'Corsa';

  //   // Act

  //   const result = applyFilters(carsArray, criteria);

  //   // Assert

  //   expect(result).toEqual(mockResult);
  // });

  // it('applyFilter should filter by className if only className is provided', () => {
  //   // Arramge
  //   criteria.className = 'A';

  //   // Act

  //   const result = applyFilters(carsArray, criteria);

  //   // Assert

  //   expect(result).toEqual(mockResult);
  // });

  // it('applyFilter should filter by multiple criteria', () => {
  //   // Arramge
  //   criteria.brand = 'Opel';
  //   criteria.model = 'Corsa';

  //   // Act

  //   const result = applyFilters(carsArray, criteria);

  //   // Assert

  //   expect(result).toEqual(mockResult);
  // });

  // it('applyFilter should return empty array if there is no match to multiple criteria', () => {
  //   // Arramge
  //   criteria.brand = 'Opel';
  //   criteria.model = 'Corsa';
  //   criteria.className = 'E';
  //   mockResult = [];
  //   // Act

  //   const result = applyFilters(carsArray, criteria);

  //   // Assert

  //   expect(result).toEqual(mockResult);
  // });

  it('createLIst should return unique values based on the input criteria', () => {
    // Arramge
    const listResultMock = ['None', 'A', 'B', 'C'];
    // Act

    const result = createList(carsArray, 'className');

    // Assert

    expect(result).toEqual(listResultMock);
  });

  it('createLIst should return unique values based on the input criteria', () => {
    // Arramge
    const listResultMock = ['None', 'Opel', 'BMW', 'VW'];
    // Act

    const result = createList(carsArray, 'brand');

    // Assert

    expect(result).toEqual(listResultMock);
  });
});
