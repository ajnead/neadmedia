import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';

class PopUp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            open: false,
            title: '',
            component: null,
        }

        this.toggle = this.toggle.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            title: props.title,
            component: props.component
        }
    }


    toggle(){
        this.setState({
            open: !this.state.open
        })
    }

    render(){
        return(
            <Modal isOpen={this.state.open} toggle={this.toggle} backdrop={true} zIndex={9999999}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <Row className="no-margin">
                        <Col xs="10">
                            <h4>{this.state.title}</h4>
                        </Col>
                        <Col xs="2">
                            <div className = "modal-exit float-right" onClick = {this.toggle}></div>
                        </Col>
                    </Row>
                    <div>
                        {this.state.component}
                    </div>
                </ModalBody>
            </Modal>
        )
    }

}

export default PopUp;