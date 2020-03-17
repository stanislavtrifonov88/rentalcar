import React from 'react';
import Form from 'react-bootstrap/Form';
import {
  Col, Button,
} from 'react-bootstrap';
import './BookingForm.css';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isValidField } from '../Validations/validationChecks';

const BookingForm = ({ changed, onInputSubmit, validations }) => {
  const validationErrorFirstName = isValidField(validations.borrowerFirstName);
  const validationErrorLastName = isValidField(validations.borrowerLastName);
  const validationErrorAge = isValidField(validations.borrowerAge);
  const validationErrorDate = isValidField(validations.contractEndDate);

  return (
    <Form className="checkoutFormContainer">
      <h1>Booking</h1>
      <div className="bookingFormInputFields">
        <Form.Row>
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              className="firstNameField"
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
              data-name="borrowerFirstName"
              onChange={changed}
            />
            <p className={validationErrorFirstName}>First name is invalid.</p>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              className="lastNameField"
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
              data-name="borrowerLastName"
              onChange={changed}
            />
            <p className={validationErrorLastName}>Last name is invalid.</p>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="5" controlId="validationCustom03">
            <Form.Label>Age</Form.Label>
            <Form.Control
              className="ageField"
              type="number"
              placeholder="Age"
              defaultValue="18"
              required
              data-name="borrowerAge"
              onChange={changed}
            />
            <p className={validationErrorAge}>Please enter a valid age.</p>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom04">
            <Form.Label>Return Date</Form.Label>
            <Form.Control
              className="dateField"
              type="datetime-local"
              required
              data-name="contractEndDate"
              defaultValue={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
              min={moment(new Date()).format('YYYY-MM-DDThh:mm')}
              onChange={changed}
            />
            <p className={validationErrorDate}>Please enter a valid date.</p>
          </Form.Group>
        </Form.Row>
      </div>
      <div>
        <Button className="bookCarBtn" variant="outline-success" onClick={onInputSubmit}>
          Checkout
        </Button>
        <Button variant="outline-success"><Link to="/home">Cancel</Link></Button>
      </div>
    </Form>
  );
};

BookingForm.propTypes = {
  changed: PropTypes.func,
  onInputSubmit: PropTypes.func,
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
  validations: PropTypes.exact({
    borrowerFirstName: {},
    borrowerLastName: {},
    borrowerAge: {},
    contractEndDate: {},
  }),
};


export default BookingForm;
