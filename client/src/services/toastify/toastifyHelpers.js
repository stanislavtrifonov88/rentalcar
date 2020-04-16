import { dateFormatter } from '../../shared/dateModifiers';
import { toastError } from './toastify';

export const bookingFormErrors = (checkoutForm, checkoutFormValidations) => {
  toastError(checkoutFormValidations.borrowerFirstName.valid, 'First name must be between 2 and 25 letters');
  toastError(checkoutFormValidations.borrowerLastName.valid, 'Last name must be between 2 and 25 letters');
  toastError(checkoutFormValidations.borrowerAge.valid, 'Please enter a valid age');
  toastError(checkoutForm.borrowerAge >= 18, 'You must be at least 18 years old');
  if (!checkoutFormValidations.contractEndDate.touched) {
    toastError(checkoutFormValidations.contractEndDate.touched, 'Please select a date');
    return;
  }
  toastError(checkoutFormValidations.contractEndDate.valid, 'Please enter a valid date');
  toastError(dateFormatter(checkoutForm.startDate) < dateFormatter(checkoutForm.contractEndDate), 'Return date cannot be in the past');
};

export const carReturned = () => 'hi';
