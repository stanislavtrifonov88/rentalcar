import React from 'react';
import './AvailableCarCard.css';
import PropTypes from 'prop-types';
import { CarInterface } from '../../../mobx/interfaces';

interface Props {
  car: CarInterface,
  onCheckout: (id: string) => string,
}

const AvailableCarCard: React.FC<Props> = ({ car, onCheckout }) => (
  <div className="col-lg-4 col-md-6">
    <div className="cardAvailableCar" data-element="availableCarCard">
      <img className="AvailableCarCardPic" src={car.picture} alt="NO PIC" />
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
      <button type="submit" className="StandardBtn" onClick={() => onCheckout(car.id)} data-element="availableCarCardCheckoutBtn">Checkout</button>
    </div>
  </div>
);

AvailableCarCard.propTypes = {
  onCheckout: PropTypes.func,
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
  onCheckout: () => '',
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
