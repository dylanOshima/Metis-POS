import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
import { addOrder, resetTable } from '../../../actions/OrderActions';
import { hideModal } from '../../../actions/ModalActions';

class newSeating extends Component {

    state = {
        chosenServer: "Select Server",
        guestNumber: "Select Number",
    }

    handleServerSelection = (server) => {
        this.setState({chosenServer: server});  
    }

    setGuests = (numOfGuests) => {
        this.setState({guestNumber: numOfGuests})
    }

    seatGuests = () => {
        let { chosenServer, guestNumber } = this.state;
        let seating = {};
        seating.server = chosenServer;
        seating.guests = guestNumber;
        seating.table = this.props.table.name;
        this.props.addOrder(seating);
        this.props.hideModal();
    }

    cancel = () => {
        this.props.resetTable(this.props.newTableIndex);
        this.props.hideModal();
    }

    render() {
        let disableButton = true;

        //if the values are both not the defaults, enable the button
        if (this.state.chosenServer !== "Select Server" 
        && this.state.guestNumber !== "Select Number") {
            disableButton = false;
        } else {
            disableButton = true; 
        }

        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{this.props.table.name} New Seating </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Seat New Customers:</p>
                        <DropdownButton 
                        bsSize="large" 
                        title={this.state.chosenServer} 
                        id="modalDropButtonServer">
                            {this.props.servers.map((server, index) => {
                                return (
                                    <MenuItem 
                                    key={server._id} 
                                    eventKey={server.name} 
                                    value={server.name} 
                                    onSelect={() => this.handleServerSelection(server.name)}> {server.name} 
                                    </MenuItem>
                                )
                            })}
                        </DropdownButton>
                        <p>Number of Guests</p>
                        <DropdownButton 
                        id="modalDropButtonGuests" 
                        title={this.state.guestNumber}>
                            <MenuItem 
                            value={1} onSelect={() => this.setGuests(1)}>1
                            </MenuItem>
                            <MenuItem 
                            value={2} onSelect={() => this.setGuests(2)}>2
                            </MenuItem>
                            <MenuItem 
                            value={3} onSelect={() => this.setGuests(3)}>3
                            </MenuItem>
                            <MenuItem 
                            value={4} onSelect={() => this.setGuests(4)}>4
                            </MenuItem>
                            <MenuItem 
                            value={5} onSelect={() => this.setGuests(5)}>5
                            </MenuItem>
                            <MenuItem 
                            value={6} onSelect={() => this.setGuests(6)}>6
                            </MenuItem>
                            <MenuItem 
                            value={7} onSelect={() => this.setGuests(7)}>7
                            </MenuItem>
                            <MenuItem 
                            value={8} onSelect={() => this.setGuests(8)}>8
                            </MenuItem>
                        </DropdownButton>

                        <Button 
                        onClick={() => this.seatGuests()} 
                        disabled={disableButton}> Submit</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                        onClick={this.cancel}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    table: state.order.tables[state.order.activeTableIndex],
    activeTableIndex: state.order.activeTableIndex,
    chosenServer: state.server.serverName,
    servers: state.server.servers,
})

export default connect(mapStateToProps, { 
    addOrder,
    hideModal,
    resetTable,
 })(newSeating);