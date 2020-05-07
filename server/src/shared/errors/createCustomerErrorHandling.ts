import * as moment from 'moment';
import * as errorMessages from './error.messages';
import { should } from '../util/Guard';
import { differenceInYears } from '../constants/dateModifiers';
import { NewCustomerDTO } from '../../customers/models/newCustomerDTO';

export const createCustomerErrorHandling = (body: NewCustomerDTO): void => {

  should(moment(body.birthdate).isValid(), errorMessages.validBirthdate)

    const age = differenceInYears(body.birthdate)

  should(age >= 18, errorMessages.ageBelow18)

  should(body.firstName.length >= 2, errorMessages.firstNameMinLength)

  should(body.firstName.length < 25, errorMessages.firstNamemaxLength)

  should(body.lastName.length >= 2, errorMessages.lastNameMinLength)

  should(body.lastName.length < 25, errorMessages.lastNamemaxLength)
};