import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { showModal, hideModal } from '../../../actions/ModalActions';
import { updatePage } from '../../../actions/AppActions';
import { ORDERS_PAGE } from '../../../constants/PageTypes';
import {
    CHECKOUT_MODAL,
    PRINT_RECEIPT_MODAL
} from '../../../constants/ModalTypes';

const occupied = props => {
    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{props.table.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Guests: {props.table.guestNumber} </Modal.Body>
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
                        order: props.order 
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
                <Modal.Footer>
                    <Button 
                    onClick={props.hideModal}>Close
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}
// click(), submitPayment, close,
const mapStateToProps = state => {
    let table = state.order.tables[state.order.activeTableIndex];
    return{ 
        order: state.order.orders[table.pendingOrder],
        table
    }
}

export default connect(mapStateToProps, { 
    showModal, 
    hideModal,
    updatePage,
})(occupied);