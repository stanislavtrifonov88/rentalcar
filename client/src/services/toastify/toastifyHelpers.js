import { dateFormatter, differenceInYears } from '../../shared/dateModifiers';
import { toastError } from './toastify';

export const bookingFormErrors = (checkoutForm, checkoutFormValidations) => {
  const age = differenceInYears(checkoutForm.birthdate)
  toastError(checkoutFormValidations.firstName.valid, 'First name must be between 2 and 25 letters');
  toastError(checkoutFormValidations.lastName.valid, 'Last name must be between 2 and 25 letters');
  toastError(age >= 18, 'You must be at least 18 years old');
  if (!checkoutFormValidations.birthdate.touched) {
    toastError(checkoutFormValidations.birthdate.touched, 'Please select a date');
    return;
  }
  toastError(checkoutFormValidations.birthdate.valid, 'Please enter a valid date');
  toastError(dateFormatter(checkoutForm.startDate) < dateFormatter(checkoutForm.contractEndDate), 'Birthdate cannot be in the future');
  // toastError(dateFormatter(checkoutForm.startDate) < dateFormatter(checkoutForm.contractEndDate), 'Return date cannot be in the past');
};

export const carReturned = () => 'hi';
