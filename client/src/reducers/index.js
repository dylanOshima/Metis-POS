import { combineReducers } from 'redux';
import { orderReducer } from './OrderReducer';
import { dishReducer } from './DishReducer';
import { serverReducer } from './ServerReducer';

const rootReducer = combineReducers({
  orderReducer,
  dishReducer,
  serverReducer
});

export default rootReducer;