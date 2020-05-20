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



  componentDidMount() {
    this.individualCarStore.loading = true;
    const { id } = this.props.match.params;
    fetchRequest(`${baseURL}/${cars}/${id}`).then((result) => {
      this.individualCarStore.car = result;
      this.individualCarStore.loading = false;
    });
  }

  onCancel = (event) => this.props.history.push({ pathname: "/" });
  onPageChangeToDashboard = (event) => this.props.history.push({ pathname: "/dashboard" });

  render() {
    // const {
    //   foundCustomer,
    //   phone,
    //   registrationFormValidations,
    // } = this.customerStore;
    const { car, loading } = this.individualCarStore;
    let checkoutFormCards = (
      <div className="formItems">
        <CheckoutCarCard car={car} />
        <BookingForm
          // car={car}
          // newCustomerHandler={this.newCustomerHandler}
          // phoneChanged={this.handlePhoneChanged}
          onCancel={this.onCancel}
          onPageChangeToDashboard={this.onPageChangeToDashboard}
          // carCheckoutHandler={this.carCheckoutHandler}
          // onRegistrationSubmit={this.onRegistrationSubmit}
          // checkoutFormValidations={
          //   this.checkoutFormStore.checkoutFormValidations
          // }
          // registrationFormValidations={registrationFormValidations}
          // foundCustomer={foundCustomer}
          // onCheckoutInputSubmit={this.onCheckoutInputSubmit}
          // phone={phone}
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
