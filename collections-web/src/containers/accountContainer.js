import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import InputText from '../components/inputs/inputText';
import DropDown from '../components/inputs/dropDown';
import CreateAccount from '../models/identity/createAccount.modal';
import ViewIdentities from '../models/identity/viewIdentities';

class AccountContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            identityClass: "all",
            email: "",
            identityInstanceId: "",
            createAccountModalOpen: false
        }

        this.identityClassOptions = [
            {
                id: "all",
                value: "All"
            },
            {
                id: "retailer",
                value: "Retailer"
            },
            {
                id: "brand",
                value: "Brand"
            },
            {
                id: "customer",
                value: "Customer"
            },
            {
                id: "staff",
                value: "Staff"
            },
            {
                id: "application",
                value: "Application"
            }
        ]

        this.createAccountModalToggle = this.createAccountModalToggle.bind(this);
    }

    createAccountModalToggle(){
        this.setState({
            createAccountModalOpen: !this.state.createAccountModalOpen
        })
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    render(){
        return(
            <Container fluid className = "padding-top-10">
                <Row>
                    <Col>
                        <div>
                            <h3 className="float-left">Accounts</h3>
                            <div className="add-bttn-35-35 float-left margin-left-10">
                                <div className="icon-add" onClick={this.createAccountModalToggle}></div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DropDown
                            title="Identity Class"
                            name="identityClass"
                            value={this.state.identityClass}
                            options={this.identityClassOptions}
                            onChange={event => this.changeValue(event,"identityClass")}
                        />
                    </Col>
                    <Col>
                        <InputText 
                            name="email" 
                            title="Email" 
                            value={this.state.email} 
                            onChange={event => this.changeValue(event,"email")} 
                        />
                    </Col>
                    <Col>
                        <InputText 
                            name="identityInstanceId" 
                            title="Identity ID" 
                            value={this.state.identityInstanceId} 
                            onChange={event => this.changeValue(event,"identityInstanceId")} 
                        />
                    </Col>
                    <Col>
                        <Button className="bg-color-second no-border margin-top-33" block>Search</Button>
                    </Col>
                </Row>
                <ViewIdentities />
                <CreateAccount 
                    isOpen={this.state.createAccountModalOpen} 
                    close={this.createAccountModalToggle} 
                    identityClassOptions={this.identityClassOptions}
                />
            </Container>
        )
    }

}

export default AccountContainer;