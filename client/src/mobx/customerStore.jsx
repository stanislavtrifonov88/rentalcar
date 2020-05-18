import { observable, action, autorun } from "mobx";
import * as validationProperty from '../components/Checkout/Validations/validationProperty';

class CustomerStore {
  @observable phone = {
    value: "",
    isValid: false,
    touched: false,
  };
  @observable foundCustomer = {
    phone: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    age: "",
    loyaltyDiscount: "",
    geoDiscount: "",
  };
  @observable newCustomer = {
    phone: "",
    firstName: "",
    lastName: "",
    birthdate: "",
  };
  @observable checkoutForm = {
    phone: "",
    startDate: null,
    contractEndDate: null,
  };
  @observable registrationFormValidations = {
    firstName: {
      rules: {
        required: true,
        minLength: validationProperty.minLengthName,
        maxLength: validationProperty.maxLengthName,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      rules: {
        required: true,
        minLength: validationProperty.minLengthName,
        maxLength: validationProperty.maxLengthName,
      },
      valid: false,
    },
    birthdate: {
      rules: {
        required: true,
        minAge: validationProperty.minAge,
      },
      valid: false,
      touched: false,
    },
  };
}

const customerStore = new CustomerStore();

export default customerStore;
