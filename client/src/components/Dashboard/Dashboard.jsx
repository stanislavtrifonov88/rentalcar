import React from 'react';
import './Dashboard.css';
import DashboardItem from './DashboardItem/DashboardItem';
import fetchRequest from '../../services/Rest';
import { baseURL, contracts }from '../../services/restAPIs/restAPIs'
import Spinner from '../Spinner/Spinner';
import { toastSuccess } from '../../services/toastify/toastify';
import SearchInput from '../SearchBar/SearchInput';
import {createList, applyFilters, applySearch } from '../Filters/filterFunctions';
import Select from '../Filters/Select';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      loading: false,
      filteredList: [],
      searchString: '',
      filterStrings: {
        brand: '',
        model: '',
      },
      filters: {
        brand: { isOpen: false },
        model: { isOpen: false },
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

//   filterList = (value) => {
//     const { contracts } = this.state
//     let searchValue = value.trim().toLowerCase();
//     let filteredList = contracts;
//     filteredList = filteredList.filter(item => {
//       if (item.brand.toLowerCase().search(searchValue) !== -1) {
//         return item.brand.toLowerCase().search(searchValue) !== -1;
//       } else if (item.model.toLowerCase().search(searchValue) !== -1) {
//         return item.model.toLowerCase().search(searchValue) !== -1;
//       } else if (item.borrowerFirstName.toLowerCase().search(searchValue) !== -1) {
//         return item.borrowerFirstName.toLowerCase().search(searchValue) !== -1;
//       } else if (item.borrowerLastName.toLowerCase().search(searchValue) !== -1) {
//         return item.borrowerLastName.toLowerCase().search(searchValue) !== -1;
//       }
//     });

//     this.setState({filteredList: filteredList});
//     this.setState({searchString: value});
// }

searchString = (value) => {
  this.setState({searchString: value});
}

filterBy = (data) => {
let { filterStrings } = this.state;
filterStrings[data.dataAttribute] = data.option.value
if (data.option.value === 'None') {
  filterStrings[data.dataAttribute] = ''
}

this.setState({ filterStrings });
}


  render() {
    // let { filteredList } = this.state
    // const { contracts } = this.state
    let { contracts, filterStrings, searchString } = this.state;
    contracts = applyFilters(contracts, filterStrings)
    console.log(contracts)
    contracts = applySearch(contracts, searchString, ['brand', 'model', 'borrowerFirstName', 'borrowerLastName'])
    console.log(contracts)
    const brandsList = createList(contracts, 'id', 'brand')
    const modelsList = createList(contracts, 'id', 'model')

    // if (filteredList.length === 0) {
    //   filteredList = contracts;
    // }
    const filteredContracts = contracts.map((contract) => <DashboardItem key={contract.id} contract={contract} onChildClick={this.onSubmit} />);
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
      {filteredContracts}
    </tbody>
  </table>
   
    if (loading) {
      table = <Spinner className="spinnerDashboard" />
    }

    return (
      <div className="dashboardContainer" data-element="dashboard">
        <h1>Rented Cars</h1>
        <div className="filterContainer">
        <SearchInput value={this.state.searchString} update={this.searchString} /> 
        <div className="availableDashboardFiltersContainer">
          <Select options={brandsList} onChildClick={this.filterBy} type={'Brand'} dataFilter={"brand"}/> 
          <Select options={modelsList} onChildClick={this.filterBy} type={'Model'} dataFilter={"model"}/>
        </div>
      </div>
        {table}
      </div>
    );
  }
}

export default Dashboard;