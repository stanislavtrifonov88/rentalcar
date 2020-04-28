import React from 'react';
import './SearchInput.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SearchInput extends React.Component {

  onValueChange = (event) => {

    this.props.update(event.target.value);
  }

  render() {
    return (
      <div className="searchContainer">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input
          className="searchInput"
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
