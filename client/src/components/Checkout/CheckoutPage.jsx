import React from "react";
import CheckoutCarCard from "./CheckoutCarCard/CheckoutCarCard";
import "./CheckoutPage.css";
import BookingForm from "./BookingForm/BookingForm";
import PriceEstimationCard from "./PriceEstimationCard/PriceEstimationCard"
import { fetchRequest } from "../../services/Rest";
import {
  baseURL,
  cars,
} from "../../services/restAPIs/restAPIs";
import Spinner from "../Spinner/Spinner";
import { observer, inject } from "mobx-react";

@inject("individualCarStore")
@observer
export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.individualCarStore = this.props.individualCarStore;
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
    const { car, loading } = this.individualCarStore;
    let checkoutFormCards = (
      <div className="formItems">
        <CheckoutCarCard car={car} />
        <BookingForm
          onCancel={this.onCancel}
          onPageChangeToDashboard={this.onPageChangeToDashboard}
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
