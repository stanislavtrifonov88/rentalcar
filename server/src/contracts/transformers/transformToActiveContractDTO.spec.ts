import { transformToActiveContractDTO } from './transformToActiveContractDTO';

describe('transformToReturnedCarDTO', () => {
  it('should get *Contract*, *Car* and *Customer* entities and transform them to *ReturnedCarDTO*', async () => {
    // Arrange
    const mockContract: any = {
      test: 'test',
    };
    const mockCustomer: any = {
      test: 'test',
    };

    const transformToStandardContractDTO: any = jest.fn(() => {
      return {
        id: 'b6f496c2-5d1c-404b-9496-bd6ee2b7f309',
        startDate: '2020-05-20T05:44:00.000Z',
        contractEndDate: '2020-05-26T22:01:00.000Z',
        brand: 'Opel',
        model: 'Astra',
        phone: '359888111444',
        firstName: 'Asen',
        lastName: 'Georgiev',
        birthdate: '1968-04-29',
        age: 52,
        price: 70,
      };
    });
    const transformToStandardCustomerDTO: any = jest.fn(() => {
      return {
        previousContracts: 27,
      };
    });

    const mockResult = {
      id: 'b6f496c2-5d1c-404b-9496-bd6ee2b7f309',
      startDate: '2020-05-20T05:44:00.000Z',
      contractEndDate: '2020-05-26T22:01:00.000Z',
      brand: 'Opel',
      model: 'Astra',
      phone: '359888111444',
      firstName: 'Asen',
      lastName: 'Georgiev',
      birthdate: '1968-04-29',
      age: 52,
      price: 70,
      previousContracts: 27,
    };

    // Act

    const result = await transformToActiveContractDTO(
      mockContract,
      mockCustomer,
      transformToStandardContractDTO,
      transformToStandardCustomerDTO,
    );

    // Assert

    expect(result).toEqual(mockResult);
  });
});
