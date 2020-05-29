import React from 'react';
import './Dashboard.css';
import { observer, inject } from 'mobx-react';
import DashboardItem from './DashboardItem/DashboardItem';
import { fetchRequest } from '../../services/restAPIs/restRequests';
import { baseURL, contracts } from '../../services/restAPIs/restAPIs';
import Spinner from '../Spinner/Spinner';
import { toastSuccess } from '../../services/toastify/toastify';
import SearchInput from '../SearchBar/SearchInput';
import applyFilters from '../../services/filters/applyFilters';
import applySearch from '../../services/filters/applySearch';
import createList from '../../services/filters/createList';
import Select from '../Filters/Select';

@inject('dashboardStore')
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.dashboardStore;
  }

  componentDidMount() {
    this.store.loading = true;
    fetchRequest(`${baseURL}/${contracts}`)
      .then((result) => {
        this.store.contracts = result;
        this.store.loading = false;
      });
  }

  onSubmit = (id) => {
    this.store.loading = true;
    fetchRequest(`${baseURL}/${contracts}/${id}`, 'PUT', {})
      .then((response) => fetchRequest(`${baseURL}/${contracts}`)
        .then((result) => {
          this.store.contracts = result;
          this.store.loading = false;
          toastSuccess('Car successfully returned');
        }));
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

  this.store.filterStrings = filterStrings;
}


render() {
  let { contracts } = this.store;
  const { loading, filterStrings, searchString } = this.store;
  contracts = applyFilters(contracts, filterStrings);
  contracts = applySearch(contracts, searchString, ['brand', 'model', 'firstName', 'lastName']);
  const brandsList = createList(contracts, 'brand');
  const modelsList = createList(contracts, 'model');

  const filteredContracts = contracts.map((contract) => <DashboardItem key={contract.id} contract={contract} onChildClick={this.onSubmit} />);

  let table = (
    <table className="dashboarTable">
      <thead>
        <tr className="headerRow">
          <th className="rowLength1">Car</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th className="rowLength1">From</th>
          <th className="rowLength1">Return Date</th>
          <th>Days Rented</th>
          <th>Price | Day</th>
          <th>Estimated Total Price</th>
          <th>Current Days Rented</th>
          <th>Days Overdue</th>
          <th>Current Price | Day</th>
          <th>Current Total Price</th>
          <th>Return Car</th>
        </tr>
      </thead>
      <tbody className="dataRows">
        {filteredContracts}
      </tbody>
    </table>
  );

  if (loading) {
    table = <Spinner className="spinnerDashboard" />;
  }

  return (
    <div className="dashboardContainer" data-element="dashboard">
      <h1>Rented Cars</h1>
      <div className="filterContainer">
        <SearchInput value={searchString} update={this.searchString} />
        <div className="availableDashboardFiltersContainer">
          <Select options={brandsList} onChildClick={this.filterBy} type="Brand" dataFilter="brand" />
          <Select options={modelsList} onChildClick={this.filterBy} type="Model" dataFilter="model" />
        </div>
      </div>
      <div className="tableContainer">
        {table}
      </div>
    </div>
  );
}
}

export default Dashboard;
