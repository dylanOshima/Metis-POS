import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { hideModal } from '../../../actions/ModalActions';
import AutoSuggestWrapper from '../../CustomInput/AutoSuggestWrapper';
import { 
  updateInventoryEntry,
  deleteInventoryEntry
} from '../../../actions/InventoryActions';

/**
 * @param {object:props} contains:
 *   @param {object:entry} contains information on the entry
 */

class AdminEntry extends Component {

  state = Object.assign({}, this.props.entry);

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
            <Modal.Dialog>
                <Modal.Header>
                  Updating <b>{this.state.name}</b> 
                </Modal.Header>
                <Modal.Body>
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
                        Dishes
                      </Col>
                      <Col sm={2}>
                        <Button
                          bsSize="small" 
                          onClick={() => alert("Add dishes!")}>
                          Dishes
                        </Button>
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
  hideModal,
  updateInventoryEntry,
  deleteInventoryEntry
})(AdminEntry);