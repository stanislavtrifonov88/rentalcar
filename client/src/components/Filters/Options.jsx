import React from 'react';

export default class Option extends React.Component {

  onSelect = (e) => {
    e.preventDefault();
    this.props.onSelect(this.props.option);
  }

  render() {
    return (
      <li><a onClick={this.onSelect}>{this.props.option.value}</a></li>
    );
  }
}
