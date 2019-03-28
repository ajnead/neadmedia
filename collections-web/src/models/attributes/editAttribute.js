import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import AttributeRoutes from '../../controllers/attributeRoutes';
import Configs from '../../configs/configs';
import DropDown from '../../components/inputs/dropDown';
import InputText from '../../components/inputs/inputText';
import ifNull from '../../utilities/helpers/ifNull';
import originTracer from '../../utilities/api/originTracer';
import EditSynonym from './editSynonym';
import CreateValue from './createValue';

class EditAttribute extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            attributeId: 0,
            createValueModalOpen: false,
            attributeName: "",
            attributeJsonName: "",
            attributeStatus: "disabled",
            referenceModel: "",
            attributeFamily: "",
            attributeSubFamily: "",
            attributeDescription: "",
            minLength: 0,
            maxLength: 512,
            isDescriptor: false,
            isRequired: false,
            isGrouping: false,
            isFilter: false,
            isEnumerated: false,
            allowsFreeText: false,
            allowsMultipleValues: false,
            isOrdered: false,
            isDerived: false,
            dataType: "String",
            isDisplay: false,
            canEdit: false
        }

        this.data = {
            attributeValues : [ { 
                attributeSynonyms : [ {} ]
            } ]
        }

        this.attributeStatusOptions = [
            {
                value: "Active",
                id : "active"
            },
            {
                value: "Active Not External",
                id : "active_not_external"
            },
            {
                value: "Disabled",
                id : "disabled"
            }
        ]

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

        this.dataType = [
            {
                value: "String",
                id: "String"
            },
            {
                value: "Integer",
                id: "Integer"
            },
            {
                value: "Long",
                id: "Long"
            },
            {
                value: "Decimal",
                id: "BigDecimal"
            },
            {
                value: "Boolean",
                id: "Boolean"
            },
            {
                value: "DateTime",
                id: "DateTime"
            }
        ]

        this.clearAttributeEntries = this.clearAttributeEntries.bind(this);
        this.updateAttribute = this.updateAttribute.bind(this);
        this.attributeDescriptionChange = this.attributeDescriptionChange.bind(this);
        this.deleteAttributeValue = this.deleteAttributeValue.bind(this);
        this.createValueModalToggle = this.createValueModalToggle.bind(this);
        this.attributeStatusChange = this.attributeStatusChange.bind(this);
        this.load = this.load.bind(this);
    }

    componentDidUpdate(){
        this.getAttributeInformation();
    }

    /*
    static getDerivedStateFromProps(props){  
        return{
            canEdit: props.canEdit
        }
    }
    */

    createValueModalToggle(){
        this.setState({
            createValueModalOpen : !this.state.createValueModalOpen
        })
    }

    attributeStatusChange(event){
        this.setState({
            attributeStatus : event.target.value
        });
    }

    attributeDescriptionChange(event,id){
        this.setState({
            [id] : event.target.value
        });
    }

    getAttributeInformation(){
        var url = window.location.href;
        var urlParams = url.substring((url.indexOf("#")+1),url.length);
        var urlParamsArr = urlParams.split("&");
        var urlParamJson = [];
        
        for(var i = 0; i<urlParamsArr.length; i++){
            var exp = urlParamsArr[i];
            var keyValuePt = exp.indexOf("=");
            var key = exp.substring(0,keyValuePt);
            var value = exp.substring(keyValuePt + 1,url.length);
            urlParamJson[i] = {
                key : key,
                value : value
            }
        }

        for(var j = 0; j<urlParamJson.length; j++){
            var params = urlParamJson[j];
            if(params.key==="attributeId"){
                if(params.value!=this.state.attributeId){
                    if(params.value!=="0"){
                        this.load(params.value);
                    }else{
                        this.clearAttributeEntries();
                    }
                }
            }
        }
    }

    load(attributeId){
        fetch(Configs.collectionApiUrl + '/attribute/' + attributeId + '/read?viewType=all&' + originTracer(), {
            method: 'GET',
            headers: {
                'Authorization': 'private' 
            }
        })
        .then(response => response.json())
        .then(response => {
            var metaData = response.metadata;
            var status = metaData.status;

            if(status==="success"){
                this.data = response.payload;  
                this.setState({
                    attributeId: attributeId,
                    attributeName: response.payload.attributeName,
                    attributeJsonName: response.payload.attributeJsonName,
                    attributeStatus: response.payload.attributeStatus,
                    referenceModel: ifNull(response.payload.referenceModel),
                    attributeFamily: ifNull(response.payload.attributeFamily),
                    attributeSubFamily: ifNull(response.payload.attributeSubFamily),
                    attributeDescription: ifNull(response.payload.attributeDescription),
                    minLength: ifNull(response.payload.minLength),
                    maxLength: ifNull(response.payload.maxLength),
                    isDescriptor: ifNull(response.payload.isDescriptor),
                    isRequired: ifNull(response.payload.isRequired),
                    isGrouping: ifNull(response.payload.isGrouping),
                    isFilter: ifNull(response.payload.isFilter),
                    isEnumerated: ifNull(response.payload.isEnumerated),
                    allowsFreeText: ifNull(response.payload.allowsFreeText),
                    allowsMultipleValues: ifNull(response.payload.allowsMultipleValues),
                    isOrdered: ifNull(response.payload.isOrdered),
                    isDerived: ifNull(response.payload.isDerived),
                    dataType: ifNull(response.payload.dataType),
                    isDisplay: ifNull(response.payload.isDisplay)
                })
            }
        });
    }

    updateAttribute(){
        var payload = {
            attributeId: this.state.attributeId,
            attributeName: this.state.attributeName,
            attributeJsonName: this.state.attributeJsonName,
            attributeStatus: this.state.attributeStatus,
            referenceModel: this.state.referenceModel,
            attributeFamily: this.state.attributeFamily,
            attributeSubFamily: this.state.attributeSubFamily,
            attributeDescription: this.state.attributeDescription,
            minLength: this.state.minLength,
            maxLength: this.state.maxLength,
            isDescriptor: this.state.isDescriptor,
            isRequired: this.state.isRequired,
            isGrouping: this.state.isGrouping,
            isFilter: this.state.isFilter,
            isEnumerated: this.state.isEnumerated,
            allowsFreeText: this.state.allowsFreeText,
            allowsMultipleValues: this.state.allowsMultipleValues,
            isOrdered: this.state.isOrdered,
            isDerived: this.state.isDerived,  
            dataType: this.state.dataType,
            isDisplay: this.state.isDisplay
        }

        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.putAttribute(this.state.attributeId,payload,()=>{});
    }

    clearAttributeEntries(){
        this.state({
            attributeId: 0,
            attributeName: "",
            attributeJsonName: "",
            attributeStatus: "",
            referenceModel: "",
            attributeFamily: "",
            attributeSubFamily: "",
            attributeDescription: "",
            minLength: 0,
            maxLength: 512,
            isDescriptor: false,
            isRequired: false,
            isGrouping: false,
            isFilter: false,
            isEnumerated: false,
            allowsFreeText: false,
            allowsMultipleValues: false,
            isOrdered: false,
            isDerived: false,
            dataType: "String",
            isDisplay: false
        })
    }

    deleteAttributeValue(attributeValueId){
        fetch(Configs.collectionApiUrl + '/attribute/value/' + attributeValueId + '/delete?' + originTracer(), {
            method: 'DELETE',
            headers: {
                'Authorization': 'private' 
            }
        })
        .then(response => response.json())
        .then(response => {
            var metaData = response.metadata;
            var status = metaData.status;

            if(status==="success"){
                var valueArr = this.data.attributeValues;
                var didChange = false;
                for(var i=0; i<valueArr.length; i++){
                    var valueObj = valueArr[i];
                    if(valueObj.attributeValueId==attributeValueId){
                        valueArr.splice(i,1);
                        didChange = true;
                        break;
                    }
                }

                if(didChange){
                    this.data.attributeValues= valueArr;
                    this.forceUpdate();
                }
            }
        });
    }

    render(){
        return(
            <Container fluid >
                <Form>
                    <Row className="margin-top-15">
                        <Col>
                            {this.state.attributeId===0 ?
                                 <h3>Create New Attribute</h3>
                                :<h3>{this.data.attributeName} [AttributeId: {this.state.attributeId}]</h3>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="attributeName">Attribute Name</Label>
                                <Input 
                                    type="text" 
                                    title="Attribute Name"
                                    name="attributeName" 
                                    id="attributeName" 
                                    value={this.state.attributeName} 
                                    onChange={event => this.attributeDescriptionChange(event,"attributeName")} 
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="attributeJsonName">Attribute JSON Name</Label>
                                <Input 
                                    type="text" 
                                    name="attributeJsonName" 
                                    id="attributeJsonName" 
                                    value={this.state.attributeJsonName} 
                                    onChange={event => this.attributeDescriptionChange(event,"attributeJsonName")} 
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DropDown 
                                name="attributeStatus" 
                                title="Attribute Status" 
                                value={this.state.attributeStatus} 
                                options={this.attributeStatusOptions} 
                                onChange={event => this.attributeStatusChange(event)}
                            />
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="referenceModel">Reference Model</Label>
                                <Input 
                                    type="text" 
                                    name="referenceModel" 
                                    id="referenceModel" 
                                    value={this.state.referenceModel} 
                                    onChange={event => this.attributeDescriptionChange(event,"referenceModel")} 
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="attributeName">Attribute Family</Label>
                                <Input 
                                    type="text" 
                                    name="attributeFamily" 
                                    id="attributeFamily" 
                                    value={this.state.attributeFamily} 
                                    onChange={event => this.attributeDescriptionChange(event,"attributeFamily")} 
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="attributeSubFamily">Attribute Sub Family</Label>
                                <Input 
                                    type="text" 
                                    name="attributeSubFamily" 
                                    id="attributeSubFamily" 
                                    value={this.state.attributeSubFamily} 
                                    onChange={event => this.attributeDescriptionChange(event,"attributeSubFamily")} 
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="attributeName">Attribute Description</Label>
                        <Input 
                            type="text" 
                            name="attributeDescription" 
                            id="attributeDescription" 
                            value={this.state.attributeDescription} 
                            onChange={event => this.attributeDescriptionChange(event,"attributeDescription")} 
                        />
                    </FormGroup>
                    <h3>Attribute Definitions</h3>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="minLength">Min Length</Label>
                                <Input 
                                    type="number" 
                                    name="minLength"
                                    id="minLength" 
                                    value={this.state.minLength} 
                                    onChange={event => this.attributeDescriptionChange(event,"minLength")} 
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="maxLength">Max Length</Label>
                                <Input 
                                    type="number" 
                                    name="maxLength"
                                    id="maxLength" 
                                    value={this.state.maxLength} 
                                    onChange={event => this.attributeDescriptionChange(event,"maxLength")} 
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DropDown 
                                name="isDescriptor" 
                                title="Is Descriptor" 
                                value={this.state.isDescriptor} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isDescriptor")}
                            />
                        </Col>
                        <Col>
                            <DropDown 
                                name="isRequired" 
                                title="Is Required" 
                                value={this.state.isRequired} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isRequired")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DropDown 
                                name="isGrouping" 
                                title="Is Grouping" 
                                value={this.state.isGrouping} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isGrouping")}
                            />
                        </Col>
                        <Col>
                            <DropDown 
                                name="isFilter" 
                                title="Is Filter" 
                                value={this.state.isFilter} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isFilter")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DropDown 
                                name="isEnumerated" 
                                title="Is Enumerated" 
                                value={this.state.isEnumerated} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isEnumerated")}
                            />
                        </Col>
                        <Col>
                            <DropDown 
                                name="allowsFreeText" 
                                title="Allows Free Text" 
                                value={this.state.allowsFreeText} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"allowsFreeText")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DropDown 
                                name="allowsMultipleValues" 
                                title="Allows Multiple Values" 
                                value={this.state.allowsMultipleValues} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"allowsMultipleValues")}
                            />
                        </Col>
                        <Col>
                            <DropDown 
                                name="isOrdered" 
                                title="Is Ordered" 
                                value={this.state.isOrdered} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isOrdered")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <DropDown 
                                name="isDerived" 
                                title="Is Derived" 
                                value={this.state.isDerived} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isDerived")}
                            />
                        </Col>
                        <Col>
                            <DropDown 
                                name="dataType" 
                                title="Data Type" 
                                value={this.state.dataType} 
                                options={this.dataType} 
                                onChange={event => this.attributeDescriptionChange(event,"dataType")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <DropDown 
                                name="isDisplay" 
                                title="Is Display" 
                                value={this.state.isDisplay} 
                                options={this.trueFalse} 
                                onChange={event => this.attributeDescriptionChange(event,"isDisplay")}
                            />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 6, offset: 3}}>
                            <Button className="bg-color-second no-border" block onClick={this.updateAttribute}>Update Attribute Definition</Button>
                        </Col>
                    </Row>
                </Form>
                <div className="margin-top-15">
                    <h3 className="float-left">Attribute Values & Synonyms</h3>
                    <div className="add-bttn-35-35 float-left margin-left-10">
                        <div className="icon-add" onClick={this.createValueModalToggle}></div>
                    </div>
                    <CreateValue isOpen={this.state.createValueModalOpen} close={this.createValueModalToggle} attributeId={this.state.attributeId} load={this.load} />
                </div>
                {this.data.attributeValues.map((m ,i) => (
                <Row key={i} noGutters className="list-row">
                    <Card style={{ width: '100%' }} className="no-border">
                        <CardBody>
                            <CardTitle tag="h3">
                                {m.value} 
                                <div className="trash-can-40-40 float-right">
                                    <div className="icon-trash-can" onClick={()=>this.deleteAttributeValue(m.attributeValueId)}></div>
                                </div>
                            </CardTitle>
                            <div className="margin-top-5">
                                <div className="vertical-breaks float-left"><b>Attribute Value ID</b>: {m.attributeValueId}</div>
                                <div className="vertical-breaks float-left"><b>Is Case Sensative</b>: {JSON.stringify(m.isCaseSensitive)}</div>
                                <div className="vertical-breaks float-left"><b>Attribute Value</b>: {m.value}</div>
                                <div className="vertical-breaks float-left"><b>Attribute Unit</b>: {m.unit}</div>
                                <div className="float-left"><b>Order</b>: {JSON.stringify(m.attributeValueOrder)}</div>
                            </div> 
                        </CardBody>
                        <EditSynonym attributeSynonyms={m.attributeSynonyms} attributeId={m.attributeId} attributeValueId={m.attributeValueId} />
                        <CardBody className="no-padding-top">
                            <div className="margin-top-5">
                                <CardTitle tag="h5" className="underline">Categories</CardTitle>
                            </div>
                        </CardBody>
                    </Card>
                </Row>
                ))}
            </Container>
        )
    }
}

export default EditAttribute;