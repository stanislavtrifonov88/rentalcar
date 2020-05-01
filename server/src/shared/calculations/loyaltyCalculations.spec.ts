import * as loyaltyCalculations from './loyaltyCalculations';
import * as loyaltyDiscounts from '../discounts/loyaltyDiscounts';


describe('LoyaltyCalcution service', () => {
  let customerData;

  beforeEach(async () => {
    customerData = {
        phone: '3233',
        firstName: 'General',
        lastName: 'Mutafciiski',
        birthdate: '1964-05-01',
        isDeleted: false,
        contracts:
         [ 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
         ]}
  });


  it('loyaltyDiscount case 1: customer has no previous contracts', () => {
  // Arramge
    customerData.contracts = []

    // Act

    const result = loyaltyCalculations.loyaltyDiscount(customerData);

    // Assert

    expect(result).toEqual(loyaltyDiscounts.previousContracts0);
  });

  it('loyaltyDiscount case 2: customer has 1-4 previous contracts', () => {
    // Arramge
      customerData.contracts = [
        { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
        { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
        { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
      ]
  
      // Act
  
      const result = loyaltyCalculations.loyaltyDiscount(customerData);
  
      // Assert
  
      expect(result).toEqual(loyaltyDiscounts.previousContracts1To4);
    });

    it('loyaltyDiscount case 3: customer has 5-9 previous contracts', () => {
        // Arramge
          customerData.contracts = [
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
            { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
          ]
      
          // Act
      
          const result = loyaltyCalculations.loyaltyDiscount(customerData);
      
          // Assert
      
          expect(result).toEqual(loyaltyDiscounts.previousContracts5To9);
        });

        it('loyaltyDiscount case 4: customer has 5-9 previous contracts', () => {
            // Arramge
              customerData.contracts = [
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
              ]
          
              // Act
          
              const result = loyaltyCalculations.loyaltyDiscount(customerData);
          
              // Assert
          
              expect(result).toEqual(loyaltyDiscounts.previousContracts10To19);
            });
                    it('loyaltyDiscount case 5: customer has 10-19 previous contracts', () => {
            // Arramge
              customerData.contracts = [
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'}, 
                { id: 'ec81e572-4fe3-49e6-b76b-5705bcb46a13'},
              ]
          
              // Act
          
              const result = loyaltyCalculations.loyaltyDiscount(customerData);
          
              // Assert
          
              expect(result).toEqual(loyaltyDiscounts.previousContracts10To19);
            });
    
            it('loyaltyDiscount case 6: customer has 20 or more previous contracts', () => {
                  // Act
              
                  const result = loyaltyCalculations.loyaltyDiscount(customerData);
              
                  // Assert
              
                  expect(result).toEqual(loyaltyDiscounts.previousContractsAbove20);
                });

});