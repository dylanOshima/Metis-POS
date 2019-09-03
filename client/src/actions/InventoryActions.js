// import axios from '../utils/API_Ref';
import api from '../utils/API_Ref';
import { 
  ADD_INVENTORY_REQUEST,
  ADD_INVENTORY_SUCCESS,
  ADD_INVENTORY_FAILURE,
  LOAD_INVENTORY_REQUEST,
  LOAD_INVENTORY_SUCCESS,
  LOAD_INVENTORY_FAILURE,
  UPDATE_INVENTORY_ENTRY,
  DELETE_INVENTORY_ENTRY,
 } from '../constants/ActionTypes';

export function addInventoryEntry(entry) {
  return function(dispatch) {
    dispatch({ type: ADD_INVENTORY_REQUEST });

    let newEntry = Object.assign({}, entry, {
      price: parseInt(entry.price,10)
    });

    return api.client.post("/inventory/add", newEntry)
      .then(request => {
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

    return api.client.get("/inventory")
      .then(response => {
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
  return dispatch => api.client.put(`/inventory/${entry._id}`)
    .then(response => {
      dispatch({
        type: UPDATE_INVENTORY_ENTRY,
        entry: response.data
      })
    }).catch(error => {
      console.error("problem updating inventory entry: ", error); // DEBUG
    })
}

// index is the dishes index in the array
export function deleteInventoryEntry(entry, index) {
  return dispatch => api.client.delete(`/inventory/${entry._id}`)
    .then(response => {
      dispatch({
        type: DELETE_INVENTORY_ENTRY,
        index
      })
    }).catch(error => {
      console.error("problem deleting inventory entry: ", error) // DEBUG
    })
}