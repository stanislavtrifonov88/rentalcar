import { createContractErrorHandling } from './createContractErrorHandling';
import { NewContractDTO } from '../../contracts/models/newContract.dto';
import * as errorMessages from './error.messages';
import { timeStamp } from '../constants/dateModifiers';

describe('createContractErrorHandling', () => {
  let mockInput: NewContractDTO = null;

  beforeEach(async () => {
    mockInput = {
      phone: '359888111444',
      startDate: timeStamp(),
      contractEndDate: timeStamp(1),
    };
  });

  it('should get throw an error with the correct message when start date is not valid', async () => {
    // Arrange
    mockInput.startDate = 'test';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(
      errorMessages.validStartDate,
    );
  });

  it('should get throw an error with the correct message when start date is not valid', async () => {
    // Arrange
    mockInput.startDate = 'test';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(
      errorMessages.validStartDate,
    );
  });

  it('should get throw an error with the correct message when start date is not valid', async () => {
    // Arrange
    mockInput.contractEndDate = 'test';

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(
      errorMessages.validEndDate,
    );
  });

  it('should get throw an error with the correct message when start date is in the past', async () => {
    // Arrange
    mockInput.startDate = timeStamp(-2);

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(
      errorMessages.startDateInThePast,
    );
  });

  it('should get throw an error with the correct message when return date is in the past', async () => {
    // Arrange

    mockInput.contractEndDate = timeStamp(-2);

    // Act & Assert

    expect(() => createContractErrorHandling(mockInput)).toThrowError(
      errorMessages.returnDateInThePast,
    );
  });
});
