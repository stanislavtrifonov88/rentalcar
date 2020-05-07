import React from 'react';
import './BookingForm.css';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Customer from './Customer/Customer';
import Registration from './RegistrationForm/Registration';


const BookingForm = ({
  changed, checkoutFormValidations, onCancel, phoneChanged,
  foundCustomer, newCustomerHandler, onRegistrationSubmit, onCheckoutInputSubmit, registrationFormValidations, carCheckoutHandler, phone,
}) => {
  let names = <div>hi</div>;

  if (foundCustomer.firstName === '') {
    names = (
      <Registration
        newCustomerHandler={newCustomerHandler}
        registrationFormValidations={registrationFormValidations}
        onRegistrationSubmit={onRegistrationSubmit}
      />
    );
  } else {
    names = (
      <Customer
        foundCustomer={foundCustomer}
        onCheckoutInputSubmit={onCheckoutInputSubmit}
        onCancel={onCancel}
        checkoutFormValidations={checkoutFormValidations}
        carCheckoutHandler={carCheckoutHandler}
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
            <label>
              Phone number
            </label>
            <PhoneInput
              className="phoneField"
              placeholder="Enter phone number"
              data-name="phone"
              required
              onChange={phoneChanged}
            />
            {found}
          </div>
        </div>
        {names}

      </div>

    </div>
  );
};

BookingForm.propTypes = {
  changed: PropTypes.func,
  onInputSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  phoneChanged: PropTypes.func,

  validations: PropTypes.exact({
    firstName: PropTypes.object,
    lastName: PropTypes.object,
    birthdate: PropTypes.object,
    contractEndDate: PropTypes.object,
    contractEndTime: PropTypes.object,
  }),
};

BookingForm.defaultProps = {
  changed: () => '',
  onInputSubmit: () => '',
  onCancel: () => '',
  phoneChanged: () => '',
  validations: PropTypes.exact({
    firstName: {},
    lastName: {},
    birthdate: {},
    contractEndDate: {},
    contractEndTime: {},
  }),
};


export default BookingForm;
