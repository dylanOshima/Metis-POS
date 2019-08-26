import api from 'axios';
import { 
  ADD_SERVER_REQUEST,
  ADD_SERVER_SUCCESS,
  ADD_SERVER_FAILURE,
  LOAD_SERVERS,
  UPDATE_SERVER,
  DELETE_SERVER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
 } from '../constants/ActionTypes';

export function addServer(server) {
  return function(dispatch) {
    dispatch({ type: ADD_SERVER_REQUEST });

    let newServer={};
    newServer.name = server.name;
    newServer.code = server.code;

    return api.client.post("/servers/add", newServer)
      .then(newServer => {
        dispatch({
          type: ADD_SERVER_SUCCESS,
          newServer
        })
      }).catch(error => {
        dispatch({
          type: ADD_SERVER_FAILURE,
          error
        })
      })
  }
}

export function loadServers() {
  return dispatch => {
    return api.client.get("/servers")
    .then(servers => {
      dispatch({
        type: LOAD_SERVERS,
        servers
      })
    }).catch(error => {
      // throw error
      console.error("problem loading dishes: ", error)
    })
  }
}


export function updateServer() {
  // TODO: Add backend for this
  // return dispatch => api.client.put("/menu")
  //   .then(menu => {
  //     dispatch({
  //       type: UPDATE_DISH,
  //       userID,
  //       updatedUser
  //     })
  //   }).catch(error => {
  //     // throw error
  //   })
}

// index is the dishes index in the array
export function deleteServer(dish, index) {
  // return dispatch => api.client.delete(`/menu/${dish._id}`)
  //   .then(response => {
  //     dispatch({
  //       type: DELETE_DISH,
  //       index
  //     })
  //   }).catch(error => {
  //     // throw error
  //     console.error("problem deleting dish: ", error)
  //   })
}

export function login(code) {
  return function(dispatch) {
    dispatch({ type: LOGIN_REQUEST });

    return api.client.put(`/servers/login/${code}`)
    .then(serverName => {
      dispatch({
        type: LOGIN_SUCCESS,
        serverName
      })
    }).catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        error
      })
    })
  }
}

export function logout(dish, index) {
  return {
    type: LOGOUT,
  }
}