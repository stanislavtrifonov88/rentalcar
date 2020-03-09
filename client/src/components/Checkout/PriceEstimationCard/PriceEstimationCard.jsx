import React from 'react';
import './PriceEstimationCard.css';
import * as priceCalculations from '../../../services/PriceCalculations';

const PriceEstimationCard = ({ priceEstimationForm }) => {
  const numberOfDays = priceCalculations.estimatedDaysRented(priceEstimationForm.checkoutForm.startDate, priceEstimationForm.checkoutForm.contractEndDate);
  const daysDiscount = priceCalculations.estimatedDaysDiscount(numberOfDays);
  const basePrice = (priceEstimationForm.car.__className__.price).toFixed(2);
  const priceAfterDaysDiscount = (basePrice * daysDiscount).toFixed(2);
  const agePenalty = priceCalculations.estimatedAgeDiscount(priceEstimationForm.checkoutForm.borrowerAge).toFixed(2);
  const priceAfterDaysAndAge = (agePenalty * priceAfterDaysDiscount).toFixed(2);
  const totalPrice = (priceAfterDaysAndAge * numberOfDays).toFixed(2);
  console.log(priceEstimationForm.car);
  return (
    <div className="priceEstimationCard">
      <h1>Estimated Price</h1>
      <div className="priceItem">
        <h4>Days</h4>
        <h4>{numberOfDays}</h4>
      </div>
      <div className="priceItem">
        <h4>Daily price</h4>
        <h4>
          {basePrice}
          $
        </h4>
      </div>
      <br />
      <div className="priceItem">
        <h4>
          Days Discount:
        </h4>
        <p>
          -
          {((1 - daysDiscount) * 100).toFixed(0)}
          %
        </p>
        <h4>
          {priceAfterDaysDiscount}
          $
        </h4>
      </div>
      <div className="priceItem">
        <h4>
          Age Penalty:
        </h4>
        <p>
          +
          {((agePenalty - 1) * 100).toFixed(0)}
          %
        </p>
        <h4>
          {priceAfterDaysAndAge}
          $
        </h4>
      </div>
      <br />
      <div className="priceItem">
        <h4>Final daily price</h4>
        <h4>
          {priceAfterDaysAndAge}
          $
        </h4>
      </div>
      <br />
      <div className="priceItem">
        <h4>Total Price</h4>
        <h4>
          {totalPrice}
          $
        </h4>
      </div>
    </div>
  );
};


export default PriceEstimationCard;
