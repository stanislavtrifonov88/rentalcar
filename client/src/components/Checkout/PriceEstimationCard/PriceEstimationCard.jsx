import React from 'react';
import './PriceEstimationCard.css';
import { observer, inject } from 'mobx-react';
import { estimatedDaysRented } from '../../../services/calculations/days/index';
import {
  ageDiscount, geoDiscount, daysDiscount, loyaltyDiscount, totalDiscount,
} from '../../../services/calculations/discounts/index';
import { estimatedPricePerDay, estimatedTotalPrice } from '../../../services/calculations/prices/index';

const PriceEstimationCard = inject('customerStore', 'individualCarStore', 'checkoutFormStore')(observer(({ customerStore, individualCarStore, checkoutFormStore }) => {
  const { foundCustomer } = customerStore;
  const { checkoutForm } = checkoutFormStore;
  const { car } = individualCarStore;
  const totalInfo = { ...checkoutForm, ...foundCustomer, ...car };
  const basePrice = car.price;
  const showHideAge = customerStore.foundCustomer.birthdate ? 'show' : 'hide';
  const showHideDays = checkoutFormStore.checkoutFormValidations.contractEndDate.valid ? 'show' : 'hide';
  const showHideFinalOffer = (((showHideAge === 'show') && (showHideDays === 'show'))) ? 'show' : 'hide';
  let estimatedNumberOfDays = 0;
  if (checkoutFormStore.checkoutFormValidations.contractEndDate.valid) {
    estimatedNumberOfDays = estimatedDaysRented(checkoutForm);
  }
  const daysDiscountPercent = daysDiscount(checkoutForm);
  const agePenaltyPercent = ageDiscount(foundCustomer);
  const geoDiscountPercent = geoDiscount(foundCustomer);
  const loyaltyDiscountPercent = loyaltyDiscount(foundCustomer);
  const estimatedTotalDiscount = totalDiscount(totalInfo);
  const currentPricePerDay = estimatedPricePerDay(totalInfo);
  const currentTotalPrice = estimatedTotalPrice(totalInfo);

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
            {(loyaltyDiscountPercent * 100).toFixed()}
            %
          </p>
        </div>
        <div className={showHideAge}>
          <p>
            Geo Discount:
          </p>
          <p>
            {(geoDiscountPercent * 100).toFixed()}
            %
          </p>
        </div>

        <div className={showHideAge}>
          <p>
            Age Penalty:
          </p>
          <p>
            {(agePenaltyPercent * 100).toFixed()}
            %
          </p>
        </div>
        <div>
          <div className={showHideDays}>
            <p>
              Days Discount:
            </p>
            <p>
              {(daysDiscountPercent * 100).toFixed()}
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
        <div>
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

export default PriceEstimationCard;
