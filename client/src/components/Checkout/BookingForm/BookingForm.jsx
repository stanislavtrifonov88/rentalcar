import React from 'react';
import Form from 'react-bootstrap/Form';
import {
  Col, Button,
} from 'react-bootstrap';
import './BookingForm.css';
import * as moment from 'moment';
import { Link } from 'react-router-dom';


const BookingForm = ({ changed, onInputSubmit, validations }) => {
  console.log(validations)


  let validationErrorFirstName = <p />;
  if (!validations.borrowerFirstName.valid && validations.borrowerFirstName.touched) {
    validationErrorFirstName = <p>First name is invalid.</p>;
  }

  let validationErrorLastName = <p />;
  if (!validations.borrowerLastName.valid  && validations.borrowerLastName.touched) {
    validationErrorLastName = <p>Last name is invalid.</p>;
  }

  let validationErrorAge = <p />;
  if (!validations.borrowerAge.valid && validations.borrowerAge.touched) {
    validationErrorAge = <p>Please provide a valid age.</p>;
  }

  let validationErrorDate = <p />;
  if (!validations.contractEndDate.valid && validations.contractEndDate.touched) {
    validationErrorDate = <p>Please provide a valid date.</p>;
  }

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
          {validationErrorFirstName}
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
          {validationErrorLastName}
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
          {validationErrorAge}
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
          </Form.Control.Feedback>
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
          {validationErrorDate}
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
}

export default BookingForm;
