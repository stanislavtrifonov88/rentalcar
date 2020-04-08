import React from 'react';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';
import DashboardItem from './DashboardItem/DashboardItem';
import fetchRequest from '../../services/Rest';
import { baseURL, contracts }from '../../services/restAPIs/restAPIs'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
    };
  }

  componentDidMount() {
    fetchRequest(`${baseURL}/${contracts}`)
      .then((result) => {
        this.setState({
          contracts: result,
        });
      });
  }

  onSubmit = (name, id) => {
      fetchRequest(`${baseURL}/${contracts}/${id}`, 'PUT', {name})
      .then(response => 
        fetchRequest(`${baseURL}/${contracts}`)
        .then((result) => {
          this.setState({
            contracts: result,
          });
        }));
  }


  render() {
    const contracts = this.state.contracts.map((contract) => <DashboardItem key={contract.id} contract={contract} onChildClick={this.onSubmit} />);

    return (
      <div className="dashboardContainer">
        <h1>Rented Cars</h1>
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
      </div>
    );
  }
}

export default Dashboard;