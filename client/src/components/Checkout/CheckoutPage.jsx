import React from 'react';
import CheckoutCarCard from './CheckoutCarCard/CheckoutCarCard';
import './CheckoutPage.css';
import BookingForm from './BookingForm/BookingForm';
import PriceEstimationCard from './PriceEstimationCard/PriceEstimationCard';
import * as validationProperty from './Validations/validationProperty'
import { checkInputValidity } from './Validations/validationChecks'
import fetchRequest from '../../services/Rest';
import { baseURL, contracts, cars }from '../../services/restAPIs/restAPIs'
import Spinner from '../Spinner/Spinner';
import { bookingFormErrors } from '../../services/toastify/toastifyHelpers';
import { toastSuccess } from '../../services/toastify/toastify';
import { timeStamp } from '../../shared/dateModifiers';
import * as moment from 'moment';

export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      car: { 
      id: "",
      brand: "",
      model: "",
      picture: "",
      className: "",
      price: 1,
    },
      checkoutForm: {
        borrowerFirstName: null,
        borrowerLastName: null,
        borrowerAge: 18,
        startDate: null,
        contractEndDate: null,
        contractEndTime: null,
    },
  checkoutFormValidations: {
    borrowerFirstName: {
      rules: {
      required: true,
      minLength: validationProperty.minLengthName,
      maxLength: validationProperty.maxLengthName,
    },
      valid: false,
      touched: false,
    },
    borrowerLastName: {
      rules: {
      required: true,
      minLength: validationProperty.minLengthName,
      maxLength: validationProperty.maxLengthName,
    },
      valid: false,
    },
    borrowerAge: {
      rules: {
      required: true,
      maxLength: validationProperty.maxLengthAge,
    },
      valid: false,
      touched: false,
    },
    contractEndDate: {
      rules: {
      required: true,
    },
      valid: false,
      touched: false,
    },
    contractEndTime: {
      rules: {
      required: true,
    },
      valid: false,
      touched: false,
    }
}
    };
  };

  carCheckoutHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = {};
    const validationObj = this.state.checkoutFormValidations;
    newObj[name] = value;
    newObj.startDate = timeStamp();
    validationObj[name].valid = checkInputValidity(newObj[name], this.state.checkoutFormValidations[name].rules);
    validationObj[name].touched = true;
    this.setState({
        checkoutForm: Object.assign(this.state.checkoutForm, newObj),
    })
    this.setState({
      checkoutFormValidations: Object.assign(this.state.checkoutFormValidations, validationObj),
  })
  }


  onInputSubmit = (event) => {
    const { checkoutForm, checkoutFormValidations } = this.state
    event.preventDefault();
    bookingFormErrors(this.state.checkoutForm, checkoutFormValidations)
    const {
      borrowerFirstName,
      borrowerLastName,
      borrowerAge,
      startDate,
      contractEndDate,
    } = checkoutForm
    const body = {
      borrowerFirstName,
      borrowerLastName,
      borrowerAge,
      startDate,
      contractEndDate,
    }
    body.contractEndDate = moment(new Date((checkoutForm.contractEndDate + ' ' + checkoutForm.contractEndTime))).format('YYYY-MM-DDTHH:mm')


    // if (
    //   !checkoutFormValidations.borrowerFirstName.valid ||
    //   !checkoutFormValidations.borrowerLastName.valid || 
    //   !checkoutFormValidations.borrowerAge.valid || 
    //   !(body.borrowerAge >= 18) ||
    //   !body.contractEndDate.touched || 
    //   !body.contractEndDate.valid ) {

    //     return;
    //   }

    this.setState({ loading: true });

    fetchRequest(`${baseURL}/${contracts}/car/${this.state.car.id}`,'POST',body)
    .then(response => 
      this.props.history.push({pathname: '/dashboard'},
      this.setState({ loading: false }),
      toastSuccess('Car successfully borrowed')
      ))
  }

  onCancel = (event) => this.props.history.push({pathname: '/'})


  componentDidMount() {
    this.setState({ loading: true });
    const { id }= this.props.match.params;
      fetchRequest(`${baseURL}/${cars}/${id}`)
      .then((result) => {
        this.setState({
          car: result,
          loading: false,
        });
      });
  }

  render() {
    const car = { ...this.state.car };
    const priceEstimationForm = this.state;
    const { loading } = this.state;

    let checkoutFormCards = <div className="formItems">
    <CheckoutCarCard car={car} />
    <BookingForm car={car} changed={this.carCheckoutHandler} onCancel={this.onCancel} onInputSubmit={this.onInputSubmit}  validations={this.state.checkoutFormValidations} />
    <PriceEstimationCard priceEstimationForm={priceEstimationForm} />
  </div>
    if (loading) {
      checkoutFormCards = <Spinner />
    }

    return (
      <div className="checkoutMainContainer">
        <h1 className="checkoutMainTitle">Would you like a car?</h1>
        {checkoutFormCards}
      </div>
    );
  }
}
