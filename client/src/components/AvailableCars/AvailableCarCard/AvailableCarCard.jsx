import React from 'react';
import './AvailableCarCard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AvailableCarCard = ({ car }) => (
  <div className="col-lg-4 col-md-6">
    <div className="cardAvailableCar">
      <img src={car.picture} alt="NO PIC" />
      <div className="carDetails">
        <h3>{car.model}</h3>
        <h6>{car.brand}</h6>
        <div className="carText">
          <div className="carInfo">
            <p>
              Class:
              {' '}
              {car.className}
            </p>
            <p>
              5 seats
            </p>
          </div>
          <div className="Border" />
          <div className="carInfo">
            <p>
              $
              {' '}
              {car.price.toFixed(2)}
              {' '}
              | Day
            </p>
            <p className="unlimitedKm">
              unlimited km
            </p>
          </div>
        </div>
      </div>
      <div className="StandardBtn">
        <Link to={`/cars/${car.id}`}>Checkout</Link>
      </div>
    </div>
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
    id: '',
    brand: '',
    model: '',
    picture: '',
    className: '',
    price: '',
  }),
};

export default AvailableCarCard;
