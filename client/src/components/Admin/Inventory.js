import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Well, Panel, Grid, FormControl, Row, Col, Table } from 'react-bootstrap'
import AutoSuggestWrapper from '../CustomInput/AutoSuggestWrapper';
import { EDIT_INVENTORY_ENTRY } from '../../constants/ModalTypes';
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
    inventory: PropTypes.instanceOf(Array),
    categories: PropTypes.instanceOf(Array)
  }

  state = initialState;

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let entry = { ...this.state.newEntry }
    entry[item] = event.target.value ? event.target.value : initialState.newEntry[item];
    this.setState({ newEntry: entry })
  }

  //submits new inventory entry
  newEntrySubmitHandler = () => {
    this.props.addInventoryEntry(this.state.newEntry);
    this.resetToInitialState();
  }

  resetToInitialState = () => {
    this.setState(initialState, function () {
      console.log('New Inventory Entry Successfully Submitted.');
    })
  }

  render() {

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Panel>
              <Well>
                { this.props.inventory ?
                  (<Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th> Name </th>
                          <th> Description </th>
                          <th> Price </th>
                          <th> Quantity </th>
                          <th> Dishes </th>
                          <th> Category </th>
                          <th> Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.inventory.map(entry => {
                          return (
                            <tr key={entry._id}>
                                <td> {entry.name} </td>
                                <td> {entry.description}</td>
                                <td> {entry.price + " per " + entry.unitOfMeasurement} </td>
                                <td> {entry.quantity} </td>
                                <td> {entry.dishes} </td>
                                <td> {entry.category} </td>
                                <td> 
                                  <Button 
                                    bsSize="small"
                                    bsStyle="info"
                                    onClick={() => this.props.showModal(EDIT_INVENTORY_ENTRY, {
                                      entry,
                                      categories: this.props.categories
                                    })}>
                                    edit
                                  </Button>
                                </td>
                            </tr>)
                          }
                        )}
                         <tr>
                          <td>
                            <FormControl
                              type="text" 
                              bsSize="small" 
                              value={this.state.newEntry.name} 
                              onChange={event => this.changeHandler(event, "name")} />
                          </td>
                          <td>
                            <FormControl 
                              type="text" 
                              bsSize="small" 
                              value={this.state.newEntry.description} 
                              onChange={event => this.changeHandler(event, "description")} />
                          </td>
                          <td>
                            <FormControl
                              type="number" 
                              bsSize="small" 
                              value={this.state.newEntry.price} 
                              onChange={event => this.changeHandler(event, "price")} />
                          
                            <FormControl
                                type="text" 
                                bsSize="small" 
                                value={this.state.newEntry.unitOfMeasurement} 
                                onChange={event => this.changeHandler(event, "unitOfMeasurement")} />
                          </td>
                          <td>
                            <FormControl
                              type="number"
                              bsSize="small"
                              value={this.state.newEntry.quantity} 
                              onChange={event => this.changeHandler(event, "quantity")} />
                          </td>
                          <td>
                            <Button
                              bsSize="small" 
                              onClick={() => alert("Add dishes!")}>
                              Dishes
                            </Button>
                          </td>
                          {this.props.categories ? 
                            (<td>
                              <AutoSuggestWrapper 
                                suggestions={this.props.categories}
                                value={this.state.newEntry.category}
                                changeHandler={this.changeHandler}
                              />
                            </td>) : null}
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
              </Well>
            </Panel>
         </Col>
        </Row>
      </Grid>)
  }
}
export default Inventory;
