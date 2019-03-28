import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

class OpenModal extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} zIndex={9999999}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <Row className="no-margin">
                        <Col xs="10">
                            <h3>Create Account</h3>
                        </Col>
                        <Col xs="2">
                            <div className = "modal-exit float-right" onClick = {this.props.toggle}></div>
                        </Col>
                    </Row>
                    {this.props.component}
                </ModalBody>
            </Modal>
        )
    }
}

export default OpenModal;