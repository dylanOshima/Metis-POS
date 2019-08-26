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

const initialState = {
  isFetching: false,
  serverName: null,
  servers: [],
  // error: null
};

export default function serverReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_SERVER_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case ADD_SERVER_SUCCESS:
      let { newServer } = action;
      return Object.assign({}, state, {
        isFetching: false,
        servers: [...state.servers, newServer]
      });
    case ADD_SERVER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        // error
      });
    case LOGIN_REQUEST:
        return Object.assign({}, state, { isFetching: true });
    case LOGIN_SUCCESS:
      let { serverName } = action;
      return Object.assign({}, state, {
        isFetching: false,
        serverName
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        // error
      });
    case LOAD_SERVERS:
      let { servers } = action;
      return Object.assign({}, state, {
        servers
      });
    case DELETE_SERVER:
      let { index } = action;
      return Object.assign({}, state, {
        servers: [...state.servers.slice(index), ...state.servers.slice(index+1)]
      });
    case UPDATE_SERVER:
      let { userID, updatedUser } = action;
      return Object.assign({}, state, {
        servers: state.servers.map((server) => {
          if(server.id === userID) {
            return updatedUser
          } else {
            return server;
          }
        })
      });
    case LOGOUT:
      return Object.assign({}, state, { serverName: null });
    default:
      return state;
  }
};