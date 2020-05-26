import React from "react";
import { isValidField } from "../../Validations/validationChecks";
import { observer, inject } from "mobx-react";
import "react-phone-number-input/style.css";
import { checkInputValidity } from "../../Validations/validationChecks";
import { fetchRequest } from "../../../../services/restAPIs/restRequests";
import { baseURL, contracts } from "../../../../services/restAPIs/restAPIs";
import { carCheckoutErrors } from "../../../../services/toastify/toastifyHelpers";
import { toastSuccess } from "../../../../services/toastify/toastify";
import { timeStamp } from "../../../../services/dates/dateModifiers";

@inject("customerStore", "individualCarStore", "checkoutFormStore")
@observer
export default class CarCheckoutForm extends React.Component {
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
      this.props.onPageChangeToDashboard(),
        (this.individualCarStore.loading = false),
        toastSuccess("Car successfully borrowed");
    });
  };

  render() {
    const { foundCustomer } = this.customerStore;
    const { checkoutFormValidations } = this.checkoutFormStore;

    const validationErrorReturnDate = isValidField(
      checkoutFormValidations.contractEndDate
    );

    return (
      <>
        <h3 className="secondaryHeader">Contract</h3>
        <div className="inputRows">
          <div className="inputFormContainer">
            <label htmlFor="FirstName">First name</label>
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
            <label htmlFor="LastName">Last className:</label>
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
            <label htmlFor="birthdate">Birthdate</label>
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
            <label htmlFor="Date">Return Date</label>
            <input
              id="Date"
              className="dateField"
              type="datetime-local"
              required
              data-name="contractEndDate"
              min={timeStamp()}
              onChange={this.carCheckoutHandler}
            />
            <p className={validationErrorReturnDate}>
              Please enter a valid date.
            </p>
          </div>
        </div>
        <div className="checkoutBtnsContainer">
          <button
            type="submit"
            className="bookCarBtn"
            onClick={this.onCheckoutInputSubmit}
            data-element="bookingFormCheckoutBtn"
          >
            Checkout
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
