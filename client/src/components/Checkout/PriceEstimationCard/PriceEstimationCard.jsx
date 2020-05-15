import React from 'react';
import './PriceEstimationCard.css';
import PropTypes from 'prop-types';
import * as priceCalculations from '../../../services/PriceCalculations';
import { differenceInYears } from '../../../shared/dateModifiers';
import { observer, inject } from "mobx-react";

const PriceEstimationCard = inject("customerStore", "individualCarStore", "checkoutFormStore")(observer(({ customerStore, individualCarStore, checkoutFormStore }) => {
  const { foundCustomer } = customerStore;
  const { checkoutForm } = checkoutFormStore;
  const { car } = individualCarStore;
  const basePrice = car.price;
  // foundCustomer.price = car.price;
  foundCustomer.age = differenceInYears(foundCustomer.birthdate)
  console.log(foundCustomer)

  const showHideAge = customerStore.foundCustomer.birthdate ? 'show' : 'hide';
  const showHideDays = checkoutFormStore.checkoutFormValidations.contractEndDate.valid ? 'show' : 'hide';
  const showHideFinalOffer = (((showHideAge === 'show') && (showHideDays === 'show'))) ? 'show' : 'hide';
  let estimatedNumberOfDays = 0;
  if (checkoutFormStore.checkoutFormValidations.contractEndDate.valid) {
    estimatedNumberOfDays = priceCalculations.estimatedDaysRented(checkoutForm);
  }
  const daysDiscount = priceCalculations.daysDiscount(checkoutForm);
  const agePenalty = priceCalculations.ageDiscount(foundCustomer);
  // const estimatedTotalDiscount = priceCalculations.totalDiscount(foundCustomer);
  const estimatedTotalDiscount = daysDiscount + agePenalty + foundCustomer.loyaltyDiscount + foundCustomer.geoDiscount;
  console.log(estimatedTotalDiscount)
  const currentPricePerDay = (1 + estimatedTotalDiscount) * basePrice;
  const currentTotalPrice = currentPricePerDay * estimatedNumberOfDays;
  console.log(customerStore)
  return (
    <div className="priceEstimationCard" data-element="priceEstimationCard">
      <h1>Estimated Price</h1>
      <div className="priceCalculationDetails">
        <h5 className="visibleItem">Starting Details</h5>
        <div className="priceItem">
          <p>Daily price</p>
          <p>
            {basePrice.toFixed(2)}
            $
          </p>
        </div>
        <div className={showHideDays}>
          <p>Days</p>
          <p>{estimatedNumberOfDays}</p>
        </div>
        <br />
        <h5 className="visibleItem">Discounts</h5>
        <div className={showHideAge}>
          <p>
            Loyalty Bonus:
          </p>
          <p>
            {foundCustomer.loyaltyDiscount * 100}
            %
          </p>
        </div>
        <div className={showHideAge}>
          <p>
            Geo Discount:
          </p>
          <p>
            {foundCustomer.geoDiscount * 100}
            %
          </p>
        </div>

        <div className={showHideAge}>
          <p>
            Age Penalty:
          </p>
          <p>
            {agePenalty * 100}
            %
          </p>
        </div>
        <div>
        <div className={showHideDays}>
          <p>
            Days Discount:
          </p>
          <p>
            {daysDiscount * 100}
            %
          </p>
        </div>
        <div className={showHideFinalOffer}>
          <p>
            Total Discount:
          </p>
          <p>
            {(estimatedTotalDiscount * 100).toFixed()}
            %
          </p>
        </div>
        </div>
        <br />
        <h5>Final Offer</h5>
        <div >
        <div className={showHideFinalOffer}>
          <p>Daily Price</p>
          <p>
            {currentPricePerDay.toFixed(2)}
            $
          </p>
        </div>
        </div>
        <div className={showHideFinalOffer}>
          <p>Total Price</p>
          <p>
            {currentTotalPrice.toFixed(2)}
            $
          </p>
        </div>

      </div>
    </div>
  );
}));


PriceEstimationCard.propTypes = {
  priceEstimationForm: PropTypes.exact({
    loading: PropTypes.bool,
    phone: PropTypes.object,
    foundCustomer: PropTypes.object,
    car: PropTypes.object,
    checkoutForm: PropTypes.object,
    checkoutFormValidations: PropTypes.object,
  }),
};

PriceEstimationCard.defaultProps = {
  priceEstimationForm: PropTypes.exact({
    loading: null,
    phone: {},
    foundCustomer: {},
    car: {},
    checkoutForm: {},
    checkoutFormValidations: {},
  }),
};

export default PriceEstimationCard;
