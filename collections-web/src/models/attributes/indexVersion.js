import React from 'react';
import { Modal, ModalFooter, Button } from 'reactstrap';

class IndexVersion extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isComplete: true,
            modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }

    componentDidUpdate(){
        var open = this.props.open;
        if(open&&!this.state.modal){
            this.toggle();
            this.props.onClose();
        }
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    render(){
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={true} zIndex={999999}>
                <ModalFooter>
                    <Button className="bg-color-second no-border" block>Confirm Reindex Version</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default IndexVersion;