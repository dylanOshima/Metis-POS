import {
  UPDATE_PAGE,
  THROW_ERROR,
  RESOLVE_ERROR,
} from '../constants/ActionTypes';

export function updatePage(page) {
  return {type: UPDATE_PAGE, page}
}

export function throwError(error) {
  return {type: THROW_ERROR, error}
}

export function resolveError() {
  return {type: RESOLVE_ERROR}
}