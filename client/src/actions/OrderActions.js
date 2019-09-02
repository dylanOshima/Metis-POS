import api from '../utils/API_Ref';
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

// Orders
export function addOrder(seating) {
  // Interpreted by the thunk middleware:
  return function(dispatch) {
    dispatch({
      type: ADD_ORDER_REQUEST
    });

    return api.client.post("/check/seat", seating)
      .then(response => {
        let currentOrder = response.data;
        dispatch({
          type: ADD_ORDER_SUCCESS,
          currentOrder
        })
      }).catch(error => {
        dispatch({
          type: ADD_ORDER_FAILURE,
          error
        })
      })
  }
};

export function loadOrders() {
  return function(dispatch, getState) {
    dispatch({
      type: LOAD_ORDERS_REQUEST
    });

    // Dispatch vanilla actions asynchronously
    return api.client.get("/order") // Returns an array of order objs
      .then(response => {
        let orderList = response.data;
        let orderDic = {};
        for(let i=0;i<orderList.length;i++){
          let order = orderList[i];
          orderDic[order._id] = order;
        }

        dispatch({
          type: LOAD_ORDERS_SUCCESS,
          orders: orderDic
        })
      }).catch(error => {
        dispatch({
          type: LOAD_ORDERS_FAILURE,
          error
        })
      })
  }
};

export function updateOrder(order) {
  // Interpreted by the thunk middleware:
  return function(dispatch) {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    let URL = encodeURI("/order/"+ order.bill._id);
    return api.client.put(URL, order)
      .then(response => {
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          orderID: order.bill._id,
          updatedOrder: order.bill
        });
      }).catch(error => {
        dispatch({
          type: UPDATE_ORDER_FAILURE,
          error
        });
      });
  }
};

export function checkout(order) {
  // Interpreted by the thunk middleware:
  return function(dispatch) {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    let newPayment = Object.assign({}, order, {
      paid: true,
    });

    let URL = encodeURI("/check/" + order.id);
    return api.client.put(URL, newPayment)
      .then(response => {
        let updatedOrder = response.data;
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          orderID: updatedOrder._id,
          updatedOrder
        });
      }).catch(error => {
        dispatch({
          type: UPDATE_ORDER_FAILURE,
          error
        });
      });
  }
};

export function getTables() {
  return (dispatch) => {
    return api.client.get("/check/unpaid")
      .then((response) => {
        let unpaidOrders = response.data;
        let unpaidOrdersDic = {};
        for(let i=0;i<unpaidOrders.length;i++){
          let order = unpaidOrders[i];
          unpaidOrdersDic[order.table] = order;
        }

        dispatch({
          type: GET_TABLES,
          unpaidOrdersDic
        })
      }).catch(error => {
        // throw error
       console.error("problem getting tables: ", error)
      })
  };
}

export function updateTable(tableID, table) {
  return { type: UPDATE_TABLE, tableID, table }
};

export function resetTable(tableID) {
  return { type: RESET_TABLE, tableID }
};

export function setTable(tableIndex) {
  return { type: SET_ACTIVE_TABLE, tableIndex }
};

export function saveReceipt(payload) {
  return { type: SAVE_RECEIPT, payload }
};

