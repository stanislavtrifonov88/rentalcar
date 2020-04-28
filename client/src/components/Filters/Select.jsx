import React from 'react';
import Option from './Options';
import './Select.css';
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Select extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      opened: false,
    };
  }

  onOpen = () => {
    this.setState({
      opened: !this.state.opened,
    });
  }

  onSelect = (data) => {
    this.setState({
      selected: data.option,
      opened: false,
    }, () => {
    });
    this.props.onChildClick(data)
  }

  getOptions = () => {

    return this.props.options.map((item) => <Option className="optionItem" key={item} option={item} dataFilter={this.props.dataFilter} onSelect={this.onSelect}  />);
  }

  handleClick = (event) => {
    this.props.onChildClick(event.target.name, this.props.contract.id)
  }

  render() {
    const items = this.getOptions();
    const selected = this.state.selected
      ? this.state.selected : this.props.type;
    const showHideClass = this.state.opened ? 'show' : 'hide';

    return (
      <div className="select" onClick={this.onOpen}>
        <span className="filterItem">
          {selected}
        </span>
        <ul className={showHideClass}>{items}</ul>
        <FontAwesomeIcon className="filterItem" icon={faAngleDoubleDown} />
      </div>
    );
  }
}
