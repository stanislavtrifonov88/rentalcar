import React from 'react';
import CheckoutCarCard from './CheckoutCarCard/CheckoutCarCard';
import './CheckoutPage.css';
import BookingForm from './BookingForm/BookingForm';
import PriceEstimationCard from './PriceEstimationCard/PriceEstimationCard';
import * as validationProperty from './Validations/validationProperty'
import { checkInputValidity } from './Validations/validationChecks'
import fetchRequest from '../../services/Rest';
import { baseURL, contracts, cars, customers }from '../../services/restAPIs/restAPIs'
import Spinner from '../Spinner/Spinner';
import { bookingFormErrors } from '../../services/toastify/toastifyHelpers';
import { toastSuccess } from '../../services/toastify/toastify';
import { timeStamp, differenceInYears } from '../../shared/dateModifiers';
import { parsePhoneNumber } from 'react-phone-number-input';


export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phone: {
        value: "",
        isValid: false,
        touched: false,
      },
      foundCustomer: {
        phone: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        age: "",
        loyaltyDiscount: "",
        geoDiscount: "",
      },
      newCustomer: {
        phone: "",
        firstName: "",
        lastName: "",
        birthdate: "",
      },
      car: { 
        id: "",
        brand: "",
        model: "",
        picture: "",
        className: "",
        price: 1,
    },
      checkoutForm: {
        phone: "",
        startDate: null,
        contractEndDate: null,
    },
    registrationFormValidations: {
      firstName: {
        rules: {
        required: true,
        minLength: validationProperty.minLengthName,
        maxLength: validationProperty.maxLengthName,
      },
        valid: false,
        touched: false,
      },
      lastName: {
        rules: {
        required: true,
        minLength: validationProperty.minLengthName,
        maxLength: validationProperty.maxLengthName,
      },
        valid: false,
      },
      birthdate: {
        rules: {
        required: true,
        minAge: validationProperty.minAge
      },
        valid: false,
        touched: false,
      },
  },
    
      checkoutFormValidations: {
        firstName: {
          rules: {
          required: true,
          minLength: validationProperty.minLengthName,
          maxLength: validationProperty.maxLengthName,
        },
          valid: false,
          touched: false,
        },
        lastName: {
          rules: {
          required: true,
          minLength: validationProperty.minLengthName,
          maxLength: validationProperty.maxLengthName,
        },
          valid: false,
        },
        birthdate: {
          rules: {
          required: true,
          minAge: validationProperty.minAge
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
    }
  };
};

  handlePhoneChanged = (value) => {
    // console.log(isValidPhoneNumber(value))
    const phoneNumber = parsePhoneNumber(value)
    const newObj = {};
    newObj.touched = true;
    newObj.value = value;

    if(phoneNumber) {
      if(phoneNumber.country === 'BG') {
        if (newObj.value.length === 13) {
          newObj.isValid = true
        }
      }
    }

    this.setState({
        checkoutForm: Object.assign(this.state.phone, newObj),
    })

    if (newObj.isValid) {
      fetchRequest(`${baseURL}/${customers}`,'PUT',{ phone: value })
      .then(response => 
        this.setState({ foundCustomer: response})
        );
    }

  }

  carCheckoutHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = {};
    const validationObj = this.state.checkoutFormValidations;
    newObj[name] = value;
    newObj.phone = this.state.phone
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

  newCustomerHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = {};
    const validationObj = this.state.registrationFormValidations;
    newObj[name] = value;
    newObj.phone = this.state.phone.value
    validationObj[name].valid = checkInputValidity(newObj[name], this.state.registrationFormValidations[name].rules);
    validationObj[name].touched = true;
    // console.log(this.state.newCustomer)
    // console.log(newObj)
    this.setState({
        checkoutForm: Object.assign(this.state.newCustomer, newObj),
    })
    this.setState({
      registrationFormValidations: Object.assign(this.state.registrationFormValidations, validationObj),
  })
  }

  onRegistrationSubmit = (event) => {
    const { newCustomer, registrationFormValidations } = this.state;
    console.log(newCustomer)
    const age = differenceInYears(newCustomer.birthdate)
    console.log(age)
        bookingFormErrors(newCustomer, registrationFormValidations)


    if (
      !registrationFormValidations.firstName.valid ||
      !registrationFormValidations.lastName.valid || 
      // !checkoutFormValidations.age.valid || 
      !(age >= 18) ||
      !registrationFormValidations.birthdate.touched || 
      !registrationFormValidations.birthdate.valid ) {

        return;
      }
    fetchRequest(`${baseURL}/${customers}`,'POST', newCustomer)
    .then(response => {
      console.log(response)
      this.setState({ foundCustomer: response})
    }
      );
  }


  onCheckoutInputSubmit = (event) => {
    const { checkoutForm, checkoutFormValidations } = this.state
    event.preventDefault();
    // bookingFormErrors(this.state.checkoutForm, checkoutFormValidations)

    // if (
    //   !checkoutFormValidations.firstName.valid ||
    //   !checkoutFormValidations.lastName.valid || 
    //   // !checkoutFormValidations.age.valid || 
    //   // !(checkoutForm.age >= 18) ||
    //   !checkoutFormValidations.contractEndDate.touched || 
    //   !checkoutFormValidations.contractEndDate.valid ) {

    //     return;
    //   }
    const body = {}
    this.setState({ loading: true });
    console.log(checkoutForm)
    fetchRequest(`${baseURL}/${contracts}/car/${this.state.car.id}`,'POST',checkoutForm)
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
    <BookingForm car={car} 
      newCustomerHandler={this.newCustomerHandler} 
      phoneChanged={this.handlePhoneChanged} 
      onCancel={this.onCancel} 
      onRegistrationSubmit={this.onRegistrationSubmit}  
      validations={this.state.checkoutFormValidations} 
      registrationFormValidations={this.state.registrationFormValidations}
      foundCustomer={this.state.foundCustomer}
      onCheckoutInputSubmit={this.onCheckoutInputSubmit}
      />
    {/* <PriceEstimationCard priceEstimationForm={priceEstimationForm} /> */}
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
