import React from 'react';
import './Options.css';

export default class Option extends React.Component {

  onSelect = (e) => {
    e.preventDefault();
    const data = { option: this.props.option, dataAttribute: e.target.dataset.filtername  }
    this.props.onSelect(data);
    console.log(data)
  }

  render() {
    return (
      <li className="filterListItem">
        <button className="filterClickableRow" onClick={this.onSelect} data-filtername={this.props.dataFilter}>{this.props.option}</button>       
      </li>
    );
  }
}
