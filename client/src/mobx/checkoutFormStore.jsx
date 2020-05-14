import { observable, action, autorun } from "mobx";

class CheckoutFormStore {
  @observable checkoutForm = {
    phone: "",
    startDate: null,
    contractEndDate: null,
  };
  @observable checkoutFormValidations = {
    contractEndDate: {
      rules: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  };
}

const checkoutFormStore = new CheckoutFormStore();

export default checkoutFormStore;
