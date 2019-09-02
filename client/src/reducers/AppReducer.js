import {
  UPDATE_PAGE,
  THROW_ERROR,
  RESOLVE_ERROR,
} from '../constants/ActionTypes';

import {
  TABLES_PAGE,
} from '../constants/PageTypes';

const initialState = {
  activePage: TABLES_PAGE,
  error: null,
}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE:
      return { activePage: action.page };
    case THROW_ERROR:
      return { error: action.error };
    case RESOLVE_ERROR:
      return { error: null };
    default:
      return state
  }
}