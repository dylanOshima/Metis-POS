import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../constants/ActionTypes';

/* Creates a SHOW_MODAL action.
 * modalType: String, 
 * modalProps: Obj
*/
export function showModal(modalType, modalProps) {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps
  }
}

export function hideModal() {
  return { type: HIDE_MODAL }
}