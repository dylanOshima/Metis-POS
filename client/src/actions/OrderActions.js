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
      .then(currentOrder => {
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
    return api.client.get("/check/unpaid") // Returns an array of order objs
      .then(orderList => {

        let orderDic = {};
        for(let i=0;i<orderList.length;i++){
          let order = orderList[i];
          if(typeof order === "Object") {
            orderDic[order._id] = order;
          }
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
  return function(dispatch, getState) {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    return api.client.put("/order/"+ order._id, order)
      .then(response => {
        //dbResponse(response);
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          orderID: response._id,
          updatedOrder: response
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

    let newPayment = {};
    newPayment.paid           = true;
    newPayment.card           = order.card;
    newPayment.amountTendered = order.amount;
    newPayment.paymentType    = order.paymentType;
    let URL = encodeURI("/check/" + order.bill.id);
    return api.client.put(URL, order)
      .then(response => {
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          orderID: response._id,
          updatedOrder: response
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
      .then((unpaidOrders) => {

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
  return { type: SET_ACTIVE_TABLE, tableID }
};

export function setTable(tableIndex) {
  return { type: SET_ACTIVE_TABLE, tableIndex }
};

export function saveReceipt(payload) {
  return { type: SAVE_RECEIPT, payload }
};

