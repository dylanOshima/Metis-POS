import {orderCalls as api} from '../utils/API_Ref';
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
    
    return api.postOrder(seating).then(response => {
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
    return api.getOrders().then(response => {
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

// TODO: Fix name, this is actually hitting the update dishes endpoint
export function addDishToOrder(order) {
  return function(dispatch) {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    return api.putDishOrder(order).then(response => {
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          orderID: response.data._id,
          updatedOrder: response.data,
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
  return function(dispatch) {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    let newPayment = Object.assign({}, order, {
      paid: true,
      paymentType: order.paymentMethod,
      // discountType: order.discountType,
      amountTendered: order.amountTendered,
      card: {
        number: order.card.cardNumber,
        cardexp: order.card.cardExp,
        cvc: order.card.cvc
      }
    });

    return api.checkout(newPayment).then(response => {
        let updatedOrder = response.data;
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          orderID: updatedOrder._id,
          updatedOrder
        });
        dispatch(resetTable(updatedOrder.table));
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
    return api.getUnpaidOrders().then((response) => {
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

