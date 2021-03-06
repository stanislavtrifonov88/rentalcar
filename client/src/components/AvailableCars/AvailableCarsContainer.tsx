import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import AvailableCarCard from './AvailableCarCard/AvailableCarCard.tsx';
import './AvailableCarsContainer.css';
import { fetchRequest } from '../../services/restAPIs/restRequests';
import { baseURL } from '../../services/restAPIs/restAPIs';
import Spinner from '../Spinner/Spinner';
import SearchInput from '../SearchBar/SearchInput.tsx';
import Select from '../Filters/Select.tsx';
import applyFilters from '../../services/filters/applyFilters';
import applySearch from '../../services/filters/applySearch';
import createList from '../../services/filters/createList';

@inject('availableCarStore')
@observer
class AvailableCarsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.availableCarStore;
  }

  componentDidMount() {
    this.store.loading = true;
    fetchRequest(`${baseURL}/cars`)
      .then((result) => {
        this.store.loading = false;
        this.store.cars = result;
      });
  }

  onCheckout = (id) => {
    this.props.history.push({ pathname: `/cars/${id}` });
  }

searchString = (value) => {
  this.store.searchString = value;
}

filterBy = (data) => {
  const { filterStrings } = this.store;
  filterStrings[data.dataAttribute] = data.option;
  if (data.option === 'None') {
    filterStrings[data.dataAttribute] = '';
  }
}

render() {
  let { cars } = this.store;
  const { loading, searchString, filterStrings } = this.store;
  cars = applyFilters(cars, filterStrings);
  cars = applySearch(cars, searchString, ['brand', 'model']);

  let cards = cars.map((car) => <AvailableCarCard key={car.id} car={car} onCheckout={this.onCheckout} />);

  if (loading) {
    cards = <Spinner />;
  }

  const brandsList = createList(cars, 'brand');
  const modelsList = createList(cars, 'model');
  const classesList = createList(cars, 'className');

  return (
    <div className="container" data-element="allAvailableCarsContainer">
      <h1> Currently Available Cars</h1>
      <div className="filterContainer">
        <SearchInput value={searchString} update={this.searchString} />
        <div className="availableCarsFiltersContainer">
          <Select id="className" options={classesList} onChildClick={this.filterBy} type="Class" dataFilter="className" />
          <Select options={brandsList} onChildClick={this.filterBy} type="Brand" dataFilter="brand" />
          <Select options={modelsList} onChildClick={this.filterBy} type="Model" dataFilter="model" />
        </div>
      </div>
      <div className="row">
        {cards}
      </div>
    </div>
  );
}
}

// AvailableCarsContainer.propTypes = {
//   word: PropTypes.exact({
//     searchWord: PropTypes.string,
//   }),
// };

// AvailableCarsContainer.defaultProps = {
//   word: PropTypes.exact({
//     searchWord: '',
//   }),
// };

export default AvailableCarsContainer;
