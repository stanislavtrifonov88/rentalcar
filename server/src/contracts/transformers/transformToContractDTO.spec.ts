import { transformToContractDTO } from "./transformToContractDTO";

describe('transformToContractDTO', () => { 
    it('should get a *Contract* entity and transform it to *IndividualContractDTO*', async () => {

        // Arrange
        const mockInput: any = {
            borrowerFirstName: 'Markd',
            borrowerLastName: 'Ottod',
            borrowerAge: '19',
            startDate: '2020-03-26T16:46',
            contractEndDate: '2020-03-30T16:46',
            car: {
               id: '057aebe9-7f5e-4840-b086-043f80468c47',
               brand: 'Opel',
               model: 'Astra',
               picture:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSG4OCO-dt8FkyoyIEJ8-A1yFoXo_75im3eXyXULpNyfYNhWtM',
               isBorrowed: true,
               isDeleted: false,
               className: {
                  id: 'c6b91aec-01ba-403d-9e2f-f60fe4c9b4f0',
                  className: 'B',
                  price: 70,
                  isDeleted: false } },
            deliveredDate: null,
            id: '7958e329-6fb1-46b5-98dd-c87a80357718',
            pricePaid: 0,
            isDeleted: false }

        const mockResult = { id: '7958e329-6fb1-46b5-98dd-c87a80357718',
        borrowerFirstName: 'Markd',
        borrowerLastName: 'Ottod',
        borrowerAge: '19',
        startDate: '2020-03-26T16:46',
        contractEndDate: '2020-03-30T16:46',
        brand: 'Opel',
        model: 'Astra',
        price: 70 }
    
        // Act
    
        const result = await transformToContractDTO(mockInput)
    
        /// Assert
    
        expect(result).toEqual(mockResult);
    
      });
});