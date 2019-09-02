import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Button} from 'react-bootstrap';
import Hoc from "../Hoc/Hoc";
import { updatePage } from '../../actions/AppActions';
import { logout } from '../../actions/ServerActions';
import * as pages from '../../constants/PageTypes';

const navbar = (props) => {

    return (
        <Nav 
        navbar 
        bsStyle="pills" 
        activeKey={props.activePage} 
        onSelect={page => props.updatePage(page)}>
            <NavItem 
            eventKey={pages.TABLES_PAGE} 
            title="Tables">
                Tables
			</NavItem>
            {props.activeTableIndex ? (<NavItem 
            eventKey={pages.ORDERS_PAGE}  
            title="Orders"> Orders
            </NavItem>) 
            : 
            (<NavItem 
            eventKey={pages.ORDERS_PAGE} 
            title="Orders" 
            disabled> Orders
			</NavItem>)}
            <NavItem 
            eventKey={pages.ADMIN_PAGE}  
            title="Admin"> 
                Admin
			</NavItem>
            {(props.activeTableIndex > -1) && (typeof props.activeTableIndex === 'number') ? 
                (<NavItem 
                disabled 
                eventKey="ActiveStuff">  Active Table: Table {props.activeTableIndex + 1} 
                </NavItem>) 
                : null}   
            {
                props.loggedInUser ? 
                    (
                        <Hoc>
                            <NavItem
                             eventKey="LoggedInServer" 
                             title="LoggedInServer" 
                             disabled>{props.loggedInUser} 
                             </NavItem>
                            <Button 
                            title="LogOutUser" 
                            bsSize="large" 
                            bsStyle="danger" 
                            onClick={props.logout}>Logout
                            </Button>
                        </Hoc>
                    ) 
                    : null}

        </Nav>
    );

}

const mapStateToProps = state => ({
    activatePages: state.app.activePage,
    activeTableIndex: state.order.activeTableIndex,
    loggedInUser: state.server.serverName,
})

export default connect(mapStateToProps, { updatePage, logout })(navbar);
