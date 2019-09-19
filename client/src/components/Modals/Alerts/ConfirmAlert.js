import React from 'react';
import { Modal, Button, Row, Grid } from 'react-bootstrap';

const Confirm = props => {
  return (
    <Modal.Dialog bsSize="small" >
      <Modal.Body><h2>Are you sure?</h2></Modal.Body>
      <Modal.Footer>
          <Row>
            <Button
              bsSize="large"
              bsStyle="success"
              onClick={() => {
                props.onConfirm();
                props.hideModal();
              }}>
              Confirm
            </Button>
            <Button
              bsSize="large"
              bsStyle="danger"
              onClick={props.hideModal}>
              Cancel
            </Button>
          </Row>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Confirm;