import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvailableCarCard from './AvailableCarCard/AvailableCarCard';
import './AvailableCarsContainer.css';
import fetchRequest from '../../services/Rest';
import { baseURL } from '../../services/restAPIs/restAPIs';
import Spinner from '../Spinner/Spinner';
import SearchInput from '../SearchBar/SearchInput';
import Select from '../Filters/Select'
import {createList, filterByCriteria } from '../Filters/filterFunctions';

class AvailableCarsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      filteredList: [],
      searchString: '',
      loading: false,
      filters: {
        brand: { isOpen: false },
        model: { isOpen: false },
        class: { isOpen: false },
      }
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchRequest(`${baseURL}/cars`)
      .then((result) => {
        this.setState({
          cars: result,
          loading: false,
        });
      });
  }

  onCheckout = (id) => {
    this.props.history.push({pathname: `/cars/${id}`})
  }

  filterList = (value) => {
    const { cars } = this.state
    let searchValue = value.trim().toLowerCase();
    let filteredList = cars;

    filteredList = filteredList.filter(item => {
      if (item.brand.toLowerCase().search(searchValue) !== -1) {
        return item.brand.toLowerCase().search(searchValue) !== -1;
      } else if (item.model.toLowerCase().search(searchValue) !== -1) {
        return item.model.toLowerCase().search(searchValue) !== -1;
      }
    });

    this.setState({filteredList: filteredList});
    this.setState({searchString: value});
}

filterByBrand = (criteria) => {

  let { filteredList } = this.state;
  const { cars } = this.state
  filteredList = filterByCriteria(filteredList, cars, criteria, 'brand')

  this.setState({filteredList});
}

filterByModel = (criteria) => {
  let { filteredList } = this.state;
  const { cars } = this.state
  filteredList = filterByCriteria(filteredList, cars, criteria, 'model')

  this.setState({filteredList});
}

filterByClass = (criteria) => {

  let { filteredList } = this.state;
  const { cars } = this.state
  filteredList = filterByCriteria(filteredList, cars, criteria, 'className')

  this.setState({filteredList});
}


  render() {
    const { cars } = this.state;
    let { filteredList } = this.state;
    if (filteredList.length === 0) {
      filteredList = cars;
    }

    let cards = filteredList.map((car) => <AvailableCarCard key={car.id} car={car} onCheckout={this.onCheckout} />);
    const { loading } = this.state;
    if (loading) {
      cards = <Spinner />;
    }

    const brandsList = createList(filteredList, 'id', 'brand')
    const modelsList = createList(filteredList, 'id', 'model')
    const classesList = createList(filteredList, 'id', 'className')


    return (
      <div className="container" data-element="allAvailableCarsContainer">
        <h1> Currently Available Cars</h1>
        <div className="filterContainer">
        <SearchInput value={this.state.searchString} update={this.filterList} /> 
        <div>
          <Select options={classesList} onChildClick={this.filterByClass} type={'Class'} />
          <Select options={brandsList} onChildClick={this.filterByBrand} type={'Brand'}/> 
         <Select options={modelsList} onChildClick={this.filterByModel} type={'Model'} />
        </div>
      </div>
        <div className="row">
          {cards}
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  word: state.searchWord,
});


AvailableCarsContainer.propTypes = {
  word: PropTypes.exact({
    searchWord: PropTypes.string,
  }),
};

AvailableCarsContainer.defaultProps = {
  word: PropTypes.exact({
    searchWord: 'Ford',
  }),
};

export default connect(mapStateToProps, null)(AvailableCarsContainer);
