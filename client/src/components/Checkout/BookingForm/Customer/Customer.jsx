import React from 'react';
import { isValidField } from '../../Validations/validationChecks';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumber } from "react-phone-number-input";
import { checkInputValidity } from "../../Validations/validationChecks";
import { fetchRequest, fetchRequestCustomer } from "../../../../services/Rest";
import {
  baseURL,
  contracts,
  cars,
  customers,
} from "../../../../services/restAPIs/restAPIs";
import {
  bookingFormErrors,
  carCheckoutErrors,
} from "../../../../services/toastify/toastifyHelpers";
import { toastSuccess } from "../../../../services/toastify/toastify";
import { timeStamp, differenceInYears } from "../../../../shared/dateModifiers";

// const Customer = ({
//   foundCustomer, onCheckoutInputSubmit, onCancel, checkoutFormValidations, carCheckoutHandler,
// }) => {

  @inject("customerStore", "individualCarStore", "checkoutFormStore")
  @observer
  export default class Customer extends React.Component {
    constructor(props) {
      super(props);
      this.customerStore = this.props.customerStore;
      this.individualCarStore = this.props.individualCarStore;
      this.checkoutFormStore = this.props.checkoutFormStore;
    }

    carCheckoutHandler = (event) => {
      const name = event.target.dataset.name;
      const value = event.target.value;
      const newObj = {};
      const validationObj = this.checkoutFormStore.checkoutFormValidations;
      newObj[name] = value;
      newObj.phone = this.customerStore.phone.value;
      newObj.startDate = timeStamp();
      validationObj[name].valid = checkInputValidity(
        newObj[name],
        this.checkoutFormStore.checkoutFormValidations[name].rules
      );
      validationObj[name].touched = true;
  
      this.checkoutFormStore.checkoutForm = newObj;
      this.checkoutFormStore.checkoutFormValidations = validationObj;
    };
  
    onCheckoutInputSubmit = (event) => {
      const { checkoutForm, checkoutFormValidations } = this.checkoutFormStore;
      event.preventDefault();
      carCheckoutErrors(checkoutForm, checkoutFormValidations);
      if (
        !checkoutFormValidations.contractEndDate.touched ||
        !checkoutFormValidations.contractEndDate.valid
      ) {
        return;
      }
      this.individualCarStore.loading = true;
      fetchRequest(
        `${baseURL}/${contracts}/car/${this.individualCarStore.car.id}`,
        "POST",
        checkoutForm
      ).then((response) => {
        this.props.onPageChangeToDashboard,
        this.individualCarStore.loading = false,
        toastSuccess("Car successfully borrowed")
        // this.props.history.push({ pathname: "/dashboard" }),
      });
    };
  
    // onCancel = (event) => this.props.history.push({ pathname: "/" });

  render() {
    const { foundCustomer, phone, newCustomer, registrationFormValidations } = this.customerStore;
    const { car, loading } = this.individualCarStore;
    const { checkoutFormValidations } = this.checkoutFormStore;

    const validationErrorReturnDate = isValidField(checkoutFormValidations.contractEndDate);

  return (
    <>
      <h3 className="secondaryHeader">Contract</h3>
      <div className="inputRows">
        <div className="inputFormContainer">
          <label htmlFor="FirstName">
            First name
          </label>
          <input
            id="FirstName"
            className="firstNameField"
            required
            type="text"
            value={foundCustomer.firstName}
            disabled
          />
          <p className="valid">Invalid field</p>
        </div>
        <div className="inputFormContainer">
          <label htmlFor="LastName">
            Last className:
          </label>
          <input
            id="LastName"
            className="lastNameField"
            required
            type="text"
            value={foundCustomer.lastName}
            disabled
          />
          <p className="valid">Invalid field</p>
        </div>
      </div>
      <div className="inputRows">
        <div className="inputFormContainer">
          <label htmlFor="birthdate">
            Birthdate
          </label>
          <input
            id="birthdate"
            className="birthdateField"
            type="date"
            value={foundCustomer.birthdate}
            disabled
          />
          <p className="valid">Invalid field</p>
        </div>
        <div className="inputFormContainer">
          <label htmlFor="Date">
            Return Date
          </label>
          <input
            id="Date"
            className="dateField"
            type="datetime-local"
            required
            data-name="contractEndDate"
            min={timeStamp()}
            onChange={this.carCheckoutHandler}
          />
          <p className={validationErrorReturnDate}>Please enter a valid date.</p>
        </div>
      </div>
      <div className="checkoutBtnsContainer">
        <button type="submit" className="bookCarBtn" onClick={this.onCheckoutInputSubmit} data-element="bookingFormCheckoutBtn">
          Checkout
        </button>
        <button type="submit" className="bookCarBtn" onClick={this.props.onCancel}>Cancel</button>
      </div>
    </>
  );
}};

