import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Table, FormControl, Button, ControlLabel } from 'react-bootstrap';

class InventoryHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: "",
      value: "",
      price: "",
    }
  }

  static propTypes = {
    selectedHandler: PropTypes.func,
    addHistoryItem: PropTypes.func,
    item: PropTypes.object,
  }

  // componentDidMount = _ => {
  //   this.props.item.history.sort((item1, item2) => {
  //     return item1.date > item2.date;
  //   })
  //   // console.log(this.history);
  // }

  handleClick = (e) => {

  }

  changeHandler = (value, property) => {
    let changes = {};
    changes[property] = value;
    this.setState(changes);
  }

  validateEntry = _ => {
    let inputDate = (new Date(this.state.date)).getTime();
    if(this.state.price < 0) {
      console.error("price is negative");
      return false;
    } else if(this.state.value < 0) {
      console.error("value is negative ");
      return false;
    } else if(inputDate > Date.now()) {
      console.error("date is in the future");
      return false;
    } else {
      return true
    }
  }

  handleSubmit = _ => {
    if(this.validateEntry(this.state)) {
      Object.assign(this.state, {
        date: (new Date(this.state.date)).getTime(),
      });
      this.props.addHistoryItem(this.state);
    }
  }

  render() {
    let { unitOfMeasurement, history } = this.props.item;

    return (<div style={{
      'margin':'0em 3em',
      'padding':'1em',
      }}>
        <ControlLabel style={{'margin':'1em auto'}}>Purchase History</ControlLabel>
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount Purchased</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history ? history.map((item, index) => {
              let date = new Date(item.date);
              return (<tr key={index} onClick={this.handleClick}>
                <td>{date.toLocaleDateString()}</td>
                <td>{item.value + ' per ' + unitOfMeasurement}</td>
                <td>{'₱'+item.price}</td>
                <td>
                  <Button bsStyle="danger" onClick={_ => this.props.removeHistoryItem(index)}>
                    <Glyphicon glyph="trash" />
                  </Button>
                </td>
              </tr>)
            }): "Loading history..."}
            {/* Input form */}
            <tr>
              <td>
                <FormControl
                  componentClass="input"
                  type="date"
                  bsSize="small"
                  placeholder={(new Date(Date.now())).toLocaleDateString()}
                  onChange={(e) => this.changeHandler(e.target.value, "date")}/>
              </td>
              <td>
                <FormControl
                  componentClass="input"
                  type="number" 
                  bsSize="small"
                  placeholder="quantity"
                  onChange={(e) => this.changeHandler(e.target.value, "value")}/>
              </td>
              <td>
                <FormControl
                  componentClass="input"
                  type="number" 
                  bsSize="small"
                  placeholder="price"
                  onChange={(e) => this.changeHandler(e.target.value, "price")}/>
              </td>
              <td>
              <Button bsStyle="default" onClick={this.handleSubmit}>
                <Glyphicon glyph="plus" />
              </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <Button
                  block
                  type="submit"
                  bsSize="small" 
                  bsStyle="success"> 
                  New 
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
    </div>)
  }
}

export default InventoryHistory;