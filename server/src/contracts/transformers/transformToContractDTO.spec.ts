import { transformToContractDTO } from "./transformToContractDTO";

describe('transformToContractDTO', () => { 
    it('should get a *Contract* entity and transform it to *IndividualContractDTO*', async () => {

        // Arrange
        const mockInput: any = {
            id: '44affbb9-b279-4291-9c7f-37bd538ed28e',
            startDate: '2020-04-17T06:18:00.000Z',
            contractEndDate: '2020-04-29T06:18:00.000Z',
            deliveredDate: null,
            pricePaid: 0,
            isDeleted: false,
            car: {
               id: '8d1cd009-ef92-41a0-84e3-24936ad797fe',
               brand: 'Volkswagen',
               model: 'Golf',
               picture: 'http://localhost:3001/img/vwGolf.jpeg',
               isBorrowed: true,
               isDeleted: false,
               className: {className: 'A', price: 70} },
            customer: {
               phone: '359888111555',
               firstName: 'Georgi',
               lastName: 'Asenov',
               birthdate: '1978-12-29',
               isDeleted: false }
            }
        
        const mockResult =     {
            "id": "44affbb9-b279-4291-9c7f-37bd538ed28e",
            "startDate": "2020-04-17T06:18:00.000Z",
            "contractEndDate": "2020-04-29T06:18:00.000Z",
            "brand": "Volkswagen",
            "model": "Golf",
            "firstName": "Georgi",
            "lastName": "Asenov",
            "birthdate": "1978-12-29",
            "age": 41,
            "price": 70
        }
    
        // Act
    
        const result = await transformToContractDTO(mockInput)
    
        // Assert
    
        expect(result).toEqual(mockResult);
    
      });
});