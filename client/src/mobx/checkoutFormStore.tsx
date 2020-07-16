import { observable, action, autorun } from "mobx";
import { CheckOutFormInterface } from "./interfaces";

interface ContractEndDateInterface {
  contractEndDate: {
    rules: {
      required: boolean,
    },
      valid: boolean,
      touched: boolean,
  }
}


class CheckoutFormStore {
  @observable checkoutForm: CheckOutFormInterface = {
    phone: "",
    startDate: null,
    contractEndDate: null,
  };

  @observable checkoutFormValidations: ContractEndDateInterface = {
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
