import React from 'react';
import './CheckoutCarCard.css';
import PropTypes from 'prop-types';

const CheckoutCarCard = ({ car }) => (
  <div className="cardCheckoutCar">
    <h1>Car</h1>
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
            {car.price}
            {' '}
            | Day
          </p>
          <p className="unlimitedKm">
            unlimited km
          </p>
        </div>
      </div>
    </div>
  </div>
);

CheckoutCarCard.propTypes = {
  car: PropTypes.exact({
    id: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    picture: PropTypes.string,
    className: PropTypes.string,
    price: PropTypes.number,
  }),
};

CheckoutCarCard.defaultProps = {
  car: PropTypes.exact({
    id: '',
    brand: 'Opel',
    model: 'Astra',
    picture: 'https://www.auto-lizingu.lt/wp-content/uploads/2019/09/opel-astra-1-6-l-hecbekas-2014-dyzelinas-13.jpg',
    className: 'B',
    price: 70,
  }),
};

export default CheckoutCarCard;
