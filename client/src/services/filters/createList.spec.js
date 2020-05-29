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