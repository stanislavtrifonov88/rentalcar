import * as moment from 'moment';
import { NewContractDTO } from '../../contracts/models/newContract.dto';
import * as errorMessages from './error.messages';
import { should } from '../util/Guard';
import { dateFormat } from '../constants/constants';

export const createContractErrorHandling = (body: NewContractDTO): void => {
  const now = (moment(new Date(), dateFormat).add(-15, 'minutes')).format(dateFormat);

  should(moment(body.startDate).isValid(), errorMessages.validStartDate)

  should(moment(body.contractEndDate).isValid(), errorMessages.validEndDate)

  should(now < body.startDate, errorMessages.startDateInThePast)

  should(body.startDate < body.contractEndDate, errorMessages.returnDateInThePast)

  should(body.borrowerAge >= 18, errorMessages.ageBelow18)

  should(body.borrowerFirstName.length >= 2, errorMessages.firstNameMinLength)

  should(body.borrowerFirstName.length < 25, errorMessages.firstNamemaxLength)

  should(body.borrowerLastName.length >= 2, errorMessages.lastNameMinLength)

  should(body.borrowerLastName.length < 25, errorMessages.lastNamemaxLength)
};
