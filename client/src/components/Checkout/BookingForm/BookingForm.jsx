import React from 'react';
import './BookingForm.css';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Customer from './Customer/Customer';
import Registration from './RegistrationForm/Registration';
import { observer, inject } from "mobx-react";
import { parsePhoneNumber } from "react-phone-number-input";
import { checkInputValidity } from "../Validations/validationChecks";
import { fetchRequest, fetchRequestCustomer } from "../../../services/Rest";
import {
  baseURL,
  contracts,
  cars,
  customers,
} from "../../../services/restAPIs/restAPIs";
import Spinner from "../../Spinner/Spinner";
import {
  bookingFormErrors,
  carCheckoutErrors,
} from "../../../services/toastify/toastifyHelpers";
import { toastSuccess } from "../../../services/toastify/toastify";
import { timeStamp, differenceInYears } from "../../../shared/dateModifiers";


// inject("colors")(observer(({ colors, label, onClick })

// const BookingForm = inject("customerStore", "checkoutFormStore")(observer(({
//   customerStore, checkoutFormStore, checkoutFormValidations, onCancel, phoneChanged,
//   foundCustomer, newCustomerHandler, onRegistrationSubmit, onCheckoutInputSubmit, registrationFormValidations, carCheckoutHandler, phone,
// }) => {
@inject("customerStore", "individualCarStore", "checkoutFormStore")
@observer
export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.customerStore = this.props.customerStore;
    this.individualCarStore = this.props.individualCarStore;
    this.checkoutFormStore = this.props.checkoutFormStore;
  }


  handlePhoneChanged = (value) => {
    let phoneNumber = "";
    const { phone } = this.customerStore;
    if (value !== undefined) {
      phoneNumber = parsePhoneNumber(value);
    }

    const newObj = {};
    newObj.touched = true;
    newObj.value = value;

    if (phoneNumber) {
      if (phoneNumber.country === "BG") {
        if (newObj.value.length === 13) {
          newObj.isValid = true;
        }
      }
    }

    this.customerStore.phone = newObj;

    if (newObj.isValid) {
      fetchRequestCustomer(`${baseURL}/${customers}`, "PUT", {
        phone: value,
      }).then((response) => {
        if (response) {
          this.customerStore.foundCustomer = response;
        }
      });
    } else {
      this.customerStore.foundCustomer = {
        phone: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        age: "",
        loyaltyDiscount: "",
        geoDiscount: "",
      };
    }
  };

  // newCustomerHandler = (event) => {
  //   const name = event.target.dataset.name;
  //   const value = event.target.value;
  //   const newObj = this.customerStore.newCustomer;
  //   const { registrationFormValidations } = this.customerStore;
  //   const validationObj = registrationFormValidations;
  //   newObj[name] = value;
  //   newObj.phone = this.customerStore.phone.value;
  //   validationObj[name].valid = checkInputValidity(
  //     newObj[name],
  //     registrationFormValidations[name].rules
  //   );
  //   validationObj[name].touched = true;

  //   this.customerStore.newCustomer = Object.assign(this.customerStore.newCustomer, newObj);
  //   this.customerStore.registrationFormValidations = Object.assign(this.customerStore.registrationFormValidations, validationObj);
  // };

  // onRegistrationSubmit = (event) => {
  //   const { newCustomer, registrationFormValidations } = this.customerStore;
  //   const age = differenceInYears(newCustomer.birthdate);
  //   bookingFormErrors(newCustomer, registrationFormValidations);
  //   if (
  //     !registrationFormValidations.firstName.valid ||
  //     !registrationFormValidations.lastName.valid ||
  //     !(age >= 18) ||
  //     !registrationFormValidations.birthdate.touched ||
  //     !registrationFormValidations.birthdate.valid
  //   ) {
  //     return;
  //   }
  //   fetchRequest(`${baseURL}/${customers}`, "POST", newCustomer).then(
  //     (response) => {
  //       this.customerStore.foundCustomer = response;
  //     }
  //   );
  // };

  render() {
  let names = <div>hi</div>;
  const { foundCustomer, phone, newCustomer, registrationFormValidations } = this.customerStore;
  const { car, loading } = this.individualCarStore;

  if (foundCustomer.firstName === '') {
    names = (
      <Registration
        // newCustomerHandler={this.newCustomerHandler}
        // registrationFormValidations={registrationFormValidations}
        // onRegistrationSubmit={this.onRegistrationSubmit}
        onCancel={this.props.onCancel}
      />
    );
  } else {
    names = (
      <Customer
        // foundCustomer={foundCustomer}
        // onCheckoutInputSubmit={onCheckoutInputSubmit}
        onCancel={this.props.onCancel}
        onPageChangeToDashboard={this.props.onPageChangeToDashboard}
        // checkoutFormValidations={checkoutFormValidations}
        // carCheckoutHandler={carCheckoutHandler}
      />
    );
  }

  let found = <p className="notFound">Client not found!</p>;
  if (!phone.touched) {
    found = <p className="invisible">Client not found!</p>;
  } else if (foundCustomer.firstName !== '') {
      found = (
        <p className="found">
          Welcome back,
          {foundCustomer.firstName}
          !
        </p>
      );


  }


  return (
    <div className="checkoutFormContainer" data-element="bookingForm">
      <h1>Booking Form</h1>
      <div className="bookingFormInputFields">
        <div className="inputRows">
          <div className="inputFormContainer">
            <label>
              Phone number
            </label>
            <PhoneInput
              className="phoneField"
              placeholder="Enter phone number"
              data-name="phone"
              required
              onChange={this.handlePhoneChanged}
            />
            {found}
          </div>
        </div>
        {names}

      </div>

    </div>
  );
}};

BookingForm.propTypes = {
  changed: PropTypes.func,
  onInputSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  phoneChanged: PropTypes.func,

  validations: PropTypes.exact({
    firstName: PropTypes.object,
    lastName: PropTypes.object,
    birthdate: PropTypes.object,
    contractEndDate: PropTypes.object,
    contractEndTime: PropTypes.object,
  }),
};

BookingForm.defaultProps = {
  changed: () => '',
  onInputSubmit: () => '',
  onCancel: () => '',
  phoneChanged: () => '',
  validations: PropTypes.exact({
    firstName: {},
    lastName: {},
    birthdate: {},
    contractEndDate: {},
    contractEndTime: {},
  }),
};


