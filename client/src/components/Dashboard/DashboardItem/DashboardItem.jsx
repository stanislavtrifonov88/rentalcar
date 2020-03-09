import React from 'react';
import { Button } from 'react-bootstrap';
import * as priceCalculations from '../../../services/PriceCalculations';

class DashboardItem extends React.Component {


  handleClick = (event) => {
    console.log(event.target.name, this.props.contract.id)
    this.props.onChildClick(event.target.name, this.props.contract.id)
  }
  

  render() {
    const estimatedNumberOfDays = priceCalculations.estimatedDaysRented(this.props.contract.startDate, this.props.contract.contractEndDate);
    const currentNumberOfDays = priceCalculations.currentDaysRented(this.props.contract.startDate);
    const daysDiscount = priceCalculations.estimatedDaysDiscount(estimatedNumberOfDays);
    const basePriceMock = 100;
    const priceAfterDaysDiscount = basePriceMock * daysDiscount;
    const agePenalty = priceCalculations.estimatedAgeDiscount(this.props.contract.borrowerAge);
    const priceAfterDaysAndAge = agePenalty * priceAfterDaysDiscount;
    const estimatedTotalPrice = priceAfterDaysAndAge * estimatedNumberOfDays;
    const daysOverUnderContract = priceCalculations.daysOverUnderContract(this.props.contract.startDate, this.props.contract.contractEndDate);
    const overduePenalty = priceCalculations.overduePenalty(daysOverUnderContract);
    const currentTotalPrice = estimatedTotalPrice + (overduePenalty * daysOverUnderContract * priceAfterDaysAndAge);
    const currentPricePerDay = priceCalculations.currentPricePerDay(overduePenalty, priceAfterDaysAndAge);

    return (
      <tr>
        <td>#</td>
        <td>
          {this.props.contract.__car__.brand}
          {' '}
          {this.props.contract.__car__.model}
        </td>
        <td>{this.props.contract.borrowerFirstName}</td>
        <th>
          {this.props.contract.borrowerLastName}
          {' '}
        </th>
        <td>{this.props.contract.startDate}</td>
        <td>{this.props.contract.contractEndDate}</td>
        <td>{estimatedNumberOfDays}</td>
        <td>
          {priceAfterDaysAndAge}
        </td>
        <td>{currentNumberOfDays}</td>
        <td>{daysOverUnderContract}</td>
        <td>{currentPricePerDay}</td>
        <td>{currentTotalPrice}</td>
        <td><Button variant="outline-success" onClick={this.handleClick} name={currentTotalPrice}>Return car</Button></td>
      </tr>
    );
  }
}


export default DashboardItem;
