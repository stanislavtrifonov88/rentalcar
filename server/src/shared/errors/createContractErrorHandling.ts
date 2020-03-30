import * as moment from 'moment';
import { CarRentalSystemError } from '../exceptions/carRental-system.error';
import { NewContractDTO } from '../../contracts/models/newContract.dto';
import * as errorMessages from './error.messages';

export const createContractErrorHandling = (body: NewContractDTO) => {
  const now = (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(-15, 'minutes')).format('YYYY-MM-DDTHH:mm');

  if (!moment(body.startDate).isValid()) {
    throw new CarRentalSystemError(errorMessages.validStartDate, 400);
  }

  if (!moment(body.contractEndDate).isValid()) {
    throw new CarRentalSystemError(errorMessages.validEndDate, 400);
  }

  if (now > body.startDate) {
    throw new CarRentalSystemError(errorMessages.startDateInThePast, 400);
  }

  if (body.startDate > body.contractEndDate) {
    throw new CarRentalSystemError(errorMessages.returnDateInThePast, 400);
  }

  if (body.borrowerAge < 18) {
    throw new CarRentalSystemError(errorMessages.ageBelow18, 400);
  }

  if (body.borrowerFirstName.length < 2) {
    throw new CarRentalSystemError(errorMessages.firstNameMinLength, 400);
  }

  if (body.borrowerFirstName.length > 25) {
    throw new CarRentalSystemError(errorMessages.firstNamemaxLength, 400);
  }

  if (body.borrowerLastName.length < 2) {
    throw new CarRentalSystemError(errorMessages.lastNameMinLength, 400);
  }

  if (body.borrowerLastName.length > 25) {
    throw new CarRentalSystemError(errorMessages.lastNamemaxLength, 400);
  }
};
