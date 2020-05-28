import { isValidPhoneNumber } from 'react-phone-number-input';

const phoneValidationLibrary = (
  phoneInfo,
  isValidPhoneNumberFn = isValidPhoneNumber,
) => {
  if (phoneInfo) {
    if (phoneInfo.country === 'BG') {
      if (phoneInfo.number.length === 13) {
        return true;
      }
      return false;
    } if (phoneInfo.country === 'RO') {
      if (phoneInfo.number.length === 12) {
        return true;
      }
      return false;
    }
    return isValidPhoneNumberFn(phoneInfo.number);
  }
};

export default phoneValidationLibrary;
