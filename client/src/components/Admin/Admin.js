import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Jumbotron } from'react-bootstrap'
import Servers from './Servers/Servers'
import Menu from './Menu/Menu'
import { addServer } from '../../actions/ServerActions';
import { addDish } from '../../actions/DishActions';

const admin = props => (
        <Grid>
            <Row>
                <Jumbotron>
                    <h1> Admin Console </h1>
                </Jumbotron>
                <Servers
                 servers={props.servers}
                 addServer={props.addServer}/>
                <Menu
                 menu={props.menu} 
                 addMenu={props.addDish}/>
            </Row>  
        </Grid>
)

const mapStateToProps = state => ({
    servers: state.server.servers,
    menu: state.dish.dishes,
});

export default connect(mapStateToProps, {addServer, addDish})(admin);
