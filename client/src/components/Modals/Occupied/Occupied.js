import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { showModal } from '../../../actions/ModalActions';
import { updatePage } from '../../../actions/AppActions';
import { ORDERS_PAGE } from '../../../constants/PageTypes';
import { updateTotal } from '../../../utils/helper';
import {
    CHECKOUT_MODAL,
    PRINT_RECEIPT_MODAL
} from '../../../constants/ModalTypes';

const occupied = props => {
    return (
        <Modal show onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.table.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Guests: {props.table.guestNumber}
                <ButtonGroup vertical block>
                    <Button 
                    bsSize="large" 
                    bsStyle="success" 
                    onClick={() => {
                        props.updatePage(ORDERS_PAGE);
                        props.hideModal();
                        }}> Place Order 
                    </Button>
                    <Button 
                    bsSize="large" 
                    bsStyle="info" 
                    onClick={() => props.showModal(PRINT_RECEIPT_MODAL, { 
                        table: props.table, 
                        order: props.order,
                        cancel: () => props.hideModal()
                    })}> Print Check
                    </Button>
                    <Button 
                    bsSize="large" 
                    bsStyle="primary"
                    onClick={() => props.showModal(CHECKOUT_MODAL, { 
                        table: props.table, 
                        order: props.order,
                    })}> Checkout
                    </Button>
                </ButtonGroup>
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )
}
// click(), submitPayment, close,
const mapStateToProps = state => {
    let table = state.order.tables[state.order.activeTableIndex];
    return{ 
        order: updateTotal(state.order.orders[table.pendingOrder]), // TODO: This should be replaced by backend
        table
    }
}

export default connect(mapStateToProps, { 
    showModal, 
    updatePage,
})(occupied);