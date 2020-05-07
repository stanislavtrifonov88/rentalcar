import { dateFormatter, differenceInYears, timeStamp } from '../../shared/dateModifiers';
import { toastError } from './toastify';

export const bookingFormErrors = (checkoutForm, checkoutFormValidations) => {
  const age = differenceInYears(checkoutForm.birthdate);
  toastError(checkoutFormValidations.firstName.valid, 'First name must be between 2 and 25 letters');
  toastError(checkoutFormValidations.lastName.valid, 'Last name must be between 2 and 25 letters');
  toastError(age >= 18, 'You must be at least 18 years old');
  if (!checkoutFormValidations.birthdate.touched) {
    toastError(checkoutFormValidations.birthdate.touched, 'Please select a date');
    return;
  }
  toastError(checkoutFormValidations.birthdate.valid, 'Please enter a valid date');
  toastError(timeStamp() > dateFormatter(checkoutForm.birthdate), 'Birthdate cannot be in the future');
};

export const carCheckoutErrors = (checkoutForm, checkoutFormValidations) => {
  toastError(dateFormatter(checkoutForm.startDate) < dateFormatter(checkoutForm.contractEndDate), 'Return date cannot be in the past');
  toastError(checkoutFormValidations.contractEndDate.valid, 'Please enter a valid date');
};
