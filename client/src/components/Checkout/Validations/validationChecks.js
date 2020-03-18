import * as validationStatus from './validationStatus';

export const isValidField = (field) => {
  if (!field.valid && field.touched) {
    return validationStatus.invalid;
  }

  return validationStatus.valid;
};

export const checkInputValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};
