import React from 'react';
import './PriceEstimationCard.css';
import PropTypes from 'prop-types';
import * as priceCalculations from '../../../services/PriceCalculations';

const PriceEstimationCard = ({ priceEstimationForm }) => {
  const numberOfDays = priceCalculations.estimatedDaysRented(
    priceEstimationForm.checkoutForm.startDate,
    priceEstimationForm.checkoutForm.contractEndDate,
  );
  const daysDiscount = priceCalculations.estimatedDaysDiscount(numberOfDays);
  const basePrice = (priceEstimationForm.car.price).toFixed(2);
  const priceAfterDaysDiscount = (basePrice * daysDiscount).toFixed(2);
  const agePenalty = priceCalculations.estimatedAgeDiscount(
    priceEstimationForm.checkoutForm.borrowerAge,
  ).toFixed(2);
  const priceAfterDaysAndAge = (agePenalty * priceAfterDaysDiscount).toFixed(2);
  const totalPrice = (priceAfterDaysAndAge * numberOfDays).toFixed(2);

  return (
    <div className="priceEstimationCard">
      <h1>Estimated Price</h1>
      <div className="priceCalculationDetails">
        <h5>Contract Details</h5>
        <div className="priceItem">
          <p>Days</p>
          <p>{numberOfDays}</p>
        </div>
        <div className="priceItem">
          <p>Daily price</p>
          <p>
            {basePrice}
            $
          </p>
        </div>
        <br />
        <h5>Discounts</h5>
        <div className="priceItem">
          <p>
            Days Discount:
          </p>
          <p>
            -
            {((1 - daysDiscount) * 100).toFixed(0)}
            %
          </p>
          <p>
            {priceAfterDaysDiscount}
            $
          </p>
        </div>
        <div className="priceItem">
          <p>
            Age Penalty:
          </p>
          <p>
            +
            {((agePenalty - 1) * 100).toFixed(0)}
            %
          </p>
          <p>
            {priceAfterDaysAndAge}
            $
          </p>
        </div>
        <br />
        <h5>Final Offer</h5>
        <div className="priceItem">
          <p>Daily Price</p>
          <p>
            {priceAfterDaysAndAge}
            $
          </p>
        </div>
        <br />
        <div className="priceItem">
          <p className="estimatedTotalPrice">Total Price</p>
          <p className="estimatedTotalPrice">
            {totalPrice}
            $
          </p>
        </div>
      </div>
    </div>
  );
};


PriceEstimationCard.propTypes = {
  priceEstimationForm: PropTypes.exact({
    car: PropTypes.object,
    checkoutForm: PropTypes.object,
    checkoutFormValidations: PropTypes.object,
  }),
};

PriceEstimationCard.defaultProps = {
  priceEstimationForm: PropTypes.exact({
    car: {},
    checkoutForm: {},
    checkoutFormValidations: {},
  }),
};

export default PriceEstimationCard;
