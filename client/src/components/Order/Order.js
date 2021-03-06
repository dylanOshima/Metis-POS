// Order Window to place orders.

// Menubuttons displays imports the items in the center of the screen
// Order list displays the far right list of items
// Hoc is a self wrapper for react

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,Panel, Grid, Row, Col, Well } from 'react-bootstrap';
// Compoonents
import Menubuttons from "./MenuButtons";
import OrderList from "./OrderList";
import CourseView from './CourseView';
// Actions
import { addDishToOrder } from "../../actions/OrderActions";
import { updatePage } from "../../actions/AppActions";
import { loadCourses } from "../../actions/CourseActions";
// 
import { TABLES_PAGE } from '../../constants/PageTypes';


class Order extends Component {
    // State category holds the selected food category to be displayed ex:entree
    state = {
        category: "courses",
        orderList: this.props.order.items,
    };

    componentDidMount = () => {
        this.props.loadCourses();
    }

    // Verifies if two items in an order are the same
    verifyItems = (item1, item2) => (
        item1._id === item2._id &&
        item1.charge === item2.charge &&
        item1.comments === item2.comments
    )

    // Passed as prop to Menu buttons and processes the clicking of an item to be added to the pending order
    addToOrder = (newItem) => {
        //props.table is passed in from app.js and is information for that table from state.
        let orderList = [...this.state.orderList];
        
        //Looks to see if the item already exists in orderList if found increase 
        // its quantity count by 1 if not found push the information into the list.
        let itemIndex = orderList.findIndex(index => this.verifyItems(index, newItem));
        itemIndex !== -1 
            ? orderList[itemIndex].quantity = parseInt(orderList[itemIndex].quantity,10) + 1 
            : orderList.push(newItem);

        this.setState({ orderList });
    }

    /* 
        When the remove button ("X") is clicked in orderList this function is called to remove 1 unit of that item from the list. 
    */
    removeFromOrder = (item) => {
        let orderList = [...this.state.orderList];

        // Find the index position of the item in the list
        // Should never return -1 since the object was clicked
        let itemIndex = orderList.findIndex(index => this.verifyItems(index, item));

        // if quantity of item is greater then 1 subtract 1 from the quantity else remove the item completely
        orderList[itemIndex].quantity > 1 ? 
            orderList[itemIndex].quantity = parseInt(orderList[itemIndex].quantity,10) - 1 :
            orderList.splice(itemIndex,1);  

        this.setState({orderList});
    }

    // Sets state of category with the name of the category clicked
    onItemClick = event => {
        this.setState({
            category : event.target.id
        });
    }

    // Updates the comment of the given order
    updateComment = (event, orderIndex) => {
        let orderList = [...this.state.orderList];
        orderList[orderIndex].comments = event.target.value;
        this.setState({orderList});
    }

    // Upon clicking the Submit button this function is called
    orderSubmit = () => {

        let newOrder = Object.assign({}, this.props.order, {
            items: this.state.orderList
        });

        this.props.addDishToOrder(newOrder);
        this.props.updatePage(TABLES_PAGE);
    }

    // Renders a list of categories, the items the ordered list and a submit button
    render() {        
        return (
            <Grid fluid>  
                <div>    
                    <Row>
                        <Col id="section" md={2}>
                            <Panel>
                                <Well>
                                    <h2 onClick={(event) => this.onItemClick(event)} id={"courses"}>    Courses     </h2>
                                    <h2 onClick={(event) => this.onItemClick(event)} id={"drink"}>      Drinks     </h2>
                                    <h2 onClick={(event) => this.onItemClick(event)} id={"appetizer"}>  Appetizers </h2>
                                    <h2 onClick={(event) => this.onItemClick(event)} id={"entree"}>     Entree     </h2>
                                    <h2 onClick={(event) => this.onItemClick(event)} id={"dessert"}>    Dessert    </h2>
                                    <h2 onClick={(event) => this.onItemClick(event)} id={"special"}>    Specials   </h2>
                                </Well>
                            </Panel>
                        </Col>
                        <Col id="items" md={4}>
                            <Panel>
                                <Well>
                                    { this.state.category === 'courses' ?
                                        (
                                            <CourseView
                                            courses={this.props.courses}
                                            addToOrder={this.addToOrder.bind(this)} />
                                        )
                                        : (<Menubuttons
                                            addToOrder={this.addToOrder.bind(this)}
                                            menu={this.props.menu}
                                            category={this.state.category} />)
                                    }
                                </Well>
                            </Panel>
                        </Col>
                        <Col id="order-list" md={6}>
                            <Panel>
                                <Well>
                                    <OrderList 
                                    removeFromOrder={this.removeFromOrder.bind(this)} 
                                    currentOrderList={this.state.orderList}
                                    updateComment={this.updateComment} />
                                    <div>
                                        <Button onClick={this.orderSubmit.bind(this)}>Submit</Button>
                                    </div>
                                </Well>
                            </Panel>
                        </Col>
                    </Row>
                </div>
            </Grid>
        )
    }
};

const mapStateToProps = state => {
    let table = state.order.tables[state.order.activeTableIndex];
    return {
        table,
        order: state.order.orders[table.pendingOrder],
        menu: state.dish.dishes,
        courses: state.course.courses,
    }
}
const mapDispatchToProps = {
    addDishToOrder,
    updatePage,
    loadCourses,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);