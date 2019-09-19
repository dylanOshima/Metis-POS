import React from 'react';
import { connect } from 'react-redux';

import Order from './Order';
import Occupied from './Occupied/Occupied';
import Checkout from './Occupied/Checkout/Checkout';
import Print from './Occupied/Print/Print';
import NewSeating from './NewSeating/NewSeating';
import InventoryEntry from './AdminModals/InventoryEntry';
import MultiPicker from './AdminModals/MultiPicker';
import MenuItem from './AdminModals/MenuItem';
import PickDish from './AdminModals/PickDish';

import { hideModal, updateModal } from '../../actions/ModalActions'

import { NEW_SEATING_MODAL,
  OCCUPIED_MODAL,
  ORDER_MODAL,
  CHECKOUT_MODAL,
  PRINT_RECEIPT_MODAL,
  EDIT_INVENTORY_ENTRY,
  OPEN_MULTI_PICKER,
  EDIT_MENU_ITEM,
  PICK_DISH
} from '../../constants/ModalTypes';

const MODAL_COMPONENTS = {
  [NEW_SEATING_MODAL]: NewSeating,
  [OCCUPIED_MODAL]: Occupied,
  [ORDER_MODAL]: Order,
  [CHECKOUT_MODAL]: Checkout,
  [PRINT_RECEIPT_MODAL]: Print,
  [EDIT_INVENTORY_ENTRY]: InventoryEntry,
  [OPEN_MULTI_PICKER]: MultiPicker,
  [EDIT_MENU_ITEM]: MenuItem,
  [PICK_DISH]: PickDish,
}

const ModalRoot = ({ modalType, modalProps, hideModal, updateModal}) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal 
      updateModal={updateModal} 
      hideModal={hideModal} 
      {...modalProps} 
    />
}

export default connect(
  state => state.modal, 
  { hideModal, updateModal }
)(ModalRoot)