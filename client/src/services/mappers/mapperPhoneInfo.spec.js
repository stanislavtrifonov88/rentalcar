import mapperPhoneInfo from './mapperPhoneInfo';

describe('mapperPhoneInfo', () => {

  it('mapperPhoneInfo should return country and number from the phone library output', () => {
      // Arramge
      const inputMock = { 
        countryCallingCode: "359",
        nationalNumber: "888111444",
        number: "+359888111444",
        metadata: {},
        country: "BG",
      }
      const resultMock = {
        country: "BG",
        number: "+359888111444",};
      // Act
  
      const result = mapperPhoneInfo(inputMock);
  
      // Assert
  
      expect(result).toEqual(resultMock);
    });

    it('mapperPhoneInfo should return country and number from the phone library output', () => {
        // Arramge
        const inputMock = { 
          countryCallingCode: "40",
          nationalNumber: "888111444",
          number: "+40888111444",
          metadata: {},
          country: "RO",
        }
        const resultMock = {
          country: "RO",
          number: "+40888111444",};
        // Act
    
        const result = mapperPhoneInfo(inputMock);
    
        // Assert
    
        expect(result).toEqual(resultMock);
      });
});