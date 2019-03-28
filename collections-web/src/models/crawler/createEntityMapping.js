import React from 'react';
import ReactJson from 'react-json-view';
import Guid from 'guid';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Input, Button } from 'reactstrap'
import Configs from '../../configs/configs';
import originTracer from '../../utilities/api/originTracer';
import DropDown from '../../components/inputs/dropDown';
import InputText from '../../components/inputs/inputText';

class CreateEntityMapping extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            retailerOrBrand: "retailer",
            entityId: "",
            entityOptions: [ { } ],
            crawlerMappings: [ ],
            textRegex: "",
            attributeId: 0,
            crawlerKeyName: "",
            mappingName: "",
            crawlerMethod: "diffbot"
        }

        this.retailerOrBrandOptions = [
            {
                id: "retailer",
                value: "Retailer"
            },
            {
                id: "brand",
                value: "Brand"
            }
        ]

        this.createCrawlerMapping = this.createCrawlerMapping.bind(this);
        this.deleteCrawlerAttributeMapping = this.deleteCrawlerAttributeMapping.bind(this);
        this.addCrawlerAttributeMapping = this.addCrawlerAttributeMapping.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            crawlerMethod: props.method
        }
    }


    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }
    
    addCrawlerAttributeMapping(){
        var tempId = "" + Guid.create();
        var mappingObj = {
            textRegex: this.state.textRegex,
            attributeId: this.state.attributeId,
            crawlerField: this.state.crawlerKeyName,
            tempId: tempId
        } 

        var mappingArr = this.state.crawlerMappings;
        mappingArr.push(mappingObj);
        
        this.setState({
            crawlerMappings: mappingArr,
            textRegex: "",
            attributeId: 0,
            crawlerKeyName: ""
        });
    }

    deleteCrawlerAttributeMapping(tempId){
        var mappingArr = this.state.crawlerMappings;
        for(var m=0; m<mappingArr.length; m++){
            var mappingObj = mappingArr[m];
            if(mappingObj.tempId===tempId){
                mappingArr.splice(m,1);
                break;
            }
        }

        this.setState({
            crawlerMappings: mappingArr
        })
    }

    createCrawlerMapping(){
        var payload = {
            crawlerEntityId: this.state.entityId,
            crawlerEntityClass: this.state.retailerOrBrand,
            crawlerMappingName: this.state.mappingName,
            crawlerMethod: this.state.crawlerMethod,
            crawlerMappingAttributes: []
        }

        var cmaArr = this.state.crawlerMappings;
        for(var m=0; m<cmaArr.length; m++){
            var cmaObj = cmaArr[m];
            var cmaObjFinal = {
                crawlerField: cmaObj.crawlerField,
                textRegex: cmaObj.textRegex,
                attributeId: cmaObj.attributeId
            }

            payload.crawlerMappingAttributes.push(cmaObjFinal);
        }

        fetch(Configs.collectionApiUrl + '/crawler/mapping/create?' + originTracer(), {
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
            <Row className="padding-top-15">
                <Col xs="6" className="overflow-x-hidden">
                    <ReactJson src={this.props.src} displayDataTypes={false}/>
                </Col>
                <Col xs="6">
                    <Row>
                        <Col>
                            <DropDown
                                name="retailerOrBrand" 
                                title="Identity Type"
                                value={this.state.retailerOrBrand} 
                                options={this.retailerOrBrandOptions} 
                                onChange={event => this.changeValue(event,"retailerOrBrand")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText
                                name="entityId" 
                                title="Entity to Scrap"
                                value={this.state.entityId} 
                                onChange={event => this.changeValue(event,"entityId")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText
                                name="mappingName" 
                                title="Mapping Name"
                                value={this.state.mappingName} 
                                onChange={event => this.changeValue(event,"mappingName")}
                            />
                        </Col>
                    </Row>
                    {this.state.crawlerMappings.map((m ,i) => (
                    <Row key={i} noGutters className="list-row margin-bottom-15">
                        <Card style={{ width: '100%' }} className="no-border">
                            <CardBody className="no-padding-bottom">
                                <CardTitle tag="h5">Crawler Mapping</CardTitle>
                            </CardBody>
                            <CardBody className="padding-top-10">
                                <Row>
                                    <Col>
                                        <div className="input-text-line non-input">{m.crawlerField}</div>    
                                    </Col>
                                    <Col>
                                        <div className="input-text-line non-input">{m.attributeId}</div>
                                    </Col>
                                    <Col>
                                        <div className="input-text-line non-input">{m.textRegex}</div>
                                    </Col>
                                    <Col className="no-padding-left" xs="1">
                                        <div className="trash-can-40-40">
                                            <div className="icon-trash-can" onClick={()=>this.deleteCrawlerAttributeMapping(m.tempId)}></div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Row>
                    ))}
                    <Row>
                        <Col>
                            <Button onClick={this.createCrawlerMapping} className="bg-color-second no-border" block>Create Crawler Mapping</Button>
                        </Col>
                    </Row>
                    <Row noGutters className="list-row margin-top-15">
                        <Card style={{ width: '100%' }} className="no-border">
                            <CardBody className="no-padding-bottom">
                                <CardTitle tag="h5">Add Crawler Attribute Mapping</CardTitle>
                            </CardBody>
                            <CardBody className="padding-top-10">
                                <Form>
                                    <Row form={"true"}>
                                        <Col>
                                            <FormGroup>
                                                <Input 
                                                    className="input-text-line" 
                                                    type="text" 
                                                    placeholder="Crawler Key Name" 
                                                    value={this.state.crawlerKeyName} 
                                                    onChange={event => this.changeValue(event,"crawlerKeyName")} />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Input 
                                                    className="input-text-line" 
                                                    type="number" 
                                                    placeholder="Attribute ID"
                                                    value={this.state.attributeId} 
                                                    onChange={event => this.changeValue(event,"attributeId")} />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Input 
                                                    className="input-text-line" 
                                                    type="text" 
                                                    placeholder="Text Regex"
                                                    value={this.state.textRegex} 
                                                    onChange={event => this.changeValue(event,"textRegex")} />
                                            </FormGroup>
                                        </Col>
                                        <Col className="no-padding-left" xs="1">
                                            <div className = "add-bttn-30-30">
                                                <div className="icon-add" onClick={this.addCrawlerAttributeMapping}></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default CreateEntityMapping;