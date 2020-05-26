import { isValidPhoneNumber } from "react-phone-number-input";

const phoneValidationLibrary = (
    phoneInfo,
    isValidPhoneNumberFn = isValidPhoneNumber,
    ) => {
  if (phoneInfo) {
    if (phoneInfo.country === "BG") {
      if (phoneInfo.number.length === 13) {
        return true;
      } else {
        return false;
      }
    } else if (phoneInfo.country === "RO") {
      if (phoneInfo.number.length === 12) {
        return true;
      } else {
        return false;
      }
    } else {
      return isValidPhoneNumberFn(phoneInfo.number);
    }
  }
};

export default phoneValidationLibrary;
