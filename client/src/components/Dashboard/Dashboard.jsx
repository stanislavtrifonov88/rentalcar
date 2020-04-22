import React from 'react';
import './Dashboard.css';
import DashboardItem from './DashboardItem/DashboardItem';
import fetchRequest from '../../services/Rest';
import { baseURL, contracts }from '../../services/restAPIs/restAPIs'
import Spinner from '../Spinner/Spinner';
import { toastSuccess } from '../../services/toastify/toastify';
import SearchInput from '../SearchBar/SearchInput';
import {createList, filterByCriteria } from '../Filters/filterFunctions';
import Select from '../Filters/Select';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      loading: false,
      filteredList: [],
      searchString: '',
      filters: {
        brand: { isOpen: false },
        model: { isOpen: false },
        class: { isOpen: false },
      }
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchRequest(`${baseURL}/${contracts}`)
      .then((result) => {
        this.setState({
          contracts: result,
          loading: false,
        });
      });
  }

  onSubmit = ({}, id) => {
    this.setState({ loading: true });
      fetchRequest(`${baseURL}/${contracts}/${id}`, 'PUT', {})
      .then(response => 
        fetchRequest(`${baseURL}/${contracts}`)
        .then((result) => {
          this.setState({
            contracts: result,
            loading: false,
          });
          toastSuccess("Car successfully returned")
        }));
  }

  filterList = (value) => {
    const { contracts } = this.state
    let searchValue = value.trim().toLowerCase();
    let filteredList = contracts;
    filteredList = filteredList.filter(item => {
      if (item.brand.toLowerCase().search(searchValue) !== -1) {
        return item.brand.toLowerCase().search(searchValue) !== -1;
      } else if (item.model.toLowerCase().search(searchValue) !== -1) {
        return item.model.toLowerCase().search(searchValue) !== -1;
      } else if (item.borrowerFirstName.toLowerCase().search(searchValue) !== -1) {
        return item.borrowerFirstName.toLowerCase().search(searchValue) !== -1;
      } else if (item.borrowerLastName.toLowerCase().search(searchValue) !== -1) {
        return item.borrowerLastName.toLowerCase().search(searchValue) !== -1;
      }
    });

    this.setState({filteredList: filteredList});
    this.setState({searchString: value});
}

filterByBrand = (criteria) => {

  let { filteredList } = this.state;
  const { contracts } = this.state
  filteredList = filterByCriteria(filteredList, contracts, criteria, 'brand')

  this.setState({filteredList});
}

filterByModel = (criteria) => {
  let { filteredList } = this.state;
  const { contracts } = this.state
  filteredList = filterByCriteria(filteredList, contracts, criteria, 'model')

  this.setState({filteredList});
}

  render() {
    let { filteredList } = this.state
    const { contracts } = this.state

    if (filteredList.length === 0) {
      filteredList = contracts;
    }
    const contracts1 = filteredList.map((contract) => <DashboardItem key={contract.id} contract={contract} onChildClick={this.onSubmit} />);
    const { loading } = this.state;
    let table = <table className="dashboarTable">
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
      {contracts1}
    </tbody>
  </table>
   
    if (loading) {
      table = <Spinner className="spinnerDashboard" />
    }

    const brandsList = createList(filteredList, 'id', 'brand')
    const modelsList = createList(filteredList, 'id', 'model')


    return (
      <div className="dashboardContainer" data-element="dashboard">
        <h1>Rented Cars</h1>
        <div className="filterContainer">
        <SearchInput value={this.state.searchString} update={this.filterList} /> 
        <div className="availableDashboardFiltersContainer">
          <Select options={brandsList} onChildClick={this.filterByBrand} type={'Brand'}/> 
          <Select options={modelsList} onChildClick={this.filterByModel} type={'Model'} />
        </div>
      </div>
        {table}
      </div>
    );
  }
}

export default Dashboard;