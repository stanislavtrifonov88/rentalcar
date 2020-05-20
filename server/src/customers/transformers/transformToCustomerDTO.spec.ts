import { transformToCustomerDTO } from './transformToCustomerDTO';

describe('transformToCustomerDTO', () => {
  it('should get *Customer* entity and transform them to *CustomerDTO*', async () => {
    // Arrange

    const mockCustomer: any = {
        phone: '359888111444',
        firstName: 'Asen',
        lastName: 'Georgiev',
        birthdate: '1968-04-29',
        isDeleted: false,
        contracts:
         [ {
             id: '96ea984f-b0a4-4d62-bb0c-59a368f9c3eb',
             startDate: '2020-05-07T05:55:00.000Z',
             contractEndDate: '2020-05-13T05:55:00.000Z',
             deliveredDate: '2020-05-13T05:55:00.000Z',
             pricePaid: 0,
             isDeleted: false,
             car: [],
             customer: [] },
           {
             id: 'b1b672dd-6090-4bc7-88c7-959f520d9043',
             startDate: '2020-05-20T06:03:00.000Z',
             contractEndDate: '2020-05-24T22:01:00.000Z',
             deliveredDate: '2020-05-20T06:03:32.849Z',
             pricePaid: 0,
             isDeleted: false,
             car: [],
             customer: [] } ] }

    const mockResult = {
        phone: '359888111444',
        firstName: 'Asen',
        lastName: 'Georgiev',
        birthdate: '1968-04-29',
        age: 52,
        previousContracts: 2,
    };

    // Act

    const result = await transformToCustomerDTO(mockCustomer);

    // Assert

    expect(result).toEqual(mockResult);
  });
});
