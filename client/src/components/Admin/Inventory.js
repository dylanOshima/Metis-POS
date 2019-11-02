import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Well, Panel, Grid, FormControl, Row, Col, Table } from 'react-bootstrap'
import AutoSuggestWrapper from '../CustomInput/AutoSuggestWrapper';
import { EDIT_INVENTORY_ENTRY, OPEN_MULTI_PICKER } from '../../constants/ModalTypes';
// import { withAlert } from 'react-alert';

// makes it easy to reset the state of the page / clear the forms
const initialState = {
  newEntry: {
      name: "",
      description: "",
      price: "",
      unitOfMeasurement: "",
      quantity: 0,
      category: "",
      dishes: []
  }
}

class Inventory extends Component {
  static propTypes = {
    addInventoryEntry: PropTypes.func,
    updateModal: PropTypes.func,
    inventory: PropTypes.instanceOf(Array),
    dishCategories: PropTypes.instanceOf(Array),
    inventoryCategories: PropTypes.instanceOf(Array),
  }

  state = initialState;

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let entry = { ...this.state.newEntry }
    entry[item] = event.target.value ? event.target.value : initialState.newEntry[item];
    this.setState({ newEntry: entry })
  }

  // Used in dishes modal for adding new dishes,
  // Takes a dish and propogates changes
  multipickerHandler = (dishes) => {    
    let newEntry = Object.assign({}, this.state.newEntry, { dishes })

    this.setState({newEntry});
    this.props.updateModal({selected: newEntry.dishes});
  }

  displayDishes = dishes => {
    if(!dishes.length) {return ""}
    let out = dishes[0].name,
        i = 1;
    while(i < dishes.length && out.length < 35) {
      out += ", " + dishes[i].name;
      i++;
    }
    return out
  }

  validInput = (entry) => {
    return entry.name && entry.price && entry.unitOfMeasurement && entry.quantity && entry.category;
  };

  //submits new inventory entry
  newEntrySubmitHandler = () => {
    if(!this.validInput(this.state.newEntry)) {
      console.error("Invalid input");
      return false;
    }
    this.props.addInventoryEntry(this.state.newEntry);
    this.resetToInitialState();
  }

  resetToInitialState = () => {
    this.setState(initialState, function () {
      console.log('New Inventory Entry Successfully Submitted.');
    })
  }

  render() {
    let { newEntry } = this.state;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
                { this.props.inventory ?
                  (<Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th> Name </th>
                          <th> Description </th>
                          <th> Price </th>
                          <th> Quantity </th>
                          <th> Category </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Inventory items */}
                        {this.props.inventory.map(entry => {
                          return (
                            <tr 
                              key={entry._id} 
                              onClick={() => this.props.showModal(EDIT_INVENTORY_ENTRY, { entry })}>
                                <td> {entry.name} </td>
                                <td> {entry.description}</td>
                                <td> {`₱${entry.price} per ${entry.unitOfMeasurement}`} </td>
                                <td> {entry.quantity} </td>
                                <td> {entry.category} </td>
                            </tr>)
                          }
                        )}
                        {/* Add new inventory item */}
                         <tr>
                          <td>
                            <FormControl
                              type="text"
                              bsSize="small"
                              placeholder="item name"
                              value={newEntry.name ? newEntry.name : undefined} 
                              onChange={event => this.changeHandler(event, "name")} />
                          </td>
                          <td>
                            <FormControl 
                              type="text"
                              bsSize="small"
                              placeholder="description"
                              value={newEntry.description ? newEntry.description : undefined} 
                              onChange={event => this.changeHandler(event, "description")} />
                          </td>
                          <td>
                            <FormControl
                              style={{width: "5em", float:"left"}}
                              type="number" 
                              bsSize="small"
                              placeholder="75.5"
                              value={newEntry.price ? newEntry.price : undefined} 
                              onChange={event => this.changeHandler(event, "price")} />
                          
                            <FormControl
                                style={{width: "3em", float:"left"}}
                                type="text" 
                                bsSize="small" 
                                placeholder="kg"
                                value={newEntry.unitOfMeasurement ? newEntry.unitOfMeasurement : undefined} 
                                onChange={event => this.changeHandler(event, "unitOfMeasurement")} />
                          </td>
                          <td>
                            <FormControl
                              type="number"
                              bsSize="small"
                              placeholder="1"
                              value={newEntry.quantity ? newEntry.quantity : undefined} 
                              onChange={event => this.changeHandler(event, "quantity")} />
                          </td>
                          <td>
                            {this.props.inventoryCategories ? 
                              <AutoSuggestWrapper 
                                suggestions={this.props.inventoryCategories}
                                value={newEntry.category}
                                changeHandler={this.changeHandler}
                            />: null}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Button 
                              bsSize="small" 
                              bsStyle="info" 
                              onClick={this.newEntrySubmitHandler}> 
                              Submit 
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                  </Table>) 
                : null }
         </Col>
        </Row>
      </Grid>)
  }
}
export default Inventory;
