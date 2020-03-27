import React from 'react';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';
import DashboardItem from './DashboardItem/DashboardItem';
import rest from '../../services/Rest';
import { baseURL, contracts }from '../../services/restAPIs/restAPIs'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
    };
  }

  componentDidMount() {
    rest.get(`${baseURL}/${contracts}`)
      .then((result) => {
        this.setState({
          contracts: result,
        });
      });
  }

  onSubmit = (name, id) => {
      rest.post(`${baseURL}/${contracts}/${id}`,{name})
      .then(response => 
        rest.get(`${baseURL}/${contracts}`)
        .then((result) => {
          this.setState({
            contracts: result,
          });
        }))
  }


  render() {
    const contracts = this.state.contracts.map((contract) => <DashboardItem key={contract.id} contract={contract} onChildClick={this.onSubmit} />);

    return (
      <div className="dashboardContainer">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Car</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>From</th>
              <th>Estimated Return Date</th>
              <th>Estimated Days Rented</th>
              <th>Estimated Price per Day</th>
              <th>Current Days Rented</th>
              <th>Days Overdue</th>
              <th>Current Price per Day</th>
              <th>Current Total Price</th>
              <th>Return Car</th>
            </tr>
          </thead>
          <tbody>
            {contracts}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Dashboard;
