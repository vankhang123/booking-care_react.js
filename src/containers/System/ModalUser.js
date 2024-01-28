import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter"

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmiiter();
    }
    listenToEmiiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }// bus event 
    componentDidMount() {
        console.log('mouting modal ');
    }
    toggle = () => {
        this.props.toggleformParent();
    }
    handleOnchangeInput = (event, id) => {
        // bad code(modify state:thay doi )
        /* this.state = {
         email:'',
         password:
         }
         this.state.email === this.state['email']
        // */
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state:', this.state)
        // })
        // good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });


    }

    checkkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parmameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkkValidateInput();
        if (isValid === true) {
            // call api create modal.
            console.log('check props child', this.props);
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            >

                <ModalHeader toggle={() => { this.toggle() }}> create a new user  </ModalHeader>
                <ModalBody>

                    <div className="modal-user-body ">

                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email} />
                        </div>

                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password} />
                        </div>

                        <div className="input-container">
                            <label>First name</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName} />
                        </div>

                        <div className="input-container">
                            <label>Last name</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName} />
                        </div>

                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address} />
                        </div>

                    </div>




                </ModalBody>

                <ModalFooter>
                    <Button color="primary" className="px-3"
                        onClick={() => { this.handleAddNewUser() }}>Add new</Button> {' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>


            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

