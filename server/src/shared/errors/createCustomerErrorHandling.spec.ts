import { NewContractDTO } from '../../contracts/models/newContract.dto';
import * as errorMessages from './error.messages';
import { timeStamp, differenceInYears } from '../constants/dateModifiers';
import { NewCustomerDTO } from '../../customers/models/newCustomerDTO';
import { createCustomerErrorHandling } from './createCustomerErrorHandling';

describe('createContractErrorHandling', () => {
  let mockInput: NewCustomerDTO = null;

  beforeEach(async () => {
    mockInput = {
      phone: 359888111444,
      firstName: 'test',
      lastName: 'test',
      birthdate: '1970-05-05',
    };
  });

  it('should throw an error with the correct message when first name length is below minumum', async () => {
    // Arrange
    mockInput.firstName = 't';

    // Act && Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.firstNameMinLength,
    );
  });

  it('should throw an error with the correct message when first name length is above maximum', async () => {
    // Arrange
    mockInput.firstName = 'tttttttttttttttttttttttttttttttttttttttttttttttt';

    // Act & Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.firstNamemaxLength,
    );
  });

  it('should throw an error with the correct message when last name length is below minumum', async () => {
    // Arrange
    mockInput.lastName = 't';

    // Act && Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.lastNameMinLength,
    );
  });

  it('should throw an error with the correct message when last name length is above maximum', async () => {
    // Arrange
    mockInput.lastName = 'tttttttttttttttttttttttttttttttttttttttttttttttt';

    // Act & Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.lastNamemaxLength,
    );
  });

  it('should throw an error with the correct message when age is below 18', async () => {
    // Arrange
    mockInput.birthdate = '2008-05-05';
    const years = differenceInYears(mockInput.birthdate);

    // Act & Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.ageBelow18,
    );
  });

  it('should throw an error with the correct message when BG mobile phone number length is not 13 digits', async () => {
    // Arrange
    mockInput.phone = 35988811144;

    // Act & Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.validBGPhoneNumber,
    );
  });

  it('should throw an error with the correct message when RO mobile phone number length is not 12 digits', async () => {
    // Arrange
    mockInput.phone = 4088811144;

    // Act & Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.validROPhoneNumber,
    );
  });

  it('should throw an error with the correct message when international mobile phone number length is below 11 digits', async () => {
    // Arrange
    mockInput.phone = 338881;

    // Act & Assert

    expect(() => createCustomerErrorHandling(mockInput)).toThrowError(
      errorMessages.validIntPhoneNumber,
    );
  });
});
