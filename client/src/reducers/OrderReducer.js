import { getTableNumber } from '../utils/helper';
import { 
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  LOAD_ORDERS_REQUEST,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  GET_TABLES,
  SET_ACTIVE_TABLE,
  UPDATE_TABLE,
  RESET_TABLE,
  SAVE_RECEIPT
 } from '../constants/ActionTypes';

const NUM_TABLES = 26;

const defaultTable = {
  name: "Table -",
  isOccupied: false,
  guestNumber: null,
  server: null,
  pendingOrder: null, // ID of receipt
}

export const defaultTables = (function() {
  let tables = [];
  for(let i=1;i<=NUM_TABLES;i++) {
    tables.push(Object.assign({}, defaultTable, {
      name: "Table " + i
    }))
  }
  return tables
})();

export const defaultOrder = {
  table: null,
  guests: 0,
  server: null,
  items: [],
  sub_total: 0.0,
  discountType: null,
  discountAmount: 0.0,
  tax: 0.0,
  total: 0.0,
  paid: false,
  // 'card': { 
  //     'number': { type: Number },
  //     'cardexp': { type: String },
  //     'cvc': { type: Number }
  // },
  paymentType: 0,
  amountTendered: 0,
  bills: [{
    id: null,
    items: [],
    total: 0.00
  }]
};

const initialState = {
  isFetching: false,
  currentOrder: defaultOrder,
  orders: {}, // Dictionary of order objects
  error: null,
  tables: defaultTables, // Array of table objects
  activeTableIndex: null
};

export default function orderReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ORDER_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case ADD_ORDER_SUCCESS:
      let { currentOrder } = action;
      return Object.assign({}, state, { 
        isFetching: false,
        orders: Object.assign({}, state.orders, {
          [currentOrder._id] : currentOrder
        }),
        tables: state.tables.map( table => {
          if(table.name === currentOrder.table) {
            table.pendingOrder = currentOrder._id;
            return table;
          } else {
            return table;
          }
        }),
        currentOrder: defaultOrder
      });
    case ADD_ORDER_FAILURE:
      return Object.assign({}, state, { 
        isFetching: false,
        // error: action.error
      });
    case LOAD_ORDERS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case LOAD_ORDERS_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false,
        orders: action.orders
      });
    case LOAD_ORDERS_FAILURE:
      return Object.assign({}, state, { isFetching: false });
    case UPDATE_ORDER_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case UPDATE_ORDER_SUCCESS:
      let { orderID, updatedOrder } = action;
      return Object.assign({}, state, { 
        isFetching: false,
        orders: Object.assign({}, state.orders, {
          [orderID]: updatedOrder
        })
      });
    case UPDATE_ORDER_FAILURE:
      return Object.assign({}, state, { isFetching: false });
    case GET_TABLES:
      let { unpaidOrdersDic } = action;
      return Object.assign({}, state, {
        tables: state.tables.map(table => {
          if(unpaidOrdersDic[table.name] !== undefined) {
            let order = unpaidOrdersDic[table.name];
            return Object.assign({}, table, {
              isOccupied: true,
              guestNumber: order.guests,
              server: order.server,
              pendingOrder: order._id,
            })
          } else { return table }
        })
      })
    case UPDATE_TABLE:
      return Object.assign({}, state, {
        tables: state.tables.map( table => {
          if(table.name === action.tableID) {
            return Object.assign({}, table, action.table);
          } else { return table; }
        })
      });
    case RESET_TABLE:
      return Object.assign({}, state, {
        tables: state.tables.map( table => {
          if(table.name === action.tableID) {
            return defaultTable;
          } else { return table; }
        })
      })
    case SET_ACTIVE_TABLE:
      return Object.assign({}, state, { activeTableIndex: action.tableIndex })
    case SAVE_RECEIPT:
      // TODO: Implement receipt saving
      return state;
    default:
      return state;
  }

};