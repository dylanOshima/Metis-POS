import {
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_MODAL_PROPS,
} from '../constants/ActionTypes';

const initialState = {
  modalType: null,
  modalProps: {}
}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      }
    case HIDE_MODAL:
      return initialState
    case UPDATE_MODAL_PROPS:
      return Object.assign({}, state, {
        modalProps: Object.assign({}, state.modalProps, action.newProps)
      })
    default:
      return state
  }
}