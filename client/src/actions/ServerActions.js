import { setAPIToken, server as api, } from '../utils/API_Ref' ;
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

    return api.postServer(newServer)
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

    return api.getServers().then(servers => {
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


export function updateServer(server) {
  return dispatch => api.putServer(server).then(response => {
      dispatch({
        type: UPDATE_SERVER,
        userID: server._id,
        updatedUser: server
      })
    }).catch(error => {
      // throw error
    })
}

export function deleteServer(server) {
  return dispatch => api.deleteServer(server).then(() => {
      dispatch({
        type: DELETE_SERVER,
        index: server._id
      })
    }).catch(error => {
      // throw error
      console.error("problem deleting server: ", error)
    })
}

export function login(payload) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    return api.login(payload).then(response => {
      let { data, accessToken } = response.data;
      let server;
      if(typeof data.name === 'string' && data.name.length > 0){
        server = data;
        setAPIToken(accessToken);
      } else {
        server = null;
      }
      dispatch({
        type: LOGIN_SUCCESS,
        server: server,
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