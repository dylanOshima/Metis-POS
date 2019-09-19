import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal, Button } from 'react-bootstrap';

export default class PickDish extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.string),
  }

  render() {
    let dishDic = {};
    this.props.items.forEach(item => {
      if(dishDic[item.category]) dishDic[item.category].push(item);
      else dishDic[item.category] = [item]; 
    })

    return (
      <Modal show onHide={this.props.hideModal}>
        <Modal.Header>
          Dishes
        </Modal.Header>
        <Modal.Body style={{'overflowY': 'scroll'}}>
          <Grid fluid>
            {this.props.categories.map((category, index) => {
              return (
                <div key={category}>
                  <h3>{category}</h3>
                  <div className="well">
                    {dishDic[category].map(dish => {
                      return (
                        <Button 
                          key={dish._id}
                          onClick={() => {
                            this.props.submit(dish);
                            this.props.hideModal();
                          }}
                          >
                          {dish.name}<br />
                          {dish.price}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Grid>
        </Modal.Body>
      </Modal>
    )
  }
}