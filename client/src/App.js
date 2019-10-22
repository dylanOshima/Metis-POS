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
import { loadDish } from './actions/DishActions';
// Types
import { 
  TABLES_PAGE,
  ORDERS_PAGE,
  ADMIN_PAGE,
} from './constants/PageTypes';
// Electron
import { channels } from './shared/constants';
const { ipcRenderer } = window; 

class App extends Component {

  componentDidMount() {
    this.props.loadDish();

    // IPC test
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      console.log("Running: ", appName, " with version: ", appVersion);
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
  user: state.server.currentServer,
})

const actionCreators = {
  loadDish,
}

export default connect(mapStateToProps, actionCreators)(App);