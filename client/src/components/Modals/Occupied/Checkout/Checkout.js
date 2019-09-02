import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ListGroup, ListGroupItem, DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
// import Hoc from '../../../Hoc/Hoc';
import { checkout, resetTable } from '../../../../actions/OrderActions';
import { hideModal } from '../../../../actions/ModalActions';

//initial state 
const initialState = {
    paymentMethod: "Payment Method",
    amountTendered: "",
    card: {
        cardNumber: "",
        cardExp: "",
        cvc: ""
    }
};


class Checkout extends Component {
    state = initialState;
    
    payment = method => {
        this.setState({paymentMethod: method})
    }
    handleAmountChange=(event) => {
        //could use some validation if time allows
        this.setState({amountTendered: event.target.value})
    }
    handleCreditChange=(event) => {
        //could use some validation if time allows
        let card={...this.state.card}
        card.cardNumber = event.target.value
        this.setState({card: card})
    }
    handleExpChange=(event) => {
        //could use some validation if time allows
        let card = { ...this.state.card }
        card.cardExp = event.target.value
        this.setState({ card: card })
    }
    handleCvcChange=(event) => {
        //could use some validation if time allows
        let card = { ...this.state.card }
        card.cvc = event.target.value
        this.setState({ card: card })
    }

    submitPayment=()=>{
        let paymentObject = Object.assign({}, this.state, {
            id: this.props.table.pendingOrder
        })

        this.props.checkout(paymentObject);
        this.props.hideModal();

        //reset the state
        this.props.resetTable(this.props.table.name);
        this.setState(initialState);
    }


    render() {
        //conditional rendering based on the pulldown menu
        let paymentMethodRender = null;
        switch(this.state.paymentMethod){
            
            case("Cash"):
            paymentMethodRender = (
                <div>
                    <FormControl 
                    type="text" 
                    value={this.state.amountTendered} 
                    placeholder="Cash Tendered" 
                    onChange={this.handleAmountChange}/>
                    <Button 
                    bsSize="large" 
                    bsStyle="info" 
                    onClick={this.submitPayment}>Submit</Button>
                </div>
            )
            break;

            case("Payment Method"):
            paymentMethodRender = (
                <Button 
                bsSize="large" 
                bsStyle="info" 
                disabled>Submit</Button>
            )
            break;

            // all non cash (credit)
            default:
            paymentMethodRender = (
                <div>
                    <div>
                        <ControlLabel> Amount Tendered </ControlLabel>
                        <FormControl 
                        type="text" 
                        value={this.state.amountTendered} 
                        placeholder="Credit Tendered" 
                        onChange={this.handleAmountChange} />
                    </div>
                    <div>
                        <ControlLabel>Card Number</ControlLabel>
                        <FormControl 
                        type="text" 
                        value={this.state.card.cardNumber} 
                        placeholder="Card Number" 
                        onChange={this.handleCreditChange} />
                    </div>
                    <div>
                        <ControlLabel>Card Expiration</ControlLabel>
                        <FormControl 
                        type="text" 
                        bsSize="small" 
                        value={this.state.card.cardExp} 
                        placeholder="Card Expiration" 
                        onChange={this.handleExpChange} />
                    </div>
                    <div>
                        <ControlLabel>Card CVC</ControlLabel>
                        <FormControl 
                        type="text" 
                        bsSize="small" 
                        value={this.state.card.cvc} 
                        placeholder="CVC" 
                        onChange={this.handleCvcChange} />
                    </div>
                    <Button bsSize="large" 
                    bsStyle="info" 
                    onClick={this.submitPayment}>Submit</Button>
                </div>
            )
        }
        return (
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Body>
                    <ListGroup>
                        <ListGroupItem> Server: {this.props.order.server} </ListGroupItem>
                        <ListGroupItem>ID: {this.props.order._id}</ListGroupItem>
                        <ListGroupItem>Total: {this.props.order.total}</ListGroupItem>
                    </ListGroup>
                    <form>
                        <FormGroup>
                            <DropdownButton 
                            id="checkoutDropDown" 
                            title={this.state.paymentMethod}>
                                <MenuItem 
                                value="VISA" 
                                onSelect={() => this.payment("VISA")}>VISA
                                </MenuItem>

                                <MenuItem 
                                value="MasterCard" 
                                onSelect={() => this.payment("MasterCard")}>MasterCard
                                </MenuItem>

                                <MenuItem 
                                value="AMEX" 
                                onSelect={() => this.payment("AMEX")}>AMEX
                                </MenuItem>

                                <MenuItem 
                                value="Diners Club" 
                                onSelect={() => this.payment("Diners Club")}>Diners Club
                                </MenuItem>
                                <MenuItem 
                                value="Cash" 
                                onSelect={() => this.payment("Cash")}>Cash
                                </MenuItem>
                            </DropdownButton>

                            {paymentMethodRender}

                        </FormGroup>
                    </form>
                </Modal.Body>
            </Modal.Dialog>
            </div>
        )
    }   
}
export default connect(null, {
    resetTable,
    hideModal,
    checkout
})(Checkout);
