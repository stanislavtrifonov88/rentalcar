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
        <a className="brandName" href="http://localhost:8000/">Awesome Cars</a>
        <div className="NavbarBtnContainer">
        <Link className="StandardLink" onClick={() => this.props.onSearch('')} to="/" data-element="navbarHomeLink">Home</Link>
        <Link className="StandardLink" to="/dashboard" data-element="navbarDashboardLink">Dashboard</Link>
        </div>
        </div>
        <div className="rightSideContainer">
        </div>
      </div>
    );
  }
} 

const mapDispatchToProps = (dispatch) => ({
  onSearch: (searchedWord) => dispatch({ type: SEARCH_WORD, searchedWord: searchedWord }),
});

export default connect(null, mapDispatchToProps)(NavigationBarCars);
