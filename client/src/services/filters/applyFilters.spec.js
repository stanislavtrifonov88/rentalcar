import applyFilters from './applyFilters';
import { carsArrayFn, criteriaFn, opelCorsaMock } from './filterTestingBase';

describe('applyFilters', () => {

  // const carsArray = carsArrayFn()

  const cases = [
    {
      name:
        'case 1: applyFilter should return the input array if no criteria are provided',
      input: { brand: '' },
      result: carsArrayFn()
    },
    {
      name:
        'case 2: applyFilter should filter by brand if only brand is provided',
      input: { brand: 'Opel' },
      result: [
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
      ]
    },
    {
      name:
        'case 3: applyFilter should filter by model if only model is provided',
      input: { model: 'Corsa' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 4.1: applyFilter should filter by brand and model no matter which is provided first',
      input: { brand: 'Opel', model: 'Corsa' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 4.2: applyFilter should filter by brand and model no matter which is provided first',
      input: { model: 'Corsa', brand: 'Opel' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 5: applyFilter should filter by className if only className is provided',
      input: { className: 'A' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 6.1: applyFilter should filter by 3 criteria no matter the order they are provided in',
      input: { brand: 'Opel', model: 'Corsa', className: 'A' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 6.2: applyFilter should filter by 3 criteria no matter the order they are provided in',
      input: {  model: 'Corsa', className: 'A', brand: 'Opel' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 6.3: applyFilter should filter by 3 criteria no matter the order they are provided in',
      input: {  className: 'A', brand: 'Opel', model: 'Corsa' },
      result: opelCorsaMock(),
    },
    {
      name:
        'case 7.1: applyFilter should return empty array if there is no match to multiple criteria',
      input: {  className: 'E', brand: 'Opel', model: 'Corsa' },
      result: [],
    },
    {
      name:
        'case 7.2: applyFilter should return empty array if there is no match to multiple criteria',
      input: {  className: 'A', brand: 'VW', model: 'Corsa' },
      result: [],
    },
    {
      name:
        'case 7.3: applyFilter should return empty array if there is no match to multiple criteria',
      input: {  className: 'A', brand: 'Opel', model: 'M3' },
      result: [],
    },
  ];

  cases.forEach(test => {
    it(test.name, () => {
      //arrange
      const returnedCarData = carsArrayFn();
      const criteria = criteriaFn(test.input)
      //act
      const result = applyFilters(
        returnedCarData,
        criteria,
      );
      //assert
      expect(result).toEqual(test.result);
    });
  });
});

