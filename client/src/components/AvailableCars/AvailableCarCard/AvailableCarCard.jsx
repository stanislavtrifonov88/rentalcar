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
    id: '7c246d71-1538-406a-8bad-4043f3387fcd',
    brand: 'Opel',
    model: 'Astra',
    picture: 'https://www.auto-lizingu.lt/wp-content/uploads/2019/09/opel-astra-1-6-l-hecbekas-2014-dyzelinas-13.jpg',
    className: 'B',
    price: 70,
  }),
};

export default AvailableCarCard;
