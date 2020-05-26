import React from "react";
import "./BookingForm.css";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CarCheckoutForm from "./Customer/CarCheckoutForm";
import Registration from "./RegistrationForm/Registration";
import { observer, inject } from "mobx-react";
import { parsePhoneNumber } from "react-phone-number-input";
import phoneValidationLibrary from "../../../services/validations/phoneValidationLibrary";
import phoneValidation from "../../../services/validations/phoneValidation";

@inject("customerStore")
@observer
export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.customerStore = this.props.customerStore;
  }

  handlePhoneChanged = (value) => {
    // let phoneNumber = "";
    // if (value !== undefined) {
    //   phoneNumber = parsePhoneNumber(value);
    // }

    const newObj = {};
    newObj.touched = true;
    newObj.value = value;
    // newObj.isValid = phoneValidationLibrary(phoneNumber);
    newObj.isValid = phoneValidation(value)
    this.customerStore.phone = newObj;

    if (newObj.isValid) {
      this.customerStore.fetchFoundCustomer(value);
    } else {
      this.customerStore.resetFoundCustomer();
    }
  };

  render() {
    const { foundCustomer, phone } = this.customerStore;
    let names;

    if (foundCustomer.firstName === "") {
      names = <Registration onCancel={this.props.onCancel} />;
    } else {
      names = (
        <CarCheckoutForm
          onCancel={this.props.onCancel}
          onPageChangeToDashboard={this.props.onPageChangeToDashboard}
        />
      );
    }

    let found = <p className="notFound">Client not found!</p>;
    if (!phone.touched) {
      found = <p className="invisible">Client not found!</p>;
    } else if (foundCustomer.firstName !== "") {
      found = <p className="found">Welcome back, {foundCustomer.firstName}!</p>;
    }

    return (
      <div className="checkoutFormContainer" data-element="bookingForm">
        <h1>Booking Form</h1>
        <div className="bookingFormInputFields">
          <div className="inputRows">
            <div className="inputFormContainer">
              <label>Phone number</label>
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
  }
}

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
  changed: () => "",
  onInputSubmit: () => "",
  onCancel: () => "",
  phoneChanged: () => "",
  validations: PropTypes.exact({
    firstName: {},
    lastName: {},
    birthdate: {},
    contractEndDate: {},
    contractEndTime: {},
  }),
};
