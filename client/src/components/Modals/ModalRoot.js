import React from 'react';
import { connect } from 'react-redux';
import Order from './Order';
import Occupied from './Occupied/Occupied';
import Checkout from './Occupied/Checkout/Checkout';
import Print from './Occupied/Print/Print';
import NewSeating from './NewSeating/NewSeating';
import InventoryEntry from './AdminModals/InventoryEntry';

import { NEW_SEATING_MODAL,
  OCCUPIED_MODAL,
  ORDER_MODAL,
  CHECKOUT_MODAL,
  PRINT_RECEIPT_MODAL,
  EDIT_INVENTORY_ENTRY
} from '../../constants/ModalTypes';

const MODAL_COMPONENTS = {
  [NEW_SEATING_MODAL]: NewSeating,
  [OCCUPIED_MODAL]: Occupied,
  [ORDER_MODAL]: Order,
  [CHECKOUT_MODAL]: Checkout,
  [PRINT_RECEIPT_MODAL]: Print,
  [EDIT_INVENTORY_ENTRY]: InventoryEntry,
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(
  state => state.modal
)(ModalRoot)