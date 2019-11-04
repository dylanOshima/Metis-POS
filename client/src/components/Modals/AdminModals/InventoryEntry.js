import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import AutoSuggestWrapper from '../../CustomInput/AutoSuggestWrapper';
import InventoryHistory from '../AdminModals/HistoryView';
import { updateInventoryEntry, deleteInventoryEntry, updateInventoryHistory } from '../../../actions/InventoryActions';

/**
 * @param {object:props} contains:
 *   @param {object:entry} contains information on the entry
 */

class InventoryEntry extends Component {

  state = Object.assign({}, this.props.entry);

  /* HISTORY HANDLERS */
  addHistory = newItem => {
    let obj = {
      history: [newItem],
      _id: this.state._id,
    }
    this.props.updateInventoryHistory(obj);
    // Todo: change this to reload upon receiving update
    this.setState({ 
      history: [...this.state.history, newItem],
      quantity: this.state.quantity += newItem.value,
      price: newItem.price,
    });
    this.props.updateModal({item: this.state});
  }

  removeHistory = index => {
    let { history } = this.state;
    this.setState({ 
      history: history.slice(0,index).concat(history.slice(index+1)),
    });
    this.props.updateModal({item: this.state});
  }
  /* END */

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let entry = { ...this.state };
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
      <Modal.Dialog bsSize="large">
        <Modal.Header>
          Updating <b>{this.state.name}</b> 
        </Modal.Header>
        <Modal.Body style={{'overflowY': 'scroll'}}>
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
                  placeholder={0}
                  value={this.state.quantity ? this.state.quantity : undefined} 
                  onChange={event => this.changeHandler(event, "quantity")} />
              </Col>
              <Col componentClass={ControlLabel} sm={1}>
                Price
              </Col>
              <Col sm={2}>
                <FormControl
                  type="number" 
                  bsSize="small" 
                  placeholder={0}
                  value={this.state.price ? this.state.price : undefined} 
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
                  suggestions={this.props.inventoryCategories}
                  value={this.state.category}
                  changeHandler={this.changeHandler}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <InventoryHistory
                item={this.state}
                selectHandler={this.historyHandler}
                addHistoryItem={this.addHistory}
                removeHistoryItem={this.removeHistory}
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
    )
  }
}

const mapStateToProps = (state, prevProps) => ({
  entry: prevProps.entry,
  inventoryCategories: state.inventory.categories,
  dishCategories: state.dish.categories,
  dishes: state.dish.dishes,
});

export default connect(mapStateToProps, { 
  updateInventoryEntry,
  deleteInventoryEntry,
  updateInventoryHistory,
})(InventoryEntry);