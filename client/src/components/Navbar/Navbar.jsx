import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { connect } from 'react-redux';
import SEARCH_WORD from '../redux/actionTypes';


class NavigationBarCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
    }
  }

  onInputChange = (event) => {
    this.setState({
      searchWord: event.target.value,
    })
  }

  render() {
    return (
      <div className="Navbar" data-element="navbar">
        <div className="leftSideContainer">
        <p className="brandName" href="/">Awesome Cars</p>
        <div className="NavbarBtnContainer">
        <Link className="StandardLink" onClick={() => this.props.onSearch('')} to="/" data-element="navbarHomeLink">Home</Link>
        <Link className="StandardLink" to="/dashboard" data-element="navbarDashboardLink">Dashboard</Link>
        </div>
        </div>
        <div className="rightSideContainer">
       <input className="SearchField" type="text"  placeholder="Search here" data-name="searchWord"  onChange={this.onInputChange}></input>
       <Link className="SearchBtn" onClick={() => this.props.onSearch(this.state.searchWord)} to="/" data-element="navbarSearchBtn">Search</Link>
        </div>
      </div>
    );
  }
} 

const mapDispatchToProps = (dispatch) => ({
  onSearch: (searchedWord) => dispatch({ type: SEARCH_WORD, searchedWord: searchedWord }),
});

export default connect(null, mapDispatchToProps)(NavigationBarCars);
