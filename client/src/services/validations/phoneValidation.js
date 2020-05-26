import { isValidPhoneNumber } from "react-phone-number-input";
import { getCountryCode } from './getCountryCode'

const phoneValidation = (
    phoneNumber,
    isValidPhoneNumberFn = isValidPhoneNumber,
    ) => {
  if (phoneNumber) {
    // if (phoneNumber.substring(0, 4) === '+359') {
      if (phoneNumber.slice(0, 4) === '+359') {
      if (phoneNumber.length === 13) {
        return true;
      } else {
        return false;
      }
    // } else if (phoneNumber.substring(0, 3) === '+40') {
    } else if (phoneNumber.slice(0, 2) === '+40') {
      if (phoneNumber.length === 12) {
        return true;
      } else {
        return false;
      }
    } else {
      return isValidPhoneNumberFn(phoneNumber);
    }
  }
};

export default phoneValidation;