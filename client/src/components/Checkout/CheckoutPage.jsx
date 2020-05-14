import React from "react";
import CheckoutCarCard from "./CheckoutCarCard/CheckoutCarCard";
import "./CheckoutPage.css";
import BookingForm from "./BookingForm/BookingForm";
import PriceEstimationCard from "./PriceEstimationCard/PriceEstimationCard"
import { checkInputValidity } from "./Validations/validationChecks";
import { fetchRequest, fetchRequestCustomer } from "../../services/Rest";
import {
  baseURL,
  contracts,
  cars,
  customers,
} from "../../services/restAPIs/restAPIs";
import Spinner from "../Spinner/Spinner";
import {
  bookingFormErrors,
  carCheckoutErrors,
} from "../../services/toastify/toastifyHelpers";
import { toastSuccess } from "../../services/toastify/toastify";
import { timeStamp, differenceInYears } from "../../shared/dateModifiers";
import { parsePhoneNumber } from "react-phone-number-input";
import { observer, inject } from "mobx-react";

@inject("customerStore", "individualCarStore", "checkoutFormStore")
@observer
export default class CheckoutPage extends React.Component {
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

  newCustomerHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = {};
    const { registrationFormValidations } = this.customerStore;
    const validationObj = registrationFormValidations;
    newObj[name] = value;
    newObj.phone = this.customerStore.value;
    validationObj[name].valid = checkInputValidity(
      newObj[name],
      registrationFormValidations[name].rules
    );
    validationObj[name].touched = true;

    this.customerStore.newCustomer = newObj;
    this.customerStore.registrationFormValidations = validationObj;
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
      }
    );
  };

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
    ).then((response) =>
      this.props.history.push(
        { pathname: "/dashboard" },
        (this.individualCarStore.loading = false),
        toastSuccess("Car successfully borrowed")
      )
    );
  };

  onCancel = (event) => this.props.history.push({ pathname: "/" });

  componentDidMount() {
    this.individualCarStore.loading = true;
    const { id } = this.props.match.params;
    fetchRequest(`${baseURL}/${cars}/${id}`).then((result) => {
      this.individualCarStore.car = result;
      this.individualCarStore.loading = false;
    });
  }

  render() {
    const {
      foundCustomer,
      phone,
      registrationFormValidations,
    } = this.customerStore;
    const { car, loading } = this.individualCarStore;
    let checkoutFormCards = (
      <div className="formItems">
        <CheckoutCarCard car={car} />
        <BookingForm
          car={car}
          newCustomerHandler={this.newCustomerHandler}
          phoneChanged={this.handlePhoneChanged}
          onCancel={this.onCancel}
          carCheckoutHandler={this.carCheckoutHandler}
          onRegistrationSubmit={this.onRegistrationSubmit}
          checkoutFormValidations={
            this.checkoutFormStore.checkoutFormValidations
          }
          registrationFormValidations={registrationFormValidations}
          foundCustomer={foundCustomer}
          onCheckoutInputSubmit={this.onCheckoutInputSubmit}
          phone={phone}
        />
        <PriceEstimationCard />
      </div>
    );
    if (loading) {
      checkoutFormCards = <Spinner />;
    }

    return (
      <div className="checkoutMainContainer">
        <h1 className="checkoutMainTitle">Would you like a car?</h1>
        {checkoutFormCards}
      </div>
    );
  }
}
