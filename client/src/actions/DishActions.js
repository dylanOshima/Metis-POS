// import axios from '../utils/API_Ref';
import api from 'axios';
import { 
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  ADD_DISH_FAILURE,
  LOAD_DISHES,
  UPDATE_DISH,
  DELETE_DISH
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
      .then( activeDish => {
        dispatch({
          type: ADD_DISH_SUCCESS,
          activeDish
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
  return dispatch => api.client.get("/menu")
    .then(menu => {
      dispatch({
        type: LOAD_DISHES,
        menu
      })
    }).catch(error => {
      // throw error
      console.error("problem loading dishes: ", error)
    })
}


export function updateDish() {
  // TODO: Add backend for this
  // return dispatch => api.client.put("/menu")
  //   .then(menu => {
  //     dispatch({
  //       type: UPDATE_DISH,
  //       menu
  //     })
  //   }).catch(error => {
  //     // throw error
  //   })
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