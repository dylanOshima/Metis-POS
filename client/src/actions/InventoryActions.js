// import axios from '../utils/API_Ref';
import { inventoryCalls as api} from '../utils/API_Ref';
import { 
  ADD_INVENTORY_REQUEST,
  ADD_INVENTORY_SUCCESS,
  ADD_INVENTORY_FAILURE,
  LOAD_INVENTORY_REQUEST,
  LOAD_INVENTORY_SUCCESS,
  LOAD_INVENTORY_FAILURE,
  UPDATE_INVENTORY_ENTRY,
  DELETE_INVENTORY_ENTRY,
  LOAD_INVENTORY_CATEGORIES,
  UPDATE_INVENTORY_HISTORY,
 } from '../constants/ActionTypes';

export function addInventoryEntry(entry) {
  return function(dispatch) {
    dispatch({ type: ADD_INVENTORY_REQUEST });

    let newEntry = Object.assign({}, entry, {
      price: parseInt(entry.price,10),
      history: [{
        date: Date.now(),
        value: entry.quantity,
        price: entry.price,
      }],
    });

    return api.postInventory(newEntry).then(request => {
        dispatch({
          type: ADD_INVENTORY_SUCCESS,
          newEntry: request.data
        })
      }).catch(error => {
        dispatch({
          type: ADD_INVENTORY_FAILURE,
          error
        })
      })
  }
}

export function loadInventory() {
  return dispatch => {
    dispatch({ type: LOAD_INVENTORY_REQUEST });

    return api.getInventory().then(response => {
        dispatch({
          type: LOAD_INVENTORY_SUCCESS,
          inventory: response.data,
        })
      }).catch(error => {
        console.error("problem loading dishes: ", error); // DEBUG
        dispatch({ 
          type: LOAD_INVENTORY_FAILURE, 
          error 
        });
    })
  }
}

export function updateInventoryEntry(entry) {
  return dispatch => api.putInventory(entry)
    .then(response => {
      dispatch({
        type: UPDATE_INVENTORY_ENTRY,
        entry: response.data
      })
    }).catch(error => {
      console.error("problem updating inventory entry: ", error); // DEBUG
    })
}

// index is the entry id in the array
export function deleteInventoryEntry(entry_id) {
  return dispatch => api.deleteInventory(entry_id)
    .then(response => {
      dispatch({
        type: DELETE_INVENTORY_ENTRY,
        entry_id
      })
    }).catch(error => {
      console.error("problem deleting inventory entry: ", error) // DEBUG
    })
}

// index is the dishes index in the array
export function loadInventoryCategories() {
  return dispatch => api.getInventoryCategories()
    .then(response => {
      dispatch({
        type: LOAD_INVENTORY_CATEGORIES,
        categories: response.data
      })
    }).catch(error => {
      console.error("problem loading inventory categories: ", error) // DEBUG
    })
}

// updates the history and quantity parameter of the inventory item
export function updateInventoryHistory(history) {
  console.log("updateInventoryHistory: ", history);
  return dispatch => api.updateHistory(history)
    .then(response => {
      dispatch({
        type: UPDATE_INVENTORY_HISTORY,
        entry: response.data
      })
    }).catch(error => {
      console.error("problem updating inventory history: ", error) // DEBUG
    })
}