import React from 'react';
import PropTypes from 'prop-types';
import AvailableCarCard from './AvailableCarCard/AvailableCarCard';
import './AvailableCarsContainer.css';
import { fetchRequest } from '../../services/Rest';
import { baseURL } from '../../services/restAPIs/restAPIs';
import Spinner from '../Spinner/Spinner';
import SearchInput from '../SearchBar/SearchInput';
import Select from '../Filters/Select'
import {createList, applyFilters, applySearch } from '../Filters/filterFunctions';
import { observer } from 'mobx-react';

@observer
class AvailableCarsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      searchString: '',
      loading: false,
      filterStrings: {
        brand: '',
        model: '',
        className: '',
      },
      filters: {
        brand: { isOpen: false },
        class: { isOpen: false },
        model: { isOpen: false },
      },

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

searchString = (value) => {
    this.setState({searchString: value});
}

filterBy = (data) => {
  let { filterStrings } = this.state;
  filterStrings[data.dataAttribute] = data.option
  if (data.option === 'None') {
    filterStrings[data.dataAttribute] = ''
  }

  this.setState({ filterStrings});
}

  render() {
    let { cars, filterStrings, searchString } = this.state;
    cars = applyFilters(cars, filterStrings)
    cars = applySearch(cars, searchString, ['brand', 'model'])

    let cards = cars.map((car) => <AvailableCarCard key={car.id} car={car} onCheckout={this.onCheckout} />);
    const { loading } = this.state;
    if (loading) {
      cards = <Spinner />;
    }

    const brandsList = createList(cars,  'brand')
    const modelsList = createList(cars, 'model')
    const classesList = createList(cars, 'className')

    return (
      <div className="container" data-element="allAvailableCarsContainer">
        <h1> Currently Available Cars</h1>
        <div className="filterContainer">
        <SearchInput value={this.state.searchString} update={this.searchString} /> 
        <div className="availableCarsFiltersContainer">
          <Select id="className" options={classesList} onChildClick={this.filterBy} type={'Class'} dataFilter={"className"}/>
          <Select options={brandsList} onChildClick={this.filterBy} type={'Brand'} dataFilter={"brand"}/> 
          <Select options={modelsList} onChildClick={this.filterBy} type={'Model'} dataFilter={"model"}/>
        </div>
      </div>
        <div className="row">
          {cards}
        </div>
        </div>
    );
  }
}

AvailableCarsContainer.propTypes = {
  word: PropTypes.exact({
    searchWord: PropTypes.string,
  }),
};

AvailableCarsContainer.defaultProps = {
  word: PropTypes.exact({
    searchWord: '',
  }),
};

export default AvailableCarsContainer;
