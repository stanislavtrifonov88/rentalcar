import * as moment from 'moment';

export default class Calculations {

    priceDiscounts = {
        daysDiscount1day: 1,
        daysDiscount2to6days: 0.85,
        daysDiscount7PlusDays: 0.75,
        daysDiscountNegativeDays: 'Estimated days cannot be negative',
        ageDiscountBelow25: 1.2,
        ageDiscountAbove25: 1,
        ageDiscountBelow18: 'Borrower age cannot be below 18',
    }

    estimatedDaysRented = (startTime, endTime) => {
        const days = moment
          .duration(moment(endTime, 'YYYY/MM/DDTHH:mm')
            .diff(moment(startTime, 'YYYY/MM/DDTHH:mm'))).asDays();
      
        if (days < 1) {
          return 1;
        }
      
        return Math.ceil(days);
      };
      
      currentDaysRented = (startTime, today = new Date()) => {
        const endTime = moment(today, 'YYYY/MM/DDTHH:mm');
        const days = (moment
          .duration(moment(endTime, 'YYYY/MM/DDTHH:mm')
            .diff(moment(startTime, 'YYYY/MM/DDTHH:mm'))).asDays());
      
      
        return Math.ceil(days);
      };
      
      daysOverUnderContract = (
        startTime, endTime, currentDaysRentedFunction = this.currentDaysRented, estimatedDaysRentedFunction = this.estimatedDaysRented,
      ) => {
        const currentDaysNumber = currentDaysRentedFunction(startTime);
        const estimatedDaysNumber = estimatedDaysRentedFunction(startTime, endTime);
      
        return currentDaysNumber - estimatedDaysNumber;
      };
      
      estimatedDaysDiscount = (daysRented) => {
        if (daysRented === 1) {
          return this.priceDiscounts.daysDiscount1day;
        }
      
        if (daysRented >= 2 && daysRented <= 6) {
          return this.priceDiscounts.daysDiscount2to6days;
        }
      
        if (daysRented > 6) {
          return this.priceDiscounts.daysDiscount7PlusDays;
        }
      
        return this.priceDiscounts.daysDiscountNegativeDays;
      };
      
      estimatedAgeDiscount = (borrowerAge) => {
        if (borrowerAge > 25) {
          return this.priceDiscounts.ageDiscountAbove25;
        }
        if (borrowerAge >= 18 && borrowerAge <= 25) {
          return this.priceDiscounts.ageDiscountBelow25;
        }
      
        return this.priceDiscounts.ageDiscountBelow18;
      };
      
      estimatedPricePerDay = (
        daysRented,
        borrowerAge,
        carBasePrice,
        estimatedDaysDiscountFunction = this.estimatedDaysDiscount,
        estimatedAgeDiscountFunction = this.estimatedAgeDiscount,
      ) => {
        const daysDiscount = estimatedDaysDiscountFunction(daysRented);
        const ageDiscount = estimatedAgeDiscountFunction(borrowerAge);
      
        return carBasePrice * daysDiscount * ageDiscount;
      };
      
      
      overduePenalty = (
        overUnderDaysRented,
      ) => {
        if (overUnderDaysRented < 1) {
          return 0;
        }
        if (overUnderDaysRented < 6) {
          return 1.5;
        }
      
        return 2;
      };
      
      currentPricePerDay = (overduePenaltyPercent, estimatedDailyPrice) => overduePenaltyPercent * estimatedDailyPrice;

}