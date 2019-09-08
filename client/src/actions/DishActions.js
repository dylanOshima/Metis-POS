// import axios from '../utils/API_Ref';
import api from '../utils/API_Ref';
import { 
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  ADD_DISH_FAILURE,
  LOAD_DISHES,
  UPDATE_DISH,
  DELETE_DISH,
  LOAD_DISHES_CATEGORIES,
 } from '../constants/ActionTypes';

export function addDish(dish) {
  return function(dispatch) {
    dispatch({ type: ADD_DISH_REQUEST });

    let newDish = {};
    newDish.name = dish.name
    newDish.description = dish.description;
    newDish.cost = parseInt(dish.cost,10);
    newDish.category = dish.category;

    return api.client.post("/menu/add", newDish)
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
    return api.client.get("/menu")
      .then(response => {
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
  // TODO: Add backend for this
  return dispatch => api.client.put(`/menu/${dish._id}`)
    .then(response => {
      dispatch({
        type: UPDATE_DISH,
        menu: dish
      })
    }).catch(error => {
      // throw error
    })
}

// index is the dishes index in the array
export function deleteDish(dish, index) {
  let URL = encodeURI("/check/"+dish._id);
  return dispatch => api.client.delete('/menu/' + URL)
    .then(response => {
      dispatch({
        type: DELETE_DISH,
        index
      })
    }).catch(error => {
      // throw error
      console.error("problem deleting dish: ", error)
    })
}

// index is the dishes index in the array
export function loadDishCategories() {
  return dispatch => api.client.get('/menu/categories/')
    .then(response => {
      dispatch({
        type: LOAD_DISHES_CATEGORIES,
        categories: response.data
      })
    }).catch(error => {
      console.error("problem loading menu categories: ", error) // DEBUG
    })
}