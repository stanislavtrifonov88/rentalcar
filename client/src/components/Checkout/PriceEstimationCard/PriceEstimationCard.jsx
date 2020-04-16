import React from 'react';
import './PriceEstimationCard.css';
import PropTypes from 'prop-types';
import * as priceCalculations from '../../../services/PriceCalculations';

const PriceEstimationCard = ({ priceEstimationForm }) => {
  const estimatedNumberOfDays = priceCalculations.estimatedDaysRented(
    priceEstimationForm.checkoutForm,
  );
  const basePrice = priceEstimationForm.checkoutForm.price;
  const daysDiscount = priceCalculations.daysDiscount(priceEstimationForm.checkoutForm);
  const agePenalty = priceCalculations.ageDiscount(priceEstimationForm.checkoutForm);
  const estimatedTotalDiscount = priceCalculations.totalDiscount(priceEstimationForm.checkoutForm);
  const currentTotalPrice = priceCalculations.currentTotalPrice(priceEstimationForm.checkoutForm);
  const currentPricePerDay = priceCalculations.currentPricePerDay(priceEstimationForm.checkoutForm);

  return (
    <div className="priceEstimationCard" data-element="priceEstimationCard">
      <h1>Estimated Price</h1>
      <div className="priceCalculationDetails">
        <h5>Contract Details</h5>
        <div className="priceItem">
          <p>Days</p>
          <p>{estimatedNumberOfDays}</p>
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
            {daysDiscount * 100}
            %
          </p>
        </div>
        <div className="priceItem">
          <p>
            Age Penalty:
          </p>
          <p>
            {agePenalty * 100}
            %
          </p>
        </div>
        <div className="priceItem">
          <p>
            Total Discount:
          </p>
          <p>
            {estimatedTotalDiscount * 100}
            %
          </p>
        </div>
        <br />
        <h5>Final Offer</h5>
        <div className="priceItem">
          <p>Daily Price</p>
          <p>
            {currentPricePerDay}
            $
          </p>
        </div>
        <br />
        <div className="priceItem">
          <p className="estimatedTotalPrice">Total Price</p>
          <p className="estimatedTotalPrice">
            {currentTotalPrice}
            $
          </p>
        </div>
      </div>
    </div>
  );
};


PriceEstimationCard.propTypes = {
  priceEstimationForm: PropTypes.exact({
    loading: PropTypes.bool,
    car: PropTypes.object,
    checkoutForm: PropTypes.object,
    checkoutFormValidations: PropTypes.object,
  }),
};

PriceEstimationCard.defaultProps = {
  priceEstimationForm: PropTypes.exact({
    loading: null,
    car: {},
    checkoutForm: {},
    checkoutFormValidations: {},
  }),
};

export default PriceEstimationCard;
