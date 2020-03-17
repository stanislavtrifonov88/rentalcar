import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvailableCarCard from './AvailableCarCard/AvailableCarCard';
import './AvailableCarsContainer.css';

class AvailableCarsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/cars')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cars: result,
        });
      });
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

    const cards = filteredCars.map((car) => <AvailableCarCard key={car.id} car={car} />);

    return (
      <div className="container">
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
