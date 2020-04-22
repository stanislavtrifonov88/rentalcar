import React from 'react';
import './Options.css';

export default class Option extends React.Component {

  onSelect = (e) => {
    e.preventDefault();
    this.props.onSelect(this.props.option);
  }

  render() {
    return (
      <li className="filterListItem">
        <a onClick={this.onSelect}>{this.props.option.value}</a>       
      </li>
    );
  }
}
