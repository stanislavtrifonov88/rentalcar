import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './AvailableCarCard.css';
import { Link } from 'react-router-dom';

const AvailableCarCard = ({ car }) => (
  <div className="col-lg-4 col-md-6">
    <Card className="cardAvailableCar">
      <Card.Img
        variant="top"
        src={car.picture}
      />
      <Card.Body>
        <Card.Title>{car.model}</Card.Title>
        <Card.Text>
          {car.brand}
        </Card.Text>
        <Card.Text>
          Class
          {' '}
          {car.__className__.className}
        </Card.Text>
        <Card.Text>
          Price per day
          {' '}
          {car.__className__.price}
          $
        </Card.Text>
        <Button className="checkoutBtn" variant="outline-success"><Link to={`/cars/${car.id}`}>Checkout</Link></Button>
      </Card.Body>
    </Card>
  </div>
);

export default AvailableCarCard;
