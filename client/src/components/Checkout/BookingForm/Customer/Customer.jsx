import React from 'react';
import { timeStamp } from '../../../../shared/dateModifiers';


const Customer = ({ foundCustomer, onCheckoutInputSubmit, onCancel }) => {
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
            value={foundCustomer.firstName}
            disabled
          />
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
            value={foundCustomer.lastName}
            disabled
          />
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
            value={foundCustomer.birthdate}
            disabled
          />
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
            min={timeStamp()}
            // onChange={changed}
          />

          {/* <p className={validationErrorDate}>Please enter a valid date.</p> */}
        </div>
      </div>
      <div className="checkoutBtnsContainer">
        <button type="submit" className="bookCarBtn" onClick={onCheckoutInputSubmit} data-element="bookingFormCheckoutBtn">
          Checkout
        </button>
        <button type="submit" className="bookCarBtn" onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};
export default Customer;
