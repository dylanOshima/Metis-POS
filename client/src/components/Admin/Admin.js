import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Jumbotron, Tabs, Tab } from'react-bootstrap'
import Servers from './Servers/Servers'
import Menu from './Menu/Menu'
import { addServer } from '../../actions/ServerActions';
import { addDish } from '../../actions/DishActions';

class Admin extends Component {
    state = {
        key: 1
    }

    handleKeySelect(key) {
        this.setState({ key });
    }

    render() {
        let { servers, addServer, menu, addDish } = this.props;
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
                                addMenu={addDish} />
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
});

export default connect(mapStateToProps, {addServer, addDish})(Admin);
