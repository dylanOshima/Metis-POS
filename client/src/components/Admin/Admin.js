import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Jumbotron, Tabs, Tab } from'react-bootstrap';

import Servers from './Servers/Servers';
import Menu from './Menu/Menu';
import Inventory from './Inventory';
import Course from './Courses/Course';

import { addServer, loadServers } from '../../actions/ServerActions';
import { addDish, loadDish, loadDishCategories } from '../../actions/DishActions';
import { loadInventory, addInventoryEntry, updateInventoryEntry, loadInventoryCategories } from '../../actions/InventoryActions';
import { showModal, updateModal } from '../../actions/ModalActions';
import { loadCourses } from '../../actions/CourseActions';

class Admin extends Component {
    state = {
        key: 1
    }

    componentDidMount() {
        this.props.loadServers();
        this.props.loadInventory();
        this.props.loadInventoryCategories();
        this.props.loadDish();
        this.props.loadDishCategories();
        this.props.loadCourses();
    }

    handleKeySelect(key) {
        this.setState({ key });
    }

    render() {
        // TODO: Clean dis shit up.
        let { 
            showModal, updateModal,
            servers, addServer, 
            menu, dishes, dishCategories, addDish, 
            inventory, inventoryCategories, 
            addInventoryEntry, updateInventoryEntry
        } = this.props;
        return (
            <Grid>
                <Row>
                    <Jumbotron>
                        <h1> Admin Console </h1>
                    </Jumbotron>
                    <Tabs
                        id="admin-tab"
                        animation={false}
                        activeKey={this.state.key}
                        onSelect={this.handleKeySelect.bind(this)}>
                        <Tab eventKey={1} title="Servers">
                            <Servers
                                servers={servers}
                                addServer={addServer} />
                        </Tab>
                        <Tab eventKey={2} title="Dishes">
                            <Menu
                                menu={menu} 
                                addMenu={addDish}
                                showModal={showModal} />
                        </Tab>
                        <Tab eventKey={3} title="Inventory">
                            <Inventory
                                inventory={inventory}
                                dishes={dishes}
                                addInventoryEntry={addInventoryEntry}
                                updateInventoryEntry={updateInventoryEntry}
                                showModal={showModal}
                                updateModal={updateModal}
                                inventoryCategories={inventoryCategories}
                                dishCategories={dishCategories} />
                        </Tab>
                        <Tab eventKey={4} title="Course">
                            <Course
                                categories={dishCategories}
                                showModal={showModal}
                                updateModal={updateModal} />
                        </Tab>
                    </Tabs>
                </Row>  
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    servers: state.server.servers,
    menu: state.dish.dishes,
    inventory: state.inventory.inventory,
    inventoryCategories: state.inventory.categories,
    dishes: state.dish.dishes,
    dishCategories: state.dish.categories,
});

export default connect(mapStateToProps, {
    addServer, loadServers, loadCourses,
    addDish, loadDishCategories, loadDish,
    showModal, updateModal,
    loadInventory, addInventoryEntry, updateInventoryEntry, loadInventoryCategories
})(Admin);
