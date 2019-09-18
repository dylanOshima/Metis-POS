import { 
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  ADD_DISH_FAILURE,
  LOAD_DISHES,
  UPDATE_DISH,
  DELETE_DISH,
  LOAD_DISHES_CATEGORIES,
 } from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  dishes: [],
  activeDish: null,
  categories: [],
  names: []
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
        names: action.menu.map(dish => dish.name)
      });
    case UPDATE_DISH:
      return Object.assign({}, state, {
        dishes: state.dishes.map((dish) => {
          if(dish._id === action.menu._id) {
            return action.menu
          } else {
            return dish;
          }
        })
      });
    case DELETE_DISH:
      return Object.assign({}, state, {
        dishes: state.dishes.filter(dish => dish._id !== action.dish_id)
      });
    case LOAD_DISHES_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.categories
      })
    default:
      return state;
  }

};