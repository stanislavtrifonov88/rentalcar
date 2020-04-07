import React from 'react';
import {
  Button, Navbar, Form, FormControl, Nav,
} from 'react-bootstrap';
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
      <div className="Navbar">
        <div className="leftSideContainer">
        <p className="brandName" href="/home">Awesome Cars</p>
        <div className="NavbarBtnContainer">
        <Link className="StandardLink" onClick={() => this.props.onSearch('')} to="/home">Home</Link>
        <Link className="StandardLink" to="/dashboard">Dashboard</Link>
        </div>
        </div>
        <div className="rightSideContainer">
       <input className="SearchField" type="text"  placeholder="Search here" data-name="searchWord"  onChange={this.onInputChange}></input>
       <Link className="SearchBtn" onClick={() => this.props.onSearch(this.state.searchWord)} to="/home">Search</Link>
        </div>
      </div>
    );
  }
} 

const mapDispatchToProps = (dispatch) => ({
  onSearch: (searchedWord) => dispatch({ type: SEARCH_WORD, searchedWord: searchedWord }),
});

export default connect(null, mapDispatchToProps)(NavigationBarCars);
