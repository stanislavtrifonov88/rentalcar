import React from 'react';
import './Dashboard.css';
import DashboardItem from './DashboardItem/DashboardItem';
import fetchRequest from '../../services/Rest';
import { baseURL, contracts }from '../../services/restAPIs/restAPIs'
import Spinner from '../Spinner/Spinner';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      loading: false,
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

  onSubmit = (name, id) => {
    this.setState({ loading: true });
      fetchRequest(`${baseURL}/${contracts}/${id}`, 'PUT', {name})
      .then(response => 
        fetchRequest(`${baseURL}/${contracts}`)
        .then((result) => {
          this.setState({
            contracts: result,
            loading: false,
          });
        }));
  }


  render() {
    const contracts = this.state.contracts.map((contract) => <DashboardItem key={contract.id} contract={contract} onChildClick={this.onSubmit} />);
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
        <th>Current Days Rented</th>
        <th>Days Overdue</th>
        <th>Current Price | Day</th>
        <th>Current Total Price</th>
        <th>Return Car</th>
      </tr>
    </thead>
    <tbody className="dataRows">
      {contracts}
    </tbody>
  </table>
   
    if (loading) {
      table = <Spinner className="spinnerDashboard" />
    }

    return (
      <div className="dashboardContainer" data-element="dashboard">
        <h1>Rented Cars</h1>
        {table}
      </div>
    );
  }
}

export default Dashboard;