import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button, Modal, Row, Col, Panel, PanelGroup, ControlLabel } from 'react-bootstrap';

class MultiPicker extends Component {
  static propTypes = {
    selectedHandler: PropTypes.func,
    submit: PropTypes.func,
    hideModal: PropTypes.func,
    categories: PropTypes.instanceOf(Array),
    options: PropTypes.instanceOf(Array),
    propertyName: PropTypes.string,
  }

  static defaultProps = {
    embedded: false,
    haveTitles: true,
    selected: [],
    selectMultiple: false,
  }

  state = {
    activeCategoryIndex: 0,
    selected: []
  }

  optionsDic = {};

  componentWillMount = () => {    
    let { categories, options } = this.props;
    categories.forEach((category) => {
      this.optionsDic[category] = [...options.filter((option) => option.category === category)];
    })
  }

  handleSelect = (activeCategoryIndex) => {
    this.setState({activeCategoryIndex});
  }

  // Called when an item from a category is selected
  onUpdate = (entry) => {
    let { selected, selectMultiple, selectedHandler } = this.props;
    let exists = false;

    // Check if it already exists, if it does and selectMultiple, increment
    let newSelected = selected.map(item => {
      if(item._id === entry._id) {
        if(selectMultiple) item.quantity += 1;
        exists = true;
        return item;
      } else {
        return item;
      }
    })

    if(!exists) {
      let _ingredient = { _id: entry._id, name: entry.name };

      if(selectMultiple) _ingredient.quantity = 1;

      newSelected.push(_ingredient);
    }

    selectedHandler(newSelected);
  }

  // Called when a selected item is called
  onDelete = (entry) => {
    let { selected, selectedHandler, selectMultiple } = this.props;
    let newSelected;
    if(!selectMultiple) newSelected = selected.filter(item => item._id !== entry._id);
    else {
      let index = selected.findIndex(item => item._id === entry._id);
      if(index < 0) return;
      else if(selected[index].quantity <= 1) {
        newSelected = selected.slice(0,index).concat(selected.slice(index+1));
      } else {
        newSelected = selected.map(item => {
          if(item._id === entry._id) item.quantity -= 1;
          return item
        });
      }
    }
    selectedHandler(newSelected);
  }

  render() {
    let { 
      propertyName, categories, selected, hideModal, haveTitles, selectMultiple
    } = this.props;
    
    let content = (<Row>
                    <Col md={6} xs={12}>
                      {haveTitles ? <h2>Categories</h2> : null}
                      <PanelGroup 
                        accordion
                        id="options-panel-list"
                        activeKey={this.state.activeCategoryIndex}
                        onSelect={this.handleSelect}
                      >
                        {categories.map((category, index) => {
                          return (
                            <Panel key={index} eventKey={index} >
                              <Panel.Heading>
                                <Panel.Title toggle>{category}</Panel.Title>
                              </Panel.Heading>
                              <Panel.Body collapsible>
                                {this.optionsDic[category].map((item, index) => {
                                  return (
                                    <ListGroupItem
                                      key={index}
                                      onClick={() => this.onUpdate(item)}>
                                      {item.name}
                                    </ListGroupItem>
                                  )
                                })}
                              </Panel.Body>
                            </Panel>
                          )
                        })}
                      </PanelGroup>
                    </Col>

                    <Col md={6} xs={12}>
                     {haveTitles ? <h2>Selected</h2> : null}
                      <ListGroup>
                        {selected.map((item, index) => {
                          return (
                            <ListGroupItem
                              key={index}
                            >
                            { (selectMultiple && item.quantity) ? 
                                item.quantity + "x " + item.name
                              : item.name }
                            <Button 
                            bsSize="sm"
                            style={{'float':'right'}}
                            onClick={() => this.onDelete(item)}>
                              X
                            </Button>
                          </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Col>
                  </Row>);
    return this.props.embedded ?
      (<Fragment>
        <ControlLabel style={{'margin':'1em 3em'}}>{"UPDATING: " + propertyName.toUpperCase()}</ControlLabel>
        <div style={{
          'margin':'0em 3em',
          'padding':'1em',
          'backgroundColor':'#1c1e2294',
          }}>
          {content}
        </div>
      </Fragment>) 
      :(<Modal show onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"UPDATING: " + propertyName.toUpperCase()}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{'overflowY': 'scroll'}}>
            {content}
          </Modal.Body>
          <Modal.Footer />
        </Modal>)
  }
}

export default MultiPicker;