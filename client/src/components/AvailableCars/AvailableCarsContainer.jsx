import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvailableCarCard from './AvailableCarCard/AvailableCarCard';
import './AvailableCarsContainer.css';
import fetchRequest from '../../services/Rest';
import { baseURL } from '../../services/restAPIs/restAPIs';
import Spinner from '../Spinner/Spinner';

class AvailableCarsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      loading: false,
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
    console.log(id)
    this.props.history.push({pathname: `/cars/${id}`})
  }

  render() {
    const { cars } = this.state;
    const { word } = this.props;
    const { searchWord } = word;
    let filteredCars = null;
    if (searchWord !== '') {
      filteredCars = cars.filter((car) => searchWord === car.brand);
    } else {
      filteredCars = cars;
    }


    let cards = filteredCars.map((car) => <AvailableCarCard key={car.id} car={car} onCheckout={this.onCheckout} />);
    const { loading } = this.state;
    if (loading) {
      cards = <Spinner />;
    }

    return (
      <div className="container" data-element="allAvailableCarsContainer">
        <h1> Currently Available Cars</h1>
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
