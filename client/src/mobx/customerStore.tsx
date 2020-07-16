import { observable, action, autorun } from 'mobx';
import * as validationProperty from '../components/Checkout/Validations/validationProperty';
import { fetchRequest, fetchRequestCustomer } from '../services/restAPIs/restRequests';
import { toastSuccess } from '../services/toastify/toastify';
import {
  baseURL,
  customers,
} from '../services/restAPIs/restAPIs';
import { CheckOutFormInterface } from './interfaces';

interface PhoneInterface {
    value: string,
    isValid: boolean,
    touched: boolean,
}

interface FoundCustomerInterface {
  phone: string,
  firstName: string,
  lastName: string,
  birthdate: string,
  age: string,
  previousContracts: string,
}

interface NewCustomerInterface {
  phone: string,
  firstName: string,
  lastName: string,
  birthdate: string,
}

class CustomerStore {
  @observable phone: PhoneInterface = {
    value: '',
    isValid: false,
    touched: false,
  }

  @observable foundCustomer: FoundCustomerInterface = {
    phone: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    age: '',
    previousContracts: '',
  };

  @observable newCustomer: NewCustomerInterface = {
    phone: '',
    firstName: '',
    lastName: '',
    birthdate: '',
  };

  @observable checkoutForm: CheckOutFormInterface = {
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
