// Reciept Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React from 'react'
import { Row,Col,Modal, Button } from 'react-bootstrap';

const align = {
    textAlign: "right"
};


// Loops through the reciept items to display them individually and put them in Row Col form 
const createReceipt = (items) => {
    return(
        items.map(item => {
            return(
                <Row key={item.name}>

                    <Col md={3} style={align}>
                        {item.name}
                    </Col>

                    <Col md={3}>
                        {item.quantity}
                    </Col>

                    <Col style={align} md={3}>
                    ${parseFloat(item.charge).toFixed(2)}
                    </Col>

                </Row>
            );
        })
    )
}

// Renders headers and costs.
const print = props => {
    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col 
                        md={3}>
                            <h3>Item</h3>
                        </Col>
                        <Col 
                        md={3}>
                            <h3>#</h3>
                        </Col>
                        <Col 
                        md={3}>
                            <h3>Cost</h3>
                        </Col>  
                    </Row>
                        {createReceipt(props.order.items)}
                    <Row>
                        <Col mdOffset={4}  md={5} style={align}>
                            <h4>Sub-Total: ${parseFloat(props.order.sub_total).toFixed(2)}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={4} md={5} style={align}>
                            <h4>Tax: ${parseFloat(props.order.tax).toFixed(2)}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={4} md={5} style={align}>
                            <h4>Total: ${parseFloat(props.order.total).toFixed(2)}</h4>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.cancel()}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default print;
