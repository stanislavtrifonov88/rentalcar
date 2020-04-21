import React from 'react';
import './SearchInput.css'

export default class SearchInput extends React.Component {
  constructor() {
    super();
  }

  onValueChange = (event) => {

    this.props.update(event.target.value);
  }

  render() {
    return (
      <div className="search-input">
        <input
          id="input"
          onChange={this.onValueChange}
          value={this.props.value}
          type="text"
          placeholder="Search here..."
        />
      </div>
    );
  }
}
