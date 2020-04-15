import React from 'react';
import './BookingForm.css';
import PropTypes from 'prop-types';
import { isValidField } from '../Validations/validationChecks';
import { timeStamp } from '../../../shared/constants';

const BookingForm = ({
  changed, onInputSubmit, validations, onCancel,
}) => {
  const validationErrorFirstName = isValidField(validations.borrowerFirstName);
  const validationErrorLastName = isValidField(validations.borrowerLastName);
  const validationErrorAge = isValidField(validations.borrowerAge);
  const validationErrorDate = isValidField(validations.contractEndDate);

  return (
    <div className="checkoutFormContainer" data-element="bookingForm">
      <h1>Booking Form</h1>
      <div className="bookingFormInputFields">
        <div className="inputRows">
          <div className="inputFormContainer">
            <label htmlFor="FirstName">
              First name
            </label>
            <input
              id="FirstName"
              className="firstNameField"
              required
              type="text"
              placeholder="First name"
              data-name="borrowerFirstName"
              onChange={changed}
            />

            <p className={validationErrorFirstName}>First name is invalid.</p>
          </div>
          <div className="inputFormContainer">
            <label htmlFor="LastName">
              Last className:
            </label>
            <input
              id="LastName"
              className="lastNameField"
              required
              type="text"
              placeholder="Last name"
              data-name="borrowerLastName"
              onChange={changed}
            />

            <p className={validationErrorLastName}>Last name is invalid.</p>
          </div>
        </div>
        <div className="inputRows">
          <div className="inputFormContainer">
            <label htmlFor="Age">
              Age
            </label>
            <input
              id="Age"
              className="ageField"
              type="number"
              placeholder="Age"
              required
              data-name="borrowerAge"
              onChange={changed}
            />

            <p className={validationErrorAge}>Please enter a valid age.</p>
          </div>
          <div className="inputFormContainer">
            <label htmlFor="Date">
              Return Date
            </label>
            <input
              id="Date"
              className="dateField"
              type="datetime-local"
              required
              data-name="contractEndDate"
              defaultValue={timeStamp()}
              min={timeStamp()}
              onChange={changed}
            />

            <p className={validationErrorDate}>Please enter a valid date.</p>
          </div>
        </div>
      </div>
      <div className="checkoutBtnsContainer">
        <button type="submit" className="bookCarBtn" onClick={onInputSubmit} data-element="bookingFormCheckoutBtn">
          Checkout
        </button>
        <button type="submit" className="bookCarBtn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

BookingForm.propTypes = {
  changed: PropTypes.func,
  onInputSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  validations: PropTypes.exact({
    borrowerFirstName: PropTypes.object,
    borrowerLastName: PropTypes.object,
    borrowerAge: PropTypes.object,
    contractEndDate: PropTypes.object,
  }),
};

BookingForm.defaultProps = {
  changed: () => '',
  onInputSubmit: () => '',
  onCancel: () => '',
  validations: PropTypes.exact({
    borrowerFirstName: {},
    borrowerLastName: {},
    borrowerAge: {},
    contractEndDate: {},
  }),
};


export default BookingForm;
