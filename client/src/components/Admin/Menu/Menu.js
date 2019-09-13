import React from 'react';
import { Button, Well, Panel, Grid, Row, Col, Table } from 'react-bootstrap'
import { EDIT_MENU_ITEM } from '../../../constants/ModalTypes';
import { displayArray } from '../../../utils/helper';

// makes it easy to reset the state of the page / clear the forms
const initialState = {
        name: "",
        description: "",
        cost: 0,
        markup: 0,
        retailPrice: 0,
        recipe: [],
        category: "appetizer",
}

const Menu = props => {
    return (
        <Grid fluid>
            <Row>
                <Col xs={12}>

                            <Table striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th> Name </th>
                                        <th> Description </th>
                                        <th> Cost </th>
                                        <th> Mark-up </th>
                                        <th> Retail Price</th>
                                        <th> Recipe </th>
                                        <th> Category </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.menu.map(menu => {
                                        return (
                                            <tr 
                                            key={menu._id} 
                                            onClick={() => props.showModal(EDIT_MENU_ITEM, { menu })}>
                                                <td> {menu.name} </td>
                                                <td> {menu.description}</td>
                                                <td> {menu.cost} </td>
                                                <td> {menu.markup} </td>
                                                <td> {menu.retailPrice} </td>
                                                <td> {displayArray(menu.recipe)} </td>
                                                <td> {menu.category} </td>
                                            </tr>)
                                    }
                                    )}
                                </tbody>
                            </Table>
                            <Button 
                            bsStyle="success" 
                            onClick={() => props.showModal(EDIT_MENU_ITEM, { 
                                menu: initialState
                            })}>
                            New 
                            </Button>
                </Col>
            </Row>
        </Grid>
    )
}
export default Menu;
