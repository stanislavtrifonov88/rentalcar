import React from 'react';
import './Options.css';

export default class Option extends React.Component {

  onSelect = (e) => {
    e.preventDefault();
    const data = { option: this.props.option, dataAttribute: e.target.dataset.filtername  }
    this.props.onSelect(data);
  }

  render() {
    return (
      <li className="filterListItem">
        <a onClick={this.onSelect} data-filtername={this.props.dataFilter}>{this.props.option.value}</a>       
      </li>
    );
  }
}
