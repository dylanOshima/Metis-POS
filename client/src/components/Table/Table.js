import React from 'react';
import { Col, Row, Grid, Jumbotron, Panel } from 'react-bootstrap';
// import Aux from '../Hoc/Hoc'
import { connect } from 'react-redux';
import './Table.css';

import { NEW_SEATING_MODAL, OCCUPIED_MODAL } from '../../constants/ModalTypes';
import { showModal } from '../../actions/ModalActions';
import { setTable } from '../../actions/OrderActions';

const table = props => {
        const handleTableClick = (item) => {
            let newTableIndex = null;
            props.tables.map((table, index) => {
                if (table.name === item) {
                    newTableIndex = index;
                    props.setTable(newTableIndex);
                    if(table.isOccupied){
                        props.showModal(OCCUPIED_MODAL);
                    } else {
                        props.showModal(NEW_SEATING_MODAL);
                    }
                } 
                return table;
            })
        }

        return(
            <Grid fluid>
                <Grid>
                    <Jumbotron 
                    className="text-center dinerTitle">
                        <h1> Mel's Diner </h1>
                        <h2> Select a table to perform functions </h2>
                    </Jumbotron>
                    <Row>
                        {props.tables.map( (table)=>{
                        return (
                            <Col 
                            className="tablePanels" 
                            md={3} 
                            xs={2} 
                            key={table.name}>
                                <Panel 
                                className="tablePanels" 
                                onClick={()=> handleTableClick(table.name)} 
                                bsStyle={ table.isOccupied? "danger" : "success" }>
                                    <Panel.Heading 
                                    className="tablePanel" >
                                        <Panel.Title>
                                            <h3 
                                            className="text-center">{table.name}
                                            </h3>
                                        {table.isOccupied ?  
                                            (
                                            // IS OCCUPIED RENDER
                                            <div>
                                                <p 
                                                className="text-center"> Guests: {table.guestNumber} 
                                                </p>
                                                <p 
                                                className="text-center"> Server: {table.server} 
                                                </p>
                                                <p 
                                                className="text-center"> Receipt ID: {table.pendingOrder} 
                                                </p>
                                            </div>
                                            )
                                            :(
                                            // NOT OCCUPIED RENDER
                                                <h3 
                                                className="text-center"> Table Open 
                                                </h3>)}
                                    </Panel.Title>
                                </Panel.Heading>
                            </Panel>
                        </Col>
                        )
                    })
                    }
                    </Row>
                </Grid>
            </Grid> 
            )
        }

const mapStateToProps = (state, ownProps) => ({
    tables: state.order.tables,
    chosenServer: state.server.serverName,
    servers: state.server.servers
})

export default connect(mapStateToProps, { setTable, showModal })(table);

        