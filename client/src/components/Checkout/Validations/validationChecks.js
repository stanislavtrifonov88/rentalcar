import * as validationStatus from './validationStatus';
import { differenceInYears } from '../../../shared/dateModifiers';

export const isValidField = (field) => {
  if (!field.valid && field.touched) {
    return validationStatus.invalid;
  }

  return validationStatus.valid;
};

export const checkInputValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '';
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.minAge) {
    isValid = differenceInYears(value) >= 18 && isValid;
  }

  return isValid;
};
