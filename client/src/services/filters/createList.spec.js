import createList from './createList';
import { carsArrayFn, criteriaFn } from './filterTestingBase';
describe('createList', () => {
  const carsArray = carsArrayFn()
it('createLIst should return unique values based on the className', () => {
    // Arramge
    const listResultMock = ['None', 'A', 'B', 'C'];
    // Act

    const result = createList(carsArray, 'className');

    // Assert

    expect(result).toEqual(listResultMock);
  });

  it('createLIst should return unique values based on the brand', () => {
    // Arramge
    const listResultMock = ['None', 'Opel', 'BMW', 'VW'];
    // Act

    const result = createList(carsArray, 'brand');

    // Assert

    expect(result).toEqual(listResultMock);
  });

  it('createLIst should return unique values based on the model', () => {
    // Arramge
    const listResultMock = ['None', 'Corsa', 'Astra', 'M3', 'Golf'];
    // Act

    const result = createList(carsArray, 'model');

    // Assert

    expect(result).toEqual(listResultMock);
  });
});