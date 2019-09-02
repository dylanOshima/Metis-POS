import { 
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  ADD_DISH_FAILURE,
  LOAD_DISHES,
  UPDATE_DISH,
  DELETE_DISH
 } from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  dishes: [],
  activeDish: null,
};

export default function dishReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_DISH_REQUEST:
      return Object.assign({}, state, { 
        isFetching: true,
      });
    case ADD_DISH_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false,
        dishes: [...state.dishes, action.activeDish],
        activeDish: null
      });
    case ADD_DISH_FAILURE:
      return Object.assign({}, state, { 
        isFetching: false,
        // error: error
      });
    case LOAD_DISHES:
      return Object.assign({}, state, { 
        dishes: action.menu,
      });
    case UPDATE_DISH:
      return Object.assign({}, state, {
        dishes: state.dishes.map((dish) => {
          if(dish._id === action.dish._id) {
            return action.dish
          } else {
            return dish;
          }
        })
      });
    case DELETE_DISH:
      let { index } = action;
      return Object.assign({}, state, {
        dishes: [...state.dishes.slice(index), ...state.dishes.slice(index+1)]
      });
    default:
      return state;
  }

};