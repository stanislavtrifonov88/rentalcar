import React from 'react';
import { Card } from 'react-bootstrap';
import './CheckoutCarCard.css';

const CheckoutCarCard = (props) => (
  <Card className="checkoutCarCard">
    <h1>Car</h1>
    <Card.Img className="checkoutCarCardImg" variant="top" src={props.car.picture} />
    <Card.Body>
      <Card.Title>{props.car.model}</Card.Title>
      <Card.Text>{props.car.brand}</Card.Text>
      <Card.Text>
        Class
        {/* {props.car.__className__.className} */}
      </Card.Text>
      <Card.Text>Price per day 38$</Card.Text>
    </Card.Body>
  </Card>
);


export default CheckoutCarCard;
