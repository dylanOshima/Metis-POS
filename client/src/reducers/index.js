import { combineReducers } from 'redux';
import orderReducer from './OrderReducer';
import dishReducer from './DishReducer';
import serverReducer from './ServerReducer';
import modalReducer from './ModalReducer';
import appReducer from './AppReducer';
import inventoryReducer from './InventoryReducer';

const rootReducer = combineReducers({
  order: orderReducer,
  dish: dishReducer,
  server: serverReducer,
  modal: modalReducer,
  app: appReducer,
  inventory: inventoryReducer
});

export default rootReducer;