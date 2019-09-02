import api from '../utils/API_Ref';
import { 
  ADD_SERVER_REQUEST,
  ADD_SERVER_SUCCESS,
  ADD_SERVER_FAILURE,
  LOAD_SERVERS_SUCCESS,
  LOAD_SERVERS_REQUEST,
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
      .then(request => {
        dispatch({
          type: ADD_SERVER_SUCCESS,
          newServer: request.data
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
  return function(dispatch) {
    dispatch({ type: LOAD_SERVERS_REQUEST });

    return api.client.get("/servers")
    .then(servers => {
      dispatch({
        type: LOAD_SERVERS_SUCCESS,
        servers: servers.data
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
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    return api.client.get(`/servers/login/${code}`)
    .then(request => {   
      let server = request.data;       
      if(typeof server === 'string' && server.length > 0){
        server = request.data;
      } else {
        server = null;
      }
      dispatch({
        type: LOGIN_SUCCESS,
        serverName: server
      });
        
    }).catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        error
      });
    })
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}