import React from 'react';
import CheckoutCarCard from './CheckoutCarCard/CheckoutCarCard';
import './CheckoutPage.css';
import BookingForm from './BookingForm/BookingForm';
import PriceEstimationCard from './PriceEstimationCard/PriceEstimationCard';
import * as validationProperty from './Validations/validationProperty'
import { checkInputValidity } from './Validations/validationChecks'
import { fetchRequest, fetchRequestCustomer } from '../../services/Rest';
import { baseURL, contracts, cars, customers }from '../../services/restAPIs/restAPIs'
import Spinner from '../Spinner/Spinner';
import { bookingFormErrors, carCheckoutErrors } from '../../services/toastify/toastifyHelpers';
import { toastSuccess } from '../../services/toastify/toastify';
import { timeStamp, differenceInYears } from '../../shared/dateModifiers';
import { parsePhoneNumber } from 'react-phone-number-input';
import { observer, inject } from 'mobx-react';

@inject('customerStore', 'individualCarStore') 
@observer
export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      // phone: {
      //   value: "",
      //   isValid: false,
      //   touched: false,
      // },
      // foundCustomer: {
      //   phone: "",
      //   firstName: "",
      //   lastName: "",
      //   birthdate: "",
      //   age: "",
      //   loyaltyDiscount: "",
      //   geoDiscount: "",
      // },
      // newCustomer: {
      //   phone: "",
      //   firstName: "",
      //   lastName: "",
      //   birthdate: "",
      // },
    //   car: { 
    //     id: "",
    //     brand: "",
    //     model: "",
    //     picture: "",
    //     className: "",
    //     price: 1,
    // },
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
        contractEndDate: {
          rules: {
          required: true,
        },
          valid: false,
          touched: false,
        },
    }
  };
  this.customerStore = this.props.customerStore;
  this.individualCarStore = this.props.individualCarStore;
};

  handlePhoneChanged = (value) => {
    // console.log(isValidPhoneNumber(value))
    let phoneNumber = '';
    // const { phone } = this.state;
    const { phone } = this.customerStore
    if (value !== undefined) {
      phoneNumber = parsePhoneNumber(value)
    }

    const newObj = {};
    newObj.touched = true;
    newObj.value = value;

    if (phoneNumber) {
      if (phoneNumber.country === 'BG') {
        if (newObj.value.length === 13) {
          newObj.isValid = true
        }
      }
    }

    // this.setState({
    //     phone: Object.assign(this.state.phone, newObj),
    // })

    this.customerStore.phone = newObj;

    if (newObj.isValid) {
      fetchRequestCustomer(`${baseURL}/${customers}`,'PUT',{ phone: value })
      .then(response => {
        if (response) {
          // this.setState({ foundCustomer: response})
          this.customerStore.foundCustomer = response;
        }
      }
        );
    }
  }

  carCheckoutHandler = (event) => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    const newObj = {};
    const validationObj = this.state.checkoutFormValidations;
    newObj[name] = value;
    newObj.phone = this.state.phone.value
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
    // const validationObj = this.state.registrationFormValidations;
    const { registrationFormValidations } = this.customerStore;
    const validationObj = registrationFormValidations;
    newObj[name] = value;
    newObj.phone = this.state.phone.value
    validationObj[name].valid = checkInputValidity(newObj[name], registrationFormValidations[name].rules);
    validationObj[name].touched = true;
  //   this.setState({
  //       checkoutForm: Object.assign(this.state.newCustomer, newObj),
  //   })
  //   this.setState({
  //     registrationFormValidations: Object.assign(this.state.registrationFormValidations, validationObj),
  // })
    this.customerStore.newCustomer = newObj;
    this.customerStore.registrationFormValidations = validationObj;
  }

  onRegistrationSubmit = (event) => {
    // const { newCustomer, registrationFormValidations } = this.state;
    const { newCustomer, registrationFormValidations } = this.foundCustomer;
    const age = differenceInYears(newCustomer.birthdate)
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
      // this.setState({ foundCustomer: response})
      this.customerStore.foundCustomer = response;
      }
    );
  }


  onCheckoutInputSubmit = (event) => {
    const { checkoutForm, checkoutFormValidations } = this.state
    event.preventDefault();
    // bookingFormErrors(this.state.checkoutForm, checkoutFormValidations)
    carCheckoutErrors(checkoutForm, checkoutFormValidations)
    if (
      !checkoutFormValidations.contractEndDate.touched || 
      !checkoutFormValidations.contractEndDate.valid ) {

        return;
      }
    // const body = {}
    // this.setState({ loading: true });
    this.individualCarStore.loading = true;
    fetchRequest(`${baseURL}/${contracts}/car/${this.state.car.id}`,'POST',checkoutForm)
    .then(response => 
      this.props.history.push({pathname: '/dashboard'},
      // this.setState({ loading: false }),
      this.individualCarStore.loading = false,
      toastSuccess('Car successfully borrowed')
      ))
  }

  onCancel = (event) => this.props.history.push({pathname: '/'})


  componentDidMount() {
    // this.setState({ loading: true });
    this.individualCarStore.loading = true;
    const { id }= this.props.match.params;
      fetchRequest(`${baseURL}/${cars}/${id}`)
      .then((result) => {
        this.setState({
          // car: result,
          // loading: false,
        });
        this.individualCarStore.car = result;
        this.individualCarStore.loading = false;
      });
  }

  render() {
    const { foundCustomer, phone, registrationFormValidations } = this.customerStore;
    const { car, loading } = this.individualCarStore;
    // const { registrationFormValidations } = this.state;
    // const car = { ...this.state.car };
    const priceEstimationForm = this.state;
    // const { loading } = this.state;
    let checkoutFormCards = <div className="formItems">
    <CheckoutCarCard car={car} />
    <BookingForm 
      car={car} 
      newCustomerHandler={this.newCustomerHandler} 
      phoneChanged={this.handlePhoneChanged} 
      onCancel={this.onCancel} 
      carCheckoutHandler={this.carCheckoutHandler}
      onRegistrationSubmit={this.onRegistrationSubmit}  
      checkoutFormValidations={this.state.checkoutFormValidations} 
      registrationFormValidations={registrationFormValidations}
      foundCustomer={foundCustomer}
      onCheckoutInputSubmit={this.onCheckoutInputSubmit}
      phone={phone}
      />
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
