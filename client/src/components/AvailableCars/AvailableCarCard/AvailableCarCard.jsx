import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './AvailableCarCard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
          {car.className}
        </Card.Text>
        <Card.Text>
          Price per day
          {' '}
          {car.price}
          $
        </Card.Text>
        <Button className="checkoutBtn" variant="outline-success"><Link to={`/cars/${car.id}`}>Checkout</Link></Button>
      </Card.Body>
    </Card>
  </div>
);

AvailableCarCard.propTypes = {
  car: PropTypes.exact({
    id: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    picture: PropTypes.string,
    className: PropTypes.string,
    price: PropTypes.number,
  }),
};

AvailableCarCard.defaultProps = {
  car: PropTypes.exact({
    id: '7c246d71-1538-406a-8bad-4043f3387fcd',
    brand: 'Opel',
    model: 'Astra',
    picture: 'https://www.auto-lizingu.lt/wp-content/uploads/2019/09/opel-astra-1-6-l-hecbekas-2014-dyzelinas-13.jpg',
    className: 'B',
    price: 70,
  }),
};

export default AvailableCarCard;
