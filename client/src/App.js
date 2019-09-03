import React, { Component } from 'react';
import './App.css';
import { Grid, Row } from 'react-bootstrap';
import Order from './components/Order';
import Navbar from './components/Nav/Navbar';
import Table from './components/Table/Table';
import Admin from './components/Admin/Admin';
import ModalRoot from './components/Modals/ModalRoot';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
// Actions
import { getTables,loadOrders } from './actions/OrderActions';
import { loadDish } from './actions/DishActions';
// Types
import { 
  TABLES_PAGE,
  ORDERS_PAGE,
  ADMIN_PAGE,
} from './constants/PageTypes';

class App extends Component {

  componentDidMount() {
    this.props.loadDish();
    this.props.getTables();
    this.props.loadOrders();
  }

  //clears the active table;
  cleanTable = () => {
    let misterClean = [...this.state.tables];
      misterClean[this.state.activeTableIndex].isOccupied= false;
      misterClean[this.state.activeTableIndex].guestNumber= null;
      misterClean[this.state.activeTableIndex].server= null;
      misterClean[this.state.activeTableIndex].pendingOrder= [];
      misterClean[this.state.activeTableIndex].bill.id= null;
      misterClean[this.state.activeTableIndex].bill.items= [];
      misterClean[this.state.activeTableIndex].total= null;

      this.setState({
        tables: misterClean,
        activeTable: null,
        activeTableIndex: null,
        modalActive: false
      });
    }

  render() {
    let activeContent = null;
    if(this.props.user === null){
      activeContent = (<Login />);
    }else{
      switch (this.props.activePage) {
        case TABLES_PAGE:
          activeContent = (<Table />);
          break;
        case ORDERS_PAGE:
          activeContent = (<Order />);
          break;
        case ADMIN_PAGE:
          activeContent = (<Admin />);
          break;
        default:
          activeContent = null
      }
    }

    return (
      <div> 
        <Grid fluid>
          <Navbar />
        </Grid>
        <Grid>
          <Row>
            {/* active content (conditional page render) */}
            {activeContent}
          </Row>
          <ModalRoot />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activePage: state.app.activePage,
  user: state.server.serverName,
})

const actionCreators = {
  getTables,
  loadOrders,
  loadDish,
}

export default connect(mapStateToProps, actionCreators)(App);