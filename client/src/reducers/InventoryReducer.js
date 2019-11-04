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

const initialState = {
  isFetching: false,
  inventory: null, // An array of inventory entries
  categories: null,
};

export default function inventoryReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_INVENTORY_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case ADD_INVENTORY_SUCCESS:
      let { newEntry } = action;
      return Object.assign({}, state, {
        isFetching: false,
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
      return Object.assign({}, state, { 
        isFetching: false,
        inventory
      }); 
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
      });
    case DELETE_INVENTORY_ENTRY:
      return Object.assign({}, state, {
        inventory: state.inventory.filter(entry => entry._id !== action.entry_id)
      });
    case LOAD_INVENTORY_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.categories
      });
    case UPDATE_INVENTORY_HISTORY:
      return Object.assign({}, state, {
        inventory: state.inventory.map(entry => {
          if(entry._id === action.entry._id) {
            return action.entry;
          } else { return entry }
        })
      });
    default: 
      return state;
  }
}