import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import ModalTitle from '../../../components/modal/modalTitle';

class Template extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        }

        this.toggle = this.toggle.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            isOpen: props.isOpen
        }
    }

    toggle(){
        this.props.close();
    }

    render(){
        return(
            <Modal isOpen={this.state.isOpen} toggle={this.toggle} backdrop={true} zIndex={9999999}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <ModalTitle title={"Title Goes Here"} toggle={this.toggle} />

                </ModalBody>
            </Modal>
        )
    }

}

export default Template;