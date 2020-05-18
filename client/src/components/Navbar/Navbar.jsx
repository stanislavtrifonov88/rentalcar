import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



class NavigationBarCars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Navbar" data-element="navbar">
        <div className="leftSideContainer">
        <a className="brandName" href="http://localhost:8000/">Awesome Cars</a>
        <div className="NavbarBtnContainer">
        <Link className="StandardLink" to="/" data-element="navbarHomeLink">Home</Link>
        <Link className="StandardLink" to="/dashboard" data-element="navbarDashboardLink">Dashboard</Link>
        </div>
        </div>
        <div className="rightSideContainer">
        </div>
      </div>
    );
  }
} 

export default NavigationBarCars;
