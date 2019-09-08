import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, Col, Row, ControlLabel } from 'react-bootstrap';
import AutoSuggestWrapper from '../../CustomInput/AutoSuggestWrapper';
import MultiPicker from '../AdminModals/MultiPicker';
import { updateInventoryEntry, deleteInventoryEntry } from '../../../actions/InventoryActions';
import { showModal } from '../../../actions/ModalActions';

/**
 * @param {object:props} contains:
 *   @param {object:entry} contains information on the entry
 */

class AdminEntry extends Component {

  state = Object.assign({}, this.props.entry);

  updateDishHandler = (dish) => {
    let newEntry = { ...this.state };

    // update dish
    let _dish = {
      _id: dish._id,
      name: dish.name
    }

    // Check if dish already exists
    if(newEntry.dishes.findIndex(dish => dish._id === _dish._id) < 0) {
      let dishes = [...newEntry.dishes, _dish];
      
      // propagate changes
      this.setState({ dishes });
      this.props.updateModal({selected: newEntry.dishes});
    }
  }

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let entry = { ...this.props.newEntry };
    entry[item] = event.target.value ? event.target.value : "";
    this.setState(entry);
  }

  submitEntry = () => {
    this.props.updateInventoryEntry(this.state);
    this.props.hideModal();
  }

  deleteEntry = () => {
    this.props.deleteInventoryEntry(this.state._id);
    this.props.hideModal();
  }

  render() {
    
    return(
        <div>
            <Modal.Dialog bsSize="large">
                <Modal.Header>
                  Updating <b>{this.state.name}</b> 
                </Modal.Header>
                <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                  <Form horizontal>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Name
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          type="text" 
                          bsSize="small" 
                          value={this.state.name} 
                          onChange={event => this.changeHandler(event, "name")} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Description
                      </Col>
                      <Col sm={10}>
                        <FormControl 
                          type="text" 
                          bsSize="small" 
                          value={this.state.description} 
                          onChange={event => this.changeHandler(event, "description")} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Quantity
                      </Col>
                      <Col sm={2}>
                        <FormControl
                          type="number"
                          bsSize="small"
                          value={this.state.quantity ? this.state.quantity : 0} 
                          onChange={event => this.changeHandler(event, "quantity")} />
                      </Col>
                      <Col componentClass={ControlLabel} sm={1}>
                        Price
                      </Col>
                      <Col sm={2}>
                        <FormControl
                          type="number" 
                          bsSize="small" 
                          value={this.state.price} 
                          onChange={event => this.changeHandler(event, "price")} />
                      </Col>

                      <Col componentClass={ControlLabel} sm={1}>
                        Unit
                      </Col>
                      <Col sm={2}>
                        <FormControl
                            type="text" 
                            bsSize="small" 
                            value={this.state.unitOfMeasurement} 
                            onChange={event => this.changeHandler(event, "unitOfMeasurement")} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Category
                      </Col>
                      <Col sm={8}>
                        <AutoSuggestWrapper
                          suggestions={this.props.categories}
                          value={this.state.category}
                          changeHandler={this.changeHandler}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <MultiPicker
                        haveTitles={false}
                        embedded
                        selected={this.state.dishes}
                        title={"Update Dishes"}
                        updateSelected={this.updateDishHandler}
                      />
                    </FormGroup>
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button bsStyle="success" onClick={this.submitEntry}>Submit</Button>
                  <Button bsStyle="danger" onClick={this.deleteEntry}>Delete</Button>
                  <Button onClick={this.props.hideModal}>Cancel</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>)
  }
}

export default connect(null, { 
  updateInventoryEntry,
  deleteInventoryEntry,
  showModal
})(AdminEntry);