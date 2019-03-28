import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Button } from 'reactstrap';
import Configs from '../../configs/configs';
import originTracer from '../../utilities/api/originTracer';
import DropDown from '../../components/inputs/dropDown';
import InputText from '../../components/inputs/inputText';
import ModalTitle from '../../components/modal/modalTitle';

class CreateAccount extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            identityClass: "customer",
            email: "",
            primaryName: "",
            secondaryName: ""
        }

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.createAccount= this.createAccount.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            isOpen: props.isOpen,
            identityClassOptions: props.identityClassOptions
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    toggle(){
        this.props.close();
    }

    createAccount(){
        var payload = {
            identityClassId: this.state.identityClass,
            primaryEmail: this.state.email,
            primaryName: this.state.primaryName,
            secondaryName: this.state.secondaryName
        }

        fetch(Configs.collectionApiUrl + '/identity/write?' + originTracer(), {
            method: 'POST',
            headers: {
                'Authorization': 'private',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(response => {
            var metaData = response.metadata;
            var status = metaData.status;

            if(status==="success"){
                console.log(response);
            }
        });
    }

    render(){
        return(
            <Modal isOpen={this.state.isOpen} toggle={this.toggle} backdrop={true} zIndex={9999999}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <ModalTitle title={"Create Account"} toggle={this.toggle} />
                    <Row>
                        <Col>
                            <DropDown
                                title="Identity Class"
                                name="identityClass"
                                value={this.state.identityClass}
                                options={this.state.identityClassOptions}
                                onChange={event => this.changeValue(event,"identityClass")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="email" 
                                title="Email" 
                                value={this.state.email} 
                                onChange={event => this.changeValue(event,"email")} 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="primaryName" 
                                title="First Name" 
                                value={this.state.primaryName} 
                                onChange={event => this.changeValue(event,"primaryName")} 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="secondaryName" 
                                title="Last Name" 
                                value={this.state.secondaryName} 
                                onChange={event => this.changeValue(event,"secondaryName")} 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button 
                                className="bg-color-second no-border" 
                                block 
                                onClick={this.createAccount}>
                                Create Account
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }
}

export default CreateAccount;