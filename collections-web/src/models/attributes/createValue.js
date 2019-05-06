import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AttributeRoutes from '../../controllers/attributeRoutes';
import DropDown from '../../components/inputs/dropDown';

class CreateValue extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            isCaseSensative: false,
            attributeId: 0,
            unit: "[none]",
            attributeValueOrder: "",
            value: ""
        }

        this.trueFalse = [
            {
                value: "true",
                id: true
            },
            {
                value: "false",
                id: false
            }
        ]

        this.toggle = this.toggle.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.createValue = this.createValue.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            isOpen: props.isOpen,
            attributeId: props.attributeId
        }
    }

    valueChange(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    toggle() {
        this.props.close();
    }

    createValue(){
        var payload = {
            isCaseSensative: this.state.isCaseSensative,
            attributeId: this.state.attributeId,
            unit: this.state.unit,
            attributeValueOrder: this.state.attributeValueOrder,
            value: this.state.value
        }

        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.postAttributeValue(payload,()=>{
            var response = attributeRoutes.returnParam;
            var status = response.metadata.status;
            
            if(status==="success"){
                //var attributeValueId = response.payload.attributeValueId;
                this.toggle();
                this.props.load(this.state.attributeId);
            }
        })
    }

    render(){
        return(
            <Modal isOpen={this.state.isOpen} toggle={this.toggle} backdrop={true} zIndex={9999999}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <Row className="no-margin">
                        <Col xs="10">
                            <h3>Create Attribute Value</h3>
                        </Col>
                        <Col xs="2">
                            <div className = "modal-exit float-right" onClick = {this.toggle}></div>
                        </Col>
                    </Row>
                    <Form>
                        <Row className="margin-top-15">
                            <Col>
                                <FormGroup>
                                    <DropDown 
                                        name="isCaseSensative" 
                                        title="Is Case Sensative" 
                                        value={this.state.isCaseSensative} 
                                        options={this.trueFalse} 
                                        onChange={event => this.valueChange(event,"isCaseSensative")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="unit">Unit</Label>
                                    <Input 
                                        type="text" 
                                        name="unit"
                                        id="unit" 
                                        value={this.state.unit} 
                                        onChange={event => this.valueChange(event,"unit")} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="attributeValueOrder">Attribute Value Order</Label>
                                    <Input 
                                        type="number" 
                                        name="attributeValueOrder"
                                        id="attributeValueOrder" 
                                        value={this.state.attributeValueOrder} 
                                        onChange={event => this.valueChange(event,"attributeValueOrder")} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="value">Value</Label>
                                    <Input 
                                        type="text" 
                                        name="value"
                                        id="value" 
                                        value={this.state.value} 
                                        onChange={event => this.valueChange(event,"value")} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    className="bg-color-second no-border" 
                                    block 
                                    onClick={this.createValue}>
                                    Create Attribute Value
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

}

export default CreateValue;