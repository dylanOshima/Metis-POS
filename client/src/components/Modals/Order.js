// Modal that displays ordering confirmation or error
//information comes from app.js where it passes the message to display.

import React from 'react'
import { Modal } from 'react-bootstrap';

const OrderModal = props => {
    return(
        <Modal show onHide={props.orderClose}>
            <Modal.Header closeButton>
                Order submission
            </Modal.Header>
            <Modal.Body>
                {props.orderMessage}
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    )
}

export default OrderModal;