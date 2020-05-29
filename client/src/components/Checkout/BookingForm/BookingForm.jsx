import React from 'react';
import './BookingForm.css';
import PropTypes from 'prop-types';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { observer, inject } from 'mobx-react';
import CarCheckoutForm from './Customer/CarCheckoutForm';
import Registration from './RegistrationForm/Registration';
import phoneValidation from '../../../services/validations/phoneValidation';
import mappedPhoneInfo from '../../../services/mappers/phoneLibrary';

@inject('customerStore')
@observer
export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    const { customerStore } = this.props;
    this.customerStore = customerStore;
  }

  handlePhoneChanged = (value) => {
    let phoneDetails = "";
    const phoneLibraryInput = parsePhoneNumber(value);

    if (phoneLibraryInput !== undefined) {
      phoneDetails = mappedPhoneInfo(phoneLibraryInput)
    }

    const newObj = {};
    newObj.touched = true;
    newObj.value = value;
    newObj.isValid = phoneValidation(phoneDetails);

    this.customerStore.phone = newObj;

    if (newObj.isValid) {
      this.customerStore.fetchFoundCustomer(value);
    } else {
      this.customerStore.resetFoundCustomer();
    }
  };

  render() {
    const { foundCustomer, phone } = this.customerStore;
    const { onCancel, onPageChangeToDashboard } = this.props;
    let names;

    if (foundCustomer.firstName === '') {
      names = <Registration onCancel={onCancel} />;
    } else {
      names = (
        <CarCheckoutForm
          onCancel={onCancel}
          onPageChangeToDashboard={onPageChangeToDashboard}
        />
      );
    }

    let found = <p className="notFound">Client not found!</p>;
    if (!phone.touched) {
      found = <p className="invisible">Client not found!</p>;
    } else if (foundCustomer.firstName !== '') {
      found = (
        <p className="found">
          Welcome back,
          {foundCustomer.firstName}
          !
        </p>
      );
    }

    return (
      <div className="checkoutFormContainer" data-element="bookingForm">
        <h1>Booking Form</h1>
        <div className="bookingFormInputFields">
          <div className="inputRows">
            <div className="inputFormContainer">
              <label htmlFor="phoneNumber">Phone number</label>
              <PhoneInput
                id="phoneNumber"
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
  onCancel: PropTypes.func,
  onPageChangeToDashboard: PropTypes.func,
};

BookingForm.defaultProps = {
  onCancel: () => '',
  onPageChangeToDashboard: () => '',
};
