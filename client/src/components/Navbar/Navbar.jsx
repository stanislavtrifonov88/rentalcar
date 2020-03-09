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
    console.log(this.state.searchWord)
  }

  


  render() {
    return (
      <Navbar className="Navbar" bg="dark" variant="dark">
        <Navbar.Brand className="brand" href="/home">Awesome Cars</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button className="carsPage" variant="link" onClick={() => this.props.onSearch('')}><Link to="/home">Cars</Link></Button>
            <Button variant="link"><Link to="/dashboard">Dashboard</Link></Button>
          </Nav>
          <Form inline id="searchForm">
            <FormControl className="searchInput" type="text" placeholder="Search" className="mr-sm-2" data-name="searchWord"  onChange={this.onInputChange} />
            <Button className="searchBtn" variant="outline-success" onClick={() => this.props.onSearch(this.state.searchWord)}><Link to="/home">Search</Link></Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
} 


const mapDispatchToProps = (dispatch) => ({
  onSearch: (searchedWord) => dispatch({ type: SEARCH_WORD, searchedWord: searchedWord }),
});

export default connect(null, mapDispatchToProps)(NavigationBarCars);
