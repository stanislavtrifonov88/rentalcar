import React from 'react';
import { timeStamp } from '../../../../shared/dateModifiers';
import { isValidField } from '../../Validations/validationChecks';

const Registration = ({ newCustomerHandler, registrationFormValidations, onCancel, onRegistrationSubmit }) => {
  const validationErrorFirstName = isValidField(registrationFormValidations.firstName);
  const validationErrorLastName = isValidField(registrationFormValidations.lastName);
  const validationErrorBirthdate = isValidField(registrationFormValidations.birthdate);

  return (
    <>
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
            data-name="firstName"
            onChange={newCustomerHandler}
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
            data-name="lastName"
            onChange={newCustomerHandler}
          />

          <p className={validationErrorLastName}>Last name is invalid.</p>
        </div>
      </div>
      <div className="inputRows">
        <div className="inputFormContainer">
          <label htmlFor="birthdate">
            Birthdate
          </label>
          <input
            id="birthdate"
            className="birthdateField"
            type="date"
            placeholder="Birthdate"
            required
            data-name="birthdate"
            onChange={newCustomerHandler}
          />

          <p className={validationErrorBirthdate}>Please enter a valid birthdate.</p>
        </div>
      </div>
      <div className="checkoutBtnsContainer">
        <button type="submit" className="bookCarBtn" onClick={onRegistrationSubmit} data-element="bookingFormCheckoutBtn">
          Checkout
        </button>
        <button type="submit" className="bookCarBtn" onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};
export default Registration;
