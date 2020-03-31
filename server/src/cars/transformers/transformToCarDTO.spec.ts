import { transformToCarDTO } from "./transformToCarDTO";

describe('transformToCarDTO', () => { 
    it('should get a *Car entity* and transform it to *IndividualCarDTO*', async () => {

        // Arrange
        const mockInput: any = {
            id: '057aebe9-7f5e-4840-b086-043f80468c47',
            brand: 'Opel',
            model: 'Astra',
            picture:
             'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSG4OCO-dt8FkyoyIEJ8-A1yFoXo_75im3eXyXULpNyfYNhWtM',
            isBorrowed: false,
            isDeleted: false,
            className: {
               id: 'c6b91aec-01ba-403d-9e2f-f60fe4c9b4f0',
               className: 'B',
               price: 70,
               isDeleted: false } }

        const mockResult = { id: '057aebe9-7f5e-4840-b086-043f80468c47',
        brand: 'Opel',
        model: 'Astra',
        picture:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSG4OCO-dt8FkyoyIEJ8-A1yFoXo_75im3eXyXULpNyfYNhWtM',
        className: 'B',
        price: 70 }
    
        // Act
    
        const result = await transformToCarDTO(mockInput)
    
        // Assert
    
        expect(result).toEqual(mockResult);
    
      });
});