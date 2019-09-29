import React, { Component } from 'react';
import { Button, Grid, Table } from 'react-bootstrap';

// Renders a list of all items selected in the Order screen
class OrderList extends Component {
    getOrderItems = (newOrderList) => {
        return (
            <Grid fluid>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th> Item </th>
                            <th> Quantity </th>
                            <th> Price </th>
                            <th> Comments </th>
                            <th> Delete </th>
                            </tr>
                    </thead>
                    <tbody>
                        {/* Loops through orderList from app.js state and dispays the item name, quantity and delete button */}
                        {newOrderList.map((item, index) => {
                            return (
                                <tr key={item._id+index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.charge}</td>
                                    <td>{item.comments}</td>
                                    <td>
                                        <Button 
                                            id={item.name + "delete"}
                                            onClick={e => this.props.removeFromOrder(item)}>
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            );
                        
                        })}
                    </tbody>
                </Table>
            </Grid>
        );
    };

    // Renders the page by calling function
     render(){
        return(
            this.getOrderItems(this.props.currentOrderList)
        )
    };
}

export default OrderList;