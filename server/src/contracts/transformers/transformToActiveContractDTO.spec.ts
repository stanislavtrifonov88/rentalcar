import { transformToActiveContractDTO } from './transformToActiveContractDTO';

describe('transformToReturnedCarDTO', () => {
  it('should get *Contract*, *Car* and *Customer* entities and transform them to *ReturnedCarDTO*', async () => {
    // Arrange
    const mockContract: any = {
      test: 'test',
    };
    const mockCar: any = {
      test: 'test',
    };

    const mockCustomer: any = {
      test: 'test',
    };

    const transformToStandardContractDTO: any = jest.fn(() => {});
    const transformToStandardCarDTO: any = jest.fn(() => {});
    const transformToStandardCustomerDTO: any = jest.fn(() => {
      return {
        startDate: '2020-05-18T16:20:40.550Z',
        contractEndDate: '2020-05-19T19:10:40.550Z',
        phone: '359888111444',
        age: 52,
        price: 70,
        previousContracts: 55,
      };
    });

    const mockResult = {
      startDate: '2020-05-18T16:20:40.550Z',
      contractEndDate: '2020-05-19T19:10:40.550Z',
      phone: '359888111444',
      age: 52,
      price: 70,
      previousContracts: 55,
    };

    // Act

    const result = await transformToActiveContractDTO(
      mockContract,
      mockCar,
      mockCustomer,
      transformToStandardContractDTO,
      transformToStandardCarDTO,
      transformToStandardCustomerDTO,
    );

    // Assert

    expect(result).toEqual(mockResult);
  });
});
