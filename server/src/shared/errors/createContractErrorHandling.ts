import * as moment from 'moment';
import { NewContractDTO } from '../../contracts/models/newContract.dto';
import * as errorMessages from './error.messages';
import { should } from '../util/Guard';
import { timeStamp } from '../constants/dateModifiers';

export const createContractErrorHandling = (body: NewContractDTO): void => {
  const now = timeStamp(0, -15)

  should(moment(body.startDate).isValid(), errorMessages.validStartDate)

  should(moment(body.contractEndDate).isValid(), errorMessages.validEndDate)

  should(now < body.startDate, errorMessages.startDateInThePast)

  should(body.startDate < body.contractEndDate, errorMessages.returnDateInThePast)

};
