import * as loyaltyCalculations from './loyaltyCalculations';
import * as loyaltyDiscounts from '../discounts/loyaltyDiscounts';


describe('LoyaltyCalcution service', () => {
  let returnedCarData;

  beforeEach(async () => {
    returnedCarData = {
      startDate: '2020-05-18T11:55:00.000Z',
      contractEndDate: '2020-05-20T22:01:00.000Z',
      phone: '359888111444',
      age: 52,
      price: 70,
      previousContracts: 54 }
  });


  it('loyaltyDiscount case 1: customer has no previous contracts', () => {
  // Arramge
    returnedCarData.previousContracts = 0;

    // Act

    const result = loyaltyCalculations.loyaltyDiscount(returnedCarData);

    // Assert

    expect(result).toEqual(loyaltyDiscounts.previousContracts0);
  });

  it('loyaltyDiscount case 2: customer has 1-4 previous contracts', () => {
    // Arramge
      returnedCarData.previousContracts = 4;
  
      // Act
  
      const result = loyaltyCalculations.loyaltyDiscount(returnedCarData);
  
      // Assert
  
      expect(result).toEqual(loyaltyDiscounts.previousContracts1To4);
    });

    it('loyaltyDiscount case 3: customer has 5-9 previous contracts', () => {
        // Arramge
          returnedCarData.previousContracts = 9;
      
          // Act
      
          const result = loyaltyCalculations.loyaltyDiscount(returnedCarData);
      
          // Assert
      
          expect(result).toEqual(loyaltyDiscounts.previousContracts5To9);
        });


        it('loyaltyDiscount case 5: customer has 10-19 previous contracts', () => {
            // Arramge
              returnedCarData.previousContracts = 19;
          
              // Act
          
              const result = loyaltyCalculations.loyaltyDiscount(returnedCarData);
          
              // Assert
          
              expect(result).toEqual(loyaltyDiscounts.previousContracts10To19);
            });
    
            it('loyaltyDiscount case 6: customer has 20 or more previous contracts', () => {
                  // Act
              
                  const result = loyaltyCalculations.loyaltyDiscount(returnedCarData);
              
                  // Assert
              
                  expect(result).toEqual(loyaltyDiscounts.previousContractsAbove20);
                });

});