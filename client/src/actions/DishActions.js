// import axios from '../utils/API_Ref';
import { menuCalls as api} from '../utils/API_Ref';
import { 
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  ADD_DISH_FAILURE,
  LOAD_DISHES,
  UPDATE_DISH,
  DELETE_DISH,
  LOAD_DISHES_CATEGORIES,
 } from '../constants/ActionTypes';

function validateDish(dish) {
  return Object.assign({}, dish, {
    cost: parseInt(dish.cost,10),
    markup: parseInt(dish.markup,10),
    retailPrice: parseInt(dish.cost,10) + parseInt(dish.markup,10),
    category: dish.category.toLowerCase(),
  });
}

export function addDish(dish) {
  return function(dispatch) {
    dispatch({ type: ADD_DISH_REQUEST });

    let newDish = validateDish(dish);

    return api.postMenu(newDish)
      .then(request => {
        dispatch({
          type: ADD_DISH_SUCCESS,
          activeDish: request.data
        })
      }).catch(error => {
        dispatch({
          type: ADD_DISH_FAILURE,
          error
        })
      })
  }
}

export function loadDish() {
  return dispatch => {
    return api.getMenu().then(response => {
        dispatch({
          type: LOAD_DISHES,
          menu: response.data,
        })
      }).catch(error => {
        // throw error
        console.error("problem loading dishes: ", error)
    })
  }
}


export function updateDish(dish) {
  let newDish = validateDish(dish);
  return dispatch => api.putMenu(newDish)
    .then(response => {
      dispatch({
        type: UPDATE_DISH,
        menu: response.data
      })
    }).catch(error => {
      // throw error
      console.log("problem updating dish: ", error);
    })
}

// index is the dishes index in the array
export function deleteDish(dish_id) {
  return dispatch => api.deleteMenu(dish_id)
    .then(response => {
      dispatch({
        type: DELETE_DISH,
        dish_id
      })
    }).catch(error => {
      // throw error
      console.error("problem deleting dish: ", error)
    })
}

// index is the dishes index in the array
export function loadDishCategories() {
  return dispatch => api.getMenuCategories()
    .then(response => {
      dispatch({
        type: LOAD_DISHES_CATEGORIES,
        categories: response.data
      })
    }).catch(error => {
      console.error("problem loading menu categories: ", error) // DEBUG
    })
}