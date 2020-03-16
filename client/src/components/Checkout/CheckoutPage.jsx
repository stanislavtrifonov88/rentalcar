import React from 'react';
import * as moment from 'moment';
import CheckoutCarCard from './CheckoutCarCard/CheckoutCarCard';
import './CheckoutPage.css';
import BookingForm from './BookingForm/BookingForm';
import PriceEstimationCard from './PriceEstimationCard/PriceEstimationCard';
import { toast } from "react-toastify";
import * as validationProperty from './Validations/validationProperty'


export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: { id: "7c246d71-1538-406a-8bad-4043f3387fcd",
      brand: "Opel",
      model: "Astra",
      picture: "https://www.auto-lizingu.lt/wp-content/uploads/2019/09/opel-astra-1-6-l-hecbekas-2014-dyzelinas-13.jpg",
      isBorrowed: false,
      isDeleted: false,
      __className__: {
      id: "1c2b08e8-65fc-4991-b8dd-9f64c75e26ee",
      className: "B",
      price: 570,
      isDeleted: false, }
    },
      checkoutForm: {
        borrowerFirstName: null,
        borrowerLastName: null,
        borrowerAge: 18,
        startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
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
    }
}
    };
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  carCheckoutHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = {};
    const validationObj = this.state.checkoutFormValidations;
    newObj[name] = value;
    newObj.startDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');
    validationObj[name].valid = this.checkValidity(newObj[name], this.state.checkoutFormValidations[name].rules);
    validationObj[name].touched = true;

    this.setState({
        checkoutForm: Object.assign(this.state.checkoutForm, newObj),
    })
    this.setState({
      checkoutFormValidations: Object.assign(this.state.checkoutFormValidations, validationObj),
  })
    console.log(this.state.checkoutFormValidations)
  }


  onInputSubmit = (event) => {
    event.preventDefault();

    if(moment(this.state.checkoutForm.startDate).format('YYYY-MM-DDTHH:mm') > moment(this.state.checkoutForm.contractEndDate).format('YYYY-MM-DDTHH:mm') ) {
      toast.error("Return date cannot be in the past", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

    fetch(`http://localhost:3000/contracts/car/${this.state.car.id}`, {
      method: "POST",
      body: JSON.stringify(this.state.checkoutForm),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(response => this.props.history.push({pathname: '/dashboard'}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const { id }= this.props.match.params;
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          car: result,
        });
      });
  }

  render() {
    const car = { ...this.state.car };
    const priceEstimationForm = this.state;

    return (
      <div className="checkoutMainContainer">
        <h1>Checkout rental car</h1>
        <div className="formItems">
          <CheckoutCarCard car={car} />
          <BookingForm car={car} changed={this.carCheckoutHandler} onInputSubmit={this.onInputSubmit} validations={this.state.checkoutFormValidations} />
          <PriceEstimationCard priceEstimationForm={priceEstimationForm} />
        </div>
      </div>
    );
  }
}
