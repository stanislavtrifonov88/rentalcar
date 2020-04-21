import React from 'react';
import Option from './Options';
import './Select.css';

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

  onSelect = (option) => {
    this.setState({
      selected: option,
      opened: false,
    }, () => {
    });

    this.props.onChildClick(option)
  }

  getOptions = () => {
    return this.props.options.map((item) => <Option key={item.key} option={item} onSelect={this.onSelect}  />);
  }

  handleClick = (event) => {
    this.props.onChildClick(event.target.name, this.props.contract.id)
  }

  render() {
    const items = this.getOptions();
    const selected = this.state.selected
      ? this.state.selected.value : this.props.type;
    const cssClass = this.state.opened ? 'show' : 'hide';

    return (
      <div className="select" onClick={this.onOpen}>
        <span>
          {selected}
        </span>
        <ul className={cssClass}>{items}</ul>
      </div>
    );
  }
}
