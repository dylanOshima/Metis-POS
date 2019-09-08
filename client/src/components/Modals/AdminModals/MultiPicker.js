import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Modal, Row, Col, Panel, PanelGroup, Button } from 'react-bootstrap';

class MultiPicker extends Component {
  static propTypes = {
    updateSelected: PropTypes.func,
    submit: PropTypes.func,
    hideModal: PropTypes.func,
    categories: PropTypes.instanceOf(Array),
    options: PropTypes.instanceOf(Array),
    title: PropTypes.string,
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

  submitEntry = () => {
    this.props.updateInventoryEntry(this.state);
    this.props.hideModal();
  }

  render() {
    let { title, categories, selected, hideModal } = this.props;
    
    return (
      <Fragment>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} xs={12}>
                <h2>Categories</h2>
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
                                onClick={() => this.props.updateSelected(item)}>
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
                <h2>Selected</h2>
                <ListGroup>
                  {selected.map((item, index) => {
                    return (
                      <ListGroupItem
                        key={index}
                        // onClick={this.updateSelected}
                      >
                      {item.name}
                    </ListGroupItem>
                    )
                  })}
                </ListGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize="lg" onClick={hideModal}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Fragment>

    )
  }
}

const mapStateToProps = state => ({
  categories: state.inventory.categories,
  options: state.inventory.inventory,
})

export default connect(mapStateToProps)(MultiPicker);