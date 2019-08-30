import { combineReducers } from 'redux';
import orderReducer from './OrderReducer';
import dishReducer from './DishReducer';
import serverReducer from './ServerReducer';
import modalReducer from './ModalReducer';

const rootReducer = combineReducers({
  order: orderReducer,
  dish: dishReducer,
  server: serverReducer,
  modal: modalReducer
});

export default rootReducer;