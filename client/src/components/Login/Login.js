// This component generates the login screen for the PoS.
// Uses react-bootstrap for CSS styling
// API import handles the API routes to express
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Modal, Well, Button, FormControl } from 'react-bootstrap';
import Mousetrap from 'mousetrap';

import { login } from '../../actions/ServerActions';
import { loadServers } from '../../actions/ServerActions';

class Login extends Component {
    //Code is updated with the server code that is being entered
    state = {
        code: "",
        name: "",
        showModal: false,
        error: null,
    }

    componentDidMount = () => {
        //------- Load Servers
        this.props.loadServers();
        //------- Add Keybindings
        // Number keys
        for(let i=0;i<10;i++){
            Mousetrap.bind(''+i, () => {
                this.setState({ code: this.state.code + i });
            })
        }
        // Remove
        Mousetrap.bind('backspace', () => {
            this.setState({ code: this.state.code.slice(0,-1) })
        });
        // Submit
        Mousetrap.bind('enter', () => {
            this.userCheck();
            return false;
        });
    }

    componentWillUnmount = () => {
        // Unbind
        for(let i=0;i<10;i++){
            Mousetrap.unbind(''+i);
        }
        Mousetrap.unbind('enter');
        Mousetrap.unbind('backspace');
    }
    
    // As the code is entered this function updates state to match the current code entry
    enterId = event =>{
        let code = this.state.code + event.target.value
        this.setState({ 
            code,
            error: null,
        });
    }

    enterServer = server =>{
        this.setState({            
            name: server.name,
            showModal: false,
            error: null,
        });
    }

    pickServerToggle = () => {
        this.setState({
            showModal: !this.state.showModal,
            error: null,
        })
    }

    //Called when login is clicked, calls the login API route to validate user.
    //Empties the code so that it blanks out on each attempt
    userCheck = () => {
        let { code, name } = this.state;
        if(!code) this.setState({error: "Please input a code"})
        else if(!name) this.setState({error: "Please pick a name"})
        else {
            this.props.login({ code, name });
            this.setState({ 
                code: "", 
                name: "",
                error: null,
            });
        }
    }
    
    //Renders the login page with a 10 digit keypad with display and login button
    render(){
        let userSelectStyle = this.state.name ? "success" : "primary";

        return (
        <Grid>
            <Col xs={1} />
                <Col lg={3} xs={4}>
                    <Well>  
                        {this.state.error ? (
                            <Row>
                                <div style={{'color':'red', 'float':'right'}}>
                                    {this.state.error}
                                </div>
                            </Row>
                        ): null}
                        <Row>
                            <Col xs={2}> user: </Col>
                            <Col xs={8}>
                                <Button
                                bsStyle={userSelectStyle} 
                                onClick={this.pickServerToggle}>
                                    {this.state.name||"select!"}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>id:</Col>
                            <Col xs={8}>
                                <FormControl
                                    type="text"
                                    name="id"
                                    value={this.state.code}
                                    disabled="disabled"
                                />
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col lg={3} xs={4}>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="1">1</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="4">4</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="7">7</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="0">0</Button></Row>
                            </Col>
                            <Col lg={3} xs={4}>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="2">2</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="5">5</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="8">8</Button></Row>
                            </Col>
                            <Col lg={3} xs={4}>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="3">3</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="6">6</Button></Row>
                                <Row><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)} value="9">9</Button></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}><Button bsSize="large" bsStyle="success" onClick={() => this.userCheck()}>Login</Button></Col>
                        </Row>
                    </Well>

                </Col>
                <Modal show={this.state.showModal} onHide={this.pickServerToggle}>
                    <Modal.Header closeButton>Select User</Modal.Header>
                    <Modal.Body>
                        <ul>
                            {this.props.servers.map((server, index) => {
                                return(
                                    <li key={index}>
                                        <Button bsSize="large" bsStyle="info" onClick={() => this.enterServer(server)} value={server.name}>
                                            {server.name}
                                        </Button>
                                    </li>
                                )
                            })}
                        </ul>
                    </Modal.Body>
                </Modal>
            <Col xs={7} />
        </Grid>
        )
    }
}

const mapStateToProps = state => ({
    servers: state.server.servers
})

export default connect(mapStateToProps, { login, loadServers })(Login);