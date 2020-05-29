import { observable, action, autorun } from 'mobx';
import * as validationProperty from '../components/Checkout/Validations/validationProperty';
import { fetchRequest, fetchRequestCustomer } from '../services/restAPIs/restRequests';
import { toastSuccess } from '../services/toastify/toastify';
import {
  baseURL,
  customers,
} from '../services/restAPIs/restAPIs';

class CustomerStore {
  @observable phone = {
    value: '',
    isValid: false,
    touched: false,
  };

  @observable foundCustomer = {
    phone: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    age: '',
    previousContracts: '',
  };

  @observable newCustomer = {
    phone: '',
    firstName: '',
    lastName: '',
    birthdate: '',
  };

  @observable checkoutForm = {
    phone: '',
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

  fetchFoundCustomer = (value) => {
    fetchRequestCustomer(`${baseURL}/${customers}`, 'PUT', {
      phone: value,
    }).then((response) => {
      this.foundCustomer = response;
    });
  }

  createNewCustomer = (newCustomer) => {
    fetchRequest(`${baseURL}/${customers}`, 'POST', newCustomer).then(
      (response) => {
        this.foundCustomer = response;
        toastSuccess('Customer successfully registered');
      },
    );
  }

  resetFoundCustomer = () => {
    this.foundCustomer = {
      phone: '',
      firstName: '',
      lastName: '',
      birthdate: '',
      age: '',
      previousContracts: '',
    };
  }
}

const customerStore = new CustomerStore();

export default customerStore;
