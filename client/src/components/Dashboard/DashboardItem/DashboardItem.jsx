import React from 'react';
import * as priceCalculations from '../../../services/PriceCalculations';
import './DashboardItem.css'
import { dateFormatter } from '../../../shared/dateModifiers';

class DashboardItem extends React.Component {


  handleClick = (event) => {
    this.props.onChildClick(event.target.name, this.props.contract.id)
  }

  render() {
    const estimatedNumberOfDays = priceCalculations.estimatedDaysRented(this.props.contract);
    const currentNumberOfDays = priceCalculations.currentDaysRented(this.props.contract);
    const daysDiscount = priceCalculations.daysDiscount(this.props.contract);
    const basePriceMock = this.props.contract.price;
    const priceAfterDaysDiscount = basePriceMock * daysDiscount;
    const agePenalty = priceCalculations.ageDiscount(this.props.contract);
    const estimatedTotalDiscount = priceCalculations.totalDiscount(this.props.contract);
    const estimatedPricePerDay = priceCalculations.estimatedPricePerDay((this.props.contract));
    const daysOverUnderContract = priceCalculations.overdueDays(this.props.contract);
    const estimatedTotalPrice = priceCalculations.estimatedTotalPrice(this.props.contract)
    const currentTotalPrice = priceCalculations.currentTotalPrice(this.props.contract);
    const currentPricePerDay = priceCalculations.currentPricePerDay(this.props.contract);
    const startDateFormatted = dateFormatter(this.props.contract.startDate);
    const returnDateFormatted = dateFormatter(this.props.contract.contractEndDate);


    return (
      <tr className="dashboardTable">
        <td>
          {this.props.contract.brand}
          {' '}
          {this.props.contract.model}
        </td>
        <td>{this.props.contract.borrowerFirstName}</td>
        <td>
          {this.props.contract.borrowerLastName}
          {' '}
        </td>
        <td>{startDateFormatted}</td>
        <td>{returnDateFormatted}</td>
        <td>{estimatedNumberOfDays}</td>
        <td>
          {estimatedPricePerDay.toFixed(2)}
        </td>
        <td>
          {estimatedTotalPrice.toFixed(2)}
        </td>
        <td>{currentNumberOfDays}</td>
        <td>{daysOverUnderContract}</td>
        <td>{currentPricePerDay.toFixed(2)}</td>
        <td>{currentTotalPrice.toFixed(2)}</td>
        <td><button className="returnCarBtn" onClick={this.handleClick}>Return</button ></td>
      </tr>
    );
  }
}


export default DashboardItem;
