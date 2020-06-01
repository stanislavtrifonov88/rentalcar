import applyFilters from './applyFilters';
import { carsArrayFn, criteriaFn } from './filterTestingBase';

describe('filterFunctions', () => {

  let filterProperties;
  let mockResult;

  const carsArray = carsArrayFn()


  beforeEach(async () => {
    // carsArray = [
    //   {
    //     id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
    //     brand: 'Opel',
    //     model: 'Corsa',
    //     picture: 'http://localhost:3001/img/opelCorsa.jpeg',
    //     className: 'A',
    //     price: 50,
    //   },
    //   {
    //     id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
    //     brand: 'Opel',
    //     model: 'Astra',
    //     picture: 'http://localhost:3001/img/opelCorsa.jpeg',
    //     className: 'B',
    //     price: 50,
    //   },
    //   {
    //     id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
    //     brand: 'BMW',
    //     model: 'Opel',
    //     picture: 'http://localhost:3001/img/opelCorsa.jpeg',
    //     className: 'B',
    //     price: 50,
    //   },
    //   {
    //     id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
    //     brand: 'VW',
    //     model: 'Golf',
    //     picture: 'http://localhost:3001/img/opelCorsa.jpeg',
    //     className: 'C',
    //     price: 50,
    //   },
    // ];
    // criteria = {
    //   brand: '',
    //   model: '',
    //   className: '',
    // };

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

  it('applyFilter should return the input array if no criteria are provided', () => {
    // Arramge & Act
    const criteria = criteriaFn({brand: ''})
    const result = applyFilters(carsArray, criteria);

    // Assert

    expect(result).toEqual(carsArray);
  });

  it('applyFilter should filter by brand if only brand is provided', () => {
    // Arramge
    const criteria = criteriaFn({brand: ''})
    mockResult = [
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
    ];

    // Act

    const result = applyFilters(carsArray, criteria);

    // Assert

    expect(result).toEqual(mockResult);
  });

  it('applyFilter should filter by model if only model is provided', () => {
    // Arramge
    const criteria = criteriaFn({model: 'Corsa'})
    // criteria.model = 'Corsa';

    // Act

    const result = applyFilters(carsArray, criteria);

    // Assert

    expect(result).toEqual(mockResult);
  });

  it('applyFilter should filter by className if only className is provided', () => {
    // Arramge
    const criteria = criteriaFn({className: 'A'})
    // criteria.className = 'A';

    // Act

    const result = applyFilters(carsArray, criteria);

    // Assert

    expect(result).toEqual(mockResult);
  });

  it('applyFilter should filter by multiple criteria', () => {
    // Arramge
    // criteria.brand = 'Opel';
    // criteria.model = 'Corsa';
    const criteria = criteriaFn({brand: 'Opel', model: 'Corsa'})
    // const criteria = criteriaFn({brand: 'Corsa'})

    // Act

    const result = applyFilters(carsArray, criteria);

    // Assert

    expect(result).toEqual(mockResult);
  });

  it('applyFilter should return empty array if there is no match to multiple criteria', () => {
    // Arramge
    // criteria.brand = 'Opel';
    // criteria.model = 'Corsa';
    // criteria.className = 'E';
    const criteria = criteriaFn({brand: 'Opel', model: 'Corsa', className: 'E'})
    mockResult = [];
    // Act

    const result = applyFilters(carsArray, criteria);

    // Assert

    expect(result).toEqual(mockResult);
  });
});
