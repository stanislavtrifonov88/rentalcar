import React from 'react';
import './DashboardItem.css'
import { datePresentationFormat } from '../../../services/dates/dateModifiers';
import { currentDaysRented, estimatedDaysRented, overdueDays } from '../../../services/calculations/days/index';
import { currentPricePerDay, currentTotalPrice, estimatedPricePerDay, estimatedTotalPrice } from '../../../services/calculations/prices/index';
class DashboardItem extends React.Component {


  handleClick = (event) => {
    this.props.onChildClick(this.props.contract.id)
  }

  render() {
    const estimatedNumberOfDays = estimatedDaysRented(this.props.contract);
    const currentNumberOfDays = currentDaysRented(this.props.contract);
    const estimatedPricePerDayValue = estimatedPricePerDay((this.props.contract));
    const daysOverUnderContract = overdueDays(this.props.contract);
    const estimatedTotalPriceValue = estimatedTotalPrice(this.props.contract)
    const currentTotalPriceValue = currentTotalPrice(this.props.contract);
    const currentPricePerDayValue = currentPricePerDay(this.props.contract);
    const startDateFormatted = datePresentationFormat(this.props.contract.startDate);
    const returnDateFormatted = datePresentationFormat(this.props.contract.contractEndDate);

    return (
      <tr className="dashboardTable">
        <td>
          {this.props.contract.brand}
          {' '}
          {this.props.contract.model}
        </td>
        <td>{this.props.contract.firstName}</td>
        <td>
          {this.props.contract.lastName}
          {' '}
        </td>
        <td>{startDateFormatted}</td>
        <td>{returnDateFormatted}</td>
        <td>{estimatedNumberOfDays}</td>
        <td>
          {estimatedPricePerDayValue.toFixed(2)}
        </td>
        <td>
          {estimatedTotalPriceValue.toFixed(2)}
        </td>
        <td>{currentNumberOfDays}</td>
        <td>{daysOverUnderContract}</td>
        <td>{currentPricePerDayValue.toFixed(2)}</td>
        <td>{currentTotalPriceValue.toFixed(2)}</td>
        <td><button className="returnCarBtn" onClick={this.handleClick}>Return</button ></td>
      </tr>
    );
  }
}


export default DashboardItem;
