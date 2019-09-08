import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import AutoSuggestWrapper from '../../CustomInput/AutoSuggestWrapper';
import MultiPicker from '../AdminModals/MultiPicker';
import { updateDish, deleteDish, addDish } from '../../../actions/DishActions';

/**
 * @param {object:props} contains:
 *   @param {object:item} contains information on the item
 */

class MenuItem extends Component {

  state = Object.assign({}, this.props.menu);

  updateRecipeHandler = (newIngredient) => {
    let item = { ...this.state };

    // update dish
    let _ingredient = {
      _id: newIngredient._id,
      name: newIngredient.name
    }

    // Check if dish already exists
    let recipe;
    if(item.recipe === undefined) {
      recipe = [_ingredient]
      this.setState({recipe});
      this.props.updateModal({selected: recipe});

    } else if(item.recipe.findIndex(ingredient => ingredient._id === _ingredient._id) < 0) {
      recipe = [...item.recipe, _ingredient];
      this.setState({ recipe });
      this.props.updateModal({selected: recipe});
    }    
  }

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let entry = { ...this.state };
    entry[item] = event.target.value ? event.target.value : "";
    this.setState(entry);
  }

  submitEntry = () => {
    let { addDish, updateDish, hideModal } = this.props
    let submit = this.state._id !== undefined ? updateDish : addDish;
    submit(this.state);
    hideModal();
  }

  deleteEntry = () => {
    this.props.deleteDish(this.state._id);
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
                Cost
              </Col>
              <Col sm={2}>
                <FormControl
                  type="number"
                  bsSize="small"
                  value={this.state.cost} 
                  onChange={event => this.changeHandler(event, "cost")} />
              </Col>

              <Col componentClass={ControlLabel} sm={1}>
                Markup
              </Col>
              <Col sm={2}>
                <FormControl
                  type="number"
                  bsSize="small"
                  value={this.state.markup} 
                  onChange={event => this.changeHandler(event, "markup")} />
              </Col>

              <Col componentClass={ControlLabel} sm={2}>
                Retail Price
              </Col>
              <Col sm={2}>
                {this.state.retailPrice ? this.state.retailPrice 
                  : parseInt(this.state.cost, 10) + parseInt(this.state.markup,10)}
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Category
              </Col>
              <Col sm={8}>
                <AutoSuggestWrapper
                  suggestions={this.props.dishCategories}
                  value={this.state.category}
                  changeHandler={this.changeHandler}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <MultiPicker
                title="Update Recipe"
                haveTitles={false}
                embedded
                selected={this.state.recipe}
                updateSelected={this.updateRecipeHandler}
                categories={this.props.inventoryCategories}
                options={this.props.inventory}
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
  item: prevProps.menu,
  inventory: state.inventory.inventory,
  inventoryCategories: state.inventory.categories,
  dishCategories: state.dish.categories,
  dishes: state.dish.dishes,
});

export default connect(mapStateToProps, {
  addDish,
  updateDish,
  deleteDish
})(MenuItem);