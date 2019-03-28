import React from 'react';
import { Modal, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateVersion extends React.Component {

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
                <ModalBody>
                    <FormGroup>
                        <Label for="versionNotes">Version Notes</Label>
                        <Input type="text" name="versionNotes" id="versionNotes" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className="bg-color-second no-border" block>Create New Attribute Version</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CreateVersion;