import { 
  ADD_INVENTORY_REQUEST,
  ADD_INVENTORY_SUCCESS,
  ADD_INVENTORY_FAILURE,
  LOAD_INVENTORY_REQUEST,
  LOAD_INVENTORY_SUCCESS,
  LOAD_INVENTORY_FAILURE,
  UPDATE_INVENTORY_ENTRY,
  DELETE_INVENTORY_ENTRY
 } from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  inventory: null, // An array of inventory entries
};

export default function inventoryReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_INVENTORY_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case ADD_INVENTORY_SUCCESS:
      let { newEntry } = action;
      return Object.assign({}, state, {
        inventory: [...state.inventory, newEntry]
      });
    case ADD_INVENTORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        // error
      });
    case LOAD_INVENTORY_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case LOAD_INVENTORY_SUCCESS:
      let { inventory } = action;
      return Object.assign({}, state, { inventory }); 
    case LOAD_INVENTORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        // error
      }); 
    case UPDATE_INVENTORY_ENTRY:
      return Object.assign({}, state, {
        inventory: state.inventory.map(entry => {
          if(entry._id === action.entry._id) {
            return action.entry;
          } else { return entry }
        })
      })
    case DELETE_INVENTORY_ENTRY:
      let { index } = action;
      return Object.assign({}, state, {
        inventory: [...state.inventory.slice(index), ...state.inventory.slice(index+1)]
      })
    default: 
      return state;
  }
}