import React, { Component } from 'react';
import { Button, Well, Panel, Grid, FormControl, Row, Col, Table } from 'react-bootstrap'
// import { withAlert } from 'react-alert';

// makes it easy to reset the state of the page / clear the forms
const initialState = {
    newEntry: {
        name: "",
        description: "",
        unitOfMeasurement: "",
        price: "",
        category: "appetizer",
        dishes: []
    }
}

class Inventory extends Component {
  state = initialState;

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let entry = { ...this.state.newEntry }
    entry[item] = event.target.value
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
                          <th> Dishes </th>
                          <th> Category </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.inventory.map(entry => {
                          return (
                            <tr key={entry._id}>
                                <td> {entry.name} </td>
                                <td> {entry.description}</td>
                                <td> {entry.price + " per " + entry.unitOfMeasurement} </td>
                                <td> {entry.dishes} </td>
                                <td> {entry.category} </td>
                            </tr>)
                        })}
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
                              type="text" 
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
                            <Button
                              bsSize="small" 
                              bsStyle="info" 
                              onClick={() => alert("Add dishes!")}>
                              Dishes
                            </Button>
                          </td>

                          <td>
                            <FormControl
                              componentClass="select"
                              value={this.state.newEntry.category}
                              onChange={event => this.changeHandler(event,"category")}>
                                <option defaultValue
                                  value="appetizer"
                                  > Appetizer 
                                </option>
                                <option
                                  value="entree"
                                  > Entree
                                </option>
                                <option
                                  value="drink"
                                  > Drink
                                </option>
                                <option
                                  value="dessert"
                                  > Dessert
                                </option>
                                <option
                                  value="special"
                                  > Special
                                </option>
                            </FormControl>
                          </td>
                        </tr>
                      </tbody>
                  </Table>) 
                : null }

                <Button 
                  bsSize="large" 
                  bsStyle="info" 
                  onClick={this.newEntrySubmitHandler}> 
                  Submit 
                </Button>
              </Well>
            </Panel>
         </Col>
        </Row>
      </Grid>)
  }
}
export default Inventory;
