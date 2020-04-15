import React from 'react';
import * as priceCalculations from '../../../services/PriceCalculations';
import './DashboardItem.css'
import { dateFormatter } from '../../../shared/constants';

class DashboardItem extends React.Component {


  handleClick = (event) => {
    this.props.onChildClick(event.target.name, this.props.contract.id)
  }

  render() {
    const estimatedNumberOfDays = priceCalculations.estimatedDaysRented(this.props.contract.startDate, this.props.contract.contractEndDate);
    const currentNumberOfDays = priceCalculations.currentDaysRented(this.props.contract.startDate);
    const daysDiscount = priceCalculations.estimatedDaysDiscount(estimatedNumberOfDays);
    const basePriceMock = this.props.contract.price;
    const priceAfterDaysDiscount = basePriceMock * daysDiscount;
    const agePenalty = priceCalculations.estimatedAgeDiscount(this.props.contract.borrowerAge);
    const priceAfterDaysAndAge = agePenalty * priceAfterDaysDiscount;
    const estimatedTotalPrice = priceAfterDaysAndAge * estimatedNumberOfDays;
    const daysOverUnderContract = priceCalculations.daysOverUnderContract(this.props.contract.startDate, this.props.contract.contractEndDate);
    const overduePenalty = priceCalculations.overduePenalty(daysOverUnderContract);
    const currentTotalPrice = estimatedTotalPrice + (overduePenalty * daysOverUnderContract * priceAfterDaysAndAge);
    const currentPricePerDay = priceCalculations.currentPricePerDay(overduePenalty, priceAfterDaysAndAge);
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
          {priceAfterDaysAndAge.toFixed(2)}
        </td>
        <td>{currentNumberOfDays}</td>
        <td>{daysOverUnderContract}</td>
        <td>{currentPricePerDay.toFixed(2)}</td>
        <td>{currentTotalPrice.toFixed(2)}</td>
        <td><button className="returnCarBtn" onClick={this.handleClick} name={currentTotalPrice}>Return</button ></td>
      </tr>
    );
  }
}


export default DashboardItem;
