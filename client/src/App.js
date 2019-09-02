import React, { Component } from 'react';
import './App.css';
import { Grid, Row } from 'react-bootstrap';
import API from './utils/API';
import Order from './components/Order';
import Navbar from './components/Nav/Navbar';
import Table from './components/Table/Table';
import Admin from './components/Admin/Admin';
// import Modal from './components/Modals/Modal';
import ModalRoot from './components/Modals/ModalRoot';
// import Hoc from './components/Hoc/Hoc';
import OrderModal from './components/Modals/Order';
import Login from './components/Login/Login';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
// Actions
import { showModal, hideModal } from './actions/ModalActions';
import { loadServers } from './actions/ServerActions';
import { setTable, resetTable, updateTable, getTables,loadOrders } from './actions/OrderActions';
import { loadDish } from './actions/DishActions';
// Types
import { NEW_SEATING_MODAL, OCCUPIED_MODAL } from './constants/ModalTypes';
import { 
  TABLES_PAGE,
  ORDERS_PAGE,
  ADMIN_PAGE,
} from './constants/PageTypes';

const NUM_TABLES = 26;

let genTables = (function() {
  let tables = [];
  for(let i=1;i<=NUM_TABLES;i++) {
    tables.push({
      name: "Table "+i,
      isOccupied: false,
      guestNumber: null,
      server: null,
      pendingOrder: [],
      bill: {
        id: null,
        items: [],
        total: 0.00
      }
    })
  }
  return tables
})();


class App extends Component {
    
  state = {
    // Holds all information regarding the tables. 
    // Pending Order contains name and quantity
    // Items contains name, quantity, and cost
    tables: genTables,
    // List of servers
    servers: [],
    // Holds all menu information found in DB: id, name, description, cost
    menu: {},
    // Currently logged in User
    user: null,
    // the page that is currently active
    activePage: "Tables",
    // Table that has been selected
    activeTable: null,
    // Index position of table that has been selected
    activeTableIndex: null,
    // Is modal active
    modalActive: false,
    // is orderodal active
    orderModal: false,
    // Response from DB upon submitted the order from order component
    orderResponse: null,
    // Is message modal active
    messageModalActive: false,
    // Content of message modal
    messageModal: ""
  }

  componentDidMount() {
    //populates the data from the DB
    this.populateData();
  }
  populateData = () => {
    this.props.loadDish();
    // this.getUnpaidChecks();
    this.props.getTables();
    // this.getServers();
    this.props.loadServers();
    this.props.loadOrders();
  }
  activePageHandler = (event) => {
    //This is for the navbar to find the active page
    this.setState({ activePage: event })
  }

  getMenu = () => {
    API.getMenu().then(results => {
      let newMenu = results.data;
      console.log("********", newMenu); // DEBUG
      this.setState({ menu: newMenu }, () => {
      })
    }).catch(error => {
      if (error) throw (error)
    })
  }

  getServers = () => {
    API.getServers().then((results) => {
      let newServers = results.data
      this.setState({ servers: newServers })
    }).catch(error => {
      if (error) throw (error)
    })
    
  }
  getUnpaidChecks = () => {
    //this checks the database on load to see if there are unpaid checks
    API.getTables().then(results => {
      let newTablesData = results.data
      // if the result has data, there are unpaid checks
      if (newTablesData) {
        // get the tables from state in a stretch
        let updateChecks = [...this.state.tables]
        //map through the data from the d/b
        newTablesData.map(item => {
          // match them against the tables in state
          updateChecks.map((table, index) => {
            if (table.name === item.table) {
              let updateChecksIndex = null;
              //update the table's object
              updateChecksIndex = index;
              updateChecks[updateChecksIndex].bill.id = item._id;
              updateChecks[updateChecksIndex].isOccupied = true;
              updateChecks[updateChecksIndex].server = item.server
              updateChecks[updateChecksIndex].guestNumber = item.guests
              updateChecks[updateChecksIndex].bill.items = item.items
              updateChecks[updateChecksIndex].bill.total = item.total
            }
            return;
          })
          return;
        })
        //push the changed tables back to state
        this.setState({tables: updateChecks})
      }
    })
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

  // handles what happens when a table is clicked (sets an active table, active index, and opens the modal
  handleTableClick = (item) => {
    let newTableIndex = null;
    return this.props.tables.map((table, index) => {
      if (table.name === item) {
        newTableIndex = index;
        this.props.setTable(newTableIndex);
        // this.setState({ activeTable: item, activeTableIndex: newTableIndex },function(){
          if(table.isOccupied){
            this.modalOpen(OCCUPIED_MODAL);
          } else {
            this.modalOpen(NEW_SEATING_MODAL);
          }
        // })
      }
    })
  }

  // Callback function for DB query to verify login code
  setUser = (name) => {
    // Checks if return is a string or object
    if(typeof name === "string"){
      //Sets the user name that does callback to display login 
      this.setState({
        user: name
      },function() {this.props.alert.show('Successfully Logged In!',{ type: "success" })})
    }
  }
  // When user clicks logout button set user to null
  unsetUser = () => {
    this.setState({
      user: null
    }, function () { this.props.alert.show('Successfully Logged Out!')})
  }

  // Called from Order.js component, updates pending order list for active table
  updatePendingOrder = pendingOrder => {
    this.setState({
      [this.state.tables[this.state.activeTableIndex].pendingOrder]: pendingOrder
    });
  }

  // Saves pendering orders into ordered list
  savePendingOrder = newOrderList => {
    // variables for asthetic purposes, shorten code length
    const activeTable = this.state.activeTableIndex;
    const pendingOrders = this.state.tables[activeTable].pendingOrder;
    var currentOrderList = this.state.tables[activeTable].bill.items;
    let table = this.state.tables[activeTable];
    let newBillTotal = parseFloat(this.state.tables[activeTable].bill.total);

    // Loop through list of pending orders
    pendingOrders.map(newItem => {
      // Gets index position of newItem from table
      const currentItemIndex = currentOrderList.findIndex(index => index.name === newItem.name);
      // Gets index position of item from menu
      const menuItemIndex = this.state.menu.findIndex(index => index.name === newItem.name);
      // variables for asthetic purposes, shorten code length
      const menuItem = this.state.menu[menuItemIndex];
     
      //If item is found in the list add the ordered quantity to the pending quantity and calculate the new cost of the quantity
      // If not found calculate the total cost and push all items into the array
      
      if(currentItemIndex !== -1){ 
        currentOrderList[currentItemIndex].quantity = parseInt(currentOrderList[currentItemIndex].quantity,10) + parseInt(newItem.quantity,10); 
        currentOrderList[currentItemIndex].charge = (parseInt(currentOrderList[currentItemIndex].quantity) * parseFloat(menuItem.cost)).toFixed(2);
        newBillTotal = parseFloat(currentOrderList[currentItemIndex].charge);
      }else{
        newItem.charge = parseInt(newItem.quantity,10) * parseFloat(menuItem.cost);
        currentOrderList.push(newItem);
        newBillTotal += parseFloat(newItem.charge);
       }
    });
    // Store updated info into table object
    table.bill.items = currentOrderList;
    table.bill.total = (newBillTotal).toFixed(2);
    table.pendingOrder = [];

    //Set State using table object and use callback once state is updated
     this.setState({
       [this.state.tables[activeTable]]: table,
     },
       this.orderToDb()
     );
  }

  // Call placeOrder API route to update database and wait for response
  orderToDb = () => {
    API.placeOrder(this.state.tables[this.state.activeTableIndex], this.dbresponse);
  }

  // Process route response from updating order and set message to be forwarded to Order component
  dbresponse = (response)=> {
    let orderMessage;
    
    response.status === 200 ? orderMessage = "Order Submitted" : orderMessage = "An error occured, order was saved and will be saved on next transaction";

    this.setState({
      orderResponse: orderMessage,
      orderModal: true
    });
  }

  // Close Response modal
  orderClose = () => {
    this.setState({
      orderModal: false
    })
  }

  setServer = (server) => {
    this.setState({ [this.state.tables[this.state.activeTableIndex].server]: server });
  }

  addServer = (server,callback) => {
    API.addServer(server)
    .then(results => {
      if (results.status === 200) {
        this.getServers();
      }
    }
    ).catch(error =>  {throw error})
  }

  addMenu = (menu) => {
    API.addMenu(menu)
      .then(results => {
        if (results.status === 200) {
          this.getMenu();
        }
      }
      ).catch(error => { throw error })
  }
  seatGuestsFromModalHandler = (server, guests) => {
    //click handler from the modal, seats new guests, updates state, creates a new receipt and then updates state with the new receipt
    // Push to the DB
    const seating = {};
    seating.server = server;
    seating.guests = guests;
    seating.table = this.state.activeTable

    API.seatGuests(seating).then(results => {
      if (results.status === 200) {

        let updateTables = [...this.state.tables]
        updateTables[this.state.activeTableIndex].guestNumber = guests;
        updateTables[this.state.activeTableIndex].server = server;
        updateTables[this.state.activeTableIndex].isOccupied = true;
        updateTables[this.state.activeTableIndex].bill.id = results.data._id;
        this.setState({
          modalActive: false,
          tables: updateTables
        }, function () {
          this.props.alert.show('Guests Seated Successfully',{type: "success"})
        });
      }
    });
  }
//these are helper functions to open and close the modals
  modalOpen = (type) => {
    this.props.showModal(type);
    // this.setState({ modalActive: true }, function () {
    // })
  }
  modalClose = () => {
    this.props.hideModal();
    // this.setState({ modalActive: false }, function () {
    // })
  }
  modalOrder = () => {
    // from inside the modal, this function lets the modal open an order page, it closes the modal too
    this.setState({ activePage: "Orders", modalActive: false })
  }

  submitPayment = (payment) => {
    API.submitPayment(payment)
      .then(results => {
        if (results.status === 200) {
          this.cleanTable();  
        }
      })
      .catch(error => {throw error })
  }

  render() {
    let activeContent = null;
    if(this.state.user === null){
      activeContent = (<Login setUser={this.setUser} />)
    }else{

      switch (this.props.activePage) {
        case TABLES_PAGE:
          activeContent = (
            <Table clicked={this.handleTableClick} />
            
          )
          break;
        case ORDERS_PAGE:
          // Sets Order Page as rendered page and passes props to Order Component
          activeContent = (
            <Order 
            menu={this.state.menu} 
            orderSubmit={this.savePendingOrder} 
            updatePendingOrder={this.updatePendingOrder}/>
          )
          break;
        case ADMIN_PAGE:
          activeContent = (
            <Admin 
            servers={this.state.servers} 
            addServer={this.addServer} 
            menu={this.state.menu} 
            addMenu={this.addMenu}/>
          )
          break;
        default:
          activeContent = null
      }
    }

    return (
      // <Hoc>
      <div> 
        <Grid fluid>
          <Navbar />
        </Grid>
        <Grid>
          <Row>
            {/* active content (conditional page render) */}
            {activeContent}
          </Row>
          {/* modal conditional rendering is below */}
          {/* Displays Order modal if state is true */}
          {
            this.state.orderModal ? 
            <OrderModal 
            orderMessage={this.state.orderResponse} 
            orderClose={this.orderClose} />
            : (null)
            }
          <ModalRoot />
          {/*  this.state.modalActive ? 
          (<Modal 
          tables={this.state.tables} 
          activeTable={this.state.activeTable} 
          activeTableIndex={this.state.activeTableIndex} 
          servers={this.state.servers} 
          close={this.modalClose} 
          order={this.modalOrder} 
          receipt={this.printReceipt}
          submitPayment={this.submitPayment} 
          setServer={this.setServer} 
          seatGuests={this.seatGuestsFromModalHandler} />) 
          : (null) */}
        </Grid>
      </div>
      // </Hoc>
    );
  }
}

const mapStateToProps = state => ({
  tables: state.order.tables,
  activeTableIndex: state.order.activeTableIndex,
  activePage: state.app.activePage,
})

const actionCreators = {
  showModal,
  hideModal,
  setTable,
  updateTable,
  resetTable,
  getTables,
  loadServers,
  loadOrders,
  loadDish,
}

export default connect(mapStateToProps, actionCreators)(withAlert(App));