import * as moment from 'moment';
import { createContractErrorHandling } from './createContractErrorHandling';
import { NewContractDTO } from '../../contracts/models/newContract.dto';
import * as errorMessages from './error.messages';

describe('createContractErrorHandling', () => {
  let mockInput: NewContractDTO = null;

  beforeEach(async () => {
    mockInput = {
      borrowerFirstName: 'test',
      borrowerLastName: 'test',
      borrowerAge: 18,
      startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
      contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
    };
  });

  it('should get throw an error with the correct message when first name length is below minumum', async () => {
    // Arrange
    mockInput.borrowerFirstName = 't',

    // Act && Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.firstNameMinLength);
  });

  it('should get throw an error with the correct message when first name length is above maximum', async () => {
    // Arrange
    mockInput.borrowerFirstName = 'tttttttttttttttttttttttttttttttttttttttttttttttt';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.firstNamemaxLength);
  });

  it('should get throw an error with the correct message when last name length is below minumum', async () => {
    // Arrange
    mockInput.borrowerLastName = 't';

    // Act && Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.lastNameMinLength);
  });

  it('should get throw an error with the correct message when last name length is above maximum', async () => {
    // Arrange
    mockInput.borrowerLastName = 'tttttttttttttttttttttttttttttttttttttttttttttttt';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.lastNamemaxLength);
  });

  it('should get throw an error with the correct message when start date is not valid', async () => {
    // Arrange
    mockInput.startDate = 'test';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.validStartDate);
  });


  it('should get throw an error with the correct message when start date is not valid', async () => {
    // Arrange
    mockInput.contractEndDate = 'test';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.validEndDate);
  });

  it('should get throw an error with the correct message when start date is in the past', async () => {
    // Arrange
    mockInput.startDate = (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(-48, 'hours')).format('YYYY-MM-DDTHH:mm');

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.startDateInThePast);
  });

  it('should get throw an error with the correct message when return date is in the past', async () => {
    // Arrange

    mockInput.contractEndDate = (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(-48, 'hours')).format('YYYY-MM-DDTHH:mm');

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.returnDateInThePast);
  });

  it('should get throw an error with the correct message when return date is in the past', async () => {
    // Arrange
    mockInput.borrowerAge = 17;

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.ageBelow18);
  });
});
