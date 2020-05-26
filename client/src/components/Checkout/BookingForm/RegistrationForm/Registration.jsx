import React from "react";
import { isValidField } from "../../Validations/validationChecks";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import "react-phone-number-input/style.css";
import { checkInputValidity } from "../../Validations/validationChecks";
import { fetchRequest } from "../../../../services/Rest";
import { baseURL, customers } from "../../../../services/restAPIs/restAPIs";
import { bookingFormErrors } from "../../../../services/toastify/toastifyHelpers";
import { toastSuccess } from "../../../../services/toastify/toastify";
import { differenceInYears } from "../../../../shared/dateModifiers";

@inject("customerStore")
@observer
export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.customerStore = this.props.customerStore;
  }

  newCustomerHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = this.customerStore.newCustomer;
    const { registrationFormValidations } = this.customerStore;
    const validationObj = registrationFormValidations;
    newObj[name] = value;
    newObj.phone = this.customerStore.phone.value;
    validationObj[name].valid = checkInputValidity(
      newObj[name],
      registrationFormValidations[name].rules
    );
    validationObj[name].touched = true;

    this.customerStore.newCustomer = Object.assign(
      this.customerStore.newCustomer,
      newObj
    );
    this.customerStore.registrationFormValidations = Object.assign(
      this.customerStore.registrationFormValidations,
      validationObj
    );
  };

  onRegistrationSubmit = (event) => {
    const { newCustomer, registrationFormValidations } = this.customerStore;
    const age = differenceInYears(newCustomer.birthdate);
    bookingFormErrors(newCustomer, registrationFormValidations);

    if (
      !registrationFormValidations.firstName.valid ||
      !registrationFormValidations.lastName.valid ||
      !(age >= 18) ||
      !registrationFormValidations.birthdate.touched ||
      !registrationFormValidations.birthdate.valid
    ) {
      return;
    }

    fetchRequest(`${baseURL}/${customers}`, "POST", newCustomer).then(
      (response) => {
        this.customerStore.foundCustomer = response;
        toastSuccess("Customer successfully registered");
      }
    );
  };

  render() {
    const { registrationFormValidations } = this.customerStore;

    const validationErrorFirstName = isValidField(
      registrationFormValidations.firstName
    );
    const validationErrorLastName = isValidField(
      registrationFormValidations.lastName
    );
    const validationErrorBirthdate = isValidField(
      registrationFormValidations.birthdate
    );

    return (
      <>
        <h3 className="secondaryHeader">Registration</h3>
        <div className="inputRows">
          <div className="inputFormContainer">
            <label htmlFor="FirstName">First name</label>
            <input
              id="FirstName"
              className="firstNameField"
              required
              type="text"
              placeholder="First name"
              data-name="firstName"
              onChange={this.newCustomerHandler}
            />

            <p className={validationErrorFirstName}>First name is invalid.</p>
          </div>
          <div className="inputFormContainer">
            <label htmlFor="LastName">Last className:</label>
            <input
              id="LastName"
              className="lastNameField"
              required
              type="text"
              placeholder="Last name"
              data-name="lastName"
              onChange={this.newCustomerHandler}
            />

            <p className={validationErrorLastName}>Last name is invalid.</p>
          </div>
        </div>
        <div className="inputRows">
          <div className="inputFormContainer">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              id="birthdate"
              className="birthdateField"
              type="date"
              placeholder="Birthdate"
              required
              data-name="birthdate"
              onChange={this.newCustomerHandler}
            />

            <p className={validationErrorBirthdate}>
              Please enter a valid birthdate.
            </p>
          </div>
        </div>
        <div className="checkoutBtnsContainer">
          <button
            type="submit"
            className="bookCarBtn"
            onClick={this.onRegistrationSubmit}
            data-element="bookingFormCheckoutBtn"
          >
            Register
          </button>
          <button
            type="submit"
            className="bookCarBtn"
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
        </div>
      </>
    );
  }
}
