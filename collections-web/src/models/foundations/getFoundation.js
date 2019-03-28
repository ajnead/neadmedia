import React, { Component } from 'react';
import { Row, Col, Card, CardTitle, CardBody, } from 'reactstrap';
import FoundationRoutes from '../../controllers/foundationRoutes';
import AttributeRoutes from '../../controllers/attributeRoutes';
import NonInput from '../../components/display/nonInput';
import OptionDisplay from '../../components/cards/optionDisplay';

class GetFoundation extends Component {
    constructor(props){
        super(props);

        this.state = {
            foundationObj: { 
                foundationAttributes: [ ]
            },
            versionName: "foundation-0.1.0",
            foundationId: 1,
            attributeNames: null,
        }
    }

    componentDidMount(){
        this.loadAttributeNames();
        this.loadFoundation();
    }

    loadFoundation(){
        if(this.state.attributeNames===null){
            this.loadAttributeNames();
        }

        const foundationRoutes = new FoundationRoutes();
        foundationRoutes.getFoundation(this.state.foundationId,this.state.versionName,()=>{
            var response = foundationRoutes.returnParam;

            if(response.metadata.status==='success'){
                var payload = response.payload;
                var attrNames = this.state.attributeNames
                if(attrNames!==null&&payload.sourceAttributes!==null){
                    for(var fa of payload.foundationAttributes){
                        fa.attributeName = attrNames[fa.attributeId];
                    }
                }

                this.setState({
                    foundationObj: response.payload
                })
            }
        });
    }

    loadAttributeNames(){
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.getUiAttributeNames("public",()=>{
            var get = attributeRoutes.returnParam;
            var status = get.metadata.status;

            if(status==='success'){
                this.setState({
                    attributeNames: get.payload
                })
            }
        })
    }

    render(){
        return(
            <div>
                <Row>
                    <Col><h3 className="margin-top-20">Foundation Information</h3></Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <NonInput title={"Foundation ID"} value={this.state.foundationObj.foundationId} />
                                        <NonInput title={"Foundation Name"} value={this.state.foundationObj.foundationName} />
                                        <NonInput title={"Attribute Version"} value={this.state.foundationObj.attributeVersion} />
                                        <NonInput title={"Inherit Parent Properties"} value={JSON.stringify(this.state.foundationObj.inheritParentProperties)} />
                                        <NonInput title={"Parent Foundation ID"} value={this.state.foundationObj.parentFoundationId} />
                                        <NonInput title={"Requires Relationship ID"} value={JSON.stringify(this.state.foundationObj.requiresRelationshipId)} />
                                        <NonInput title={"Relationship Type"} value={this.state.foundationObj.relationshipType} />
                                        <NonInput title={"Allows Attribute Matching"} value={JSON.stringify(this.state.foundationObj.allowsAttributeMatching)} />
                                    </Col>
                                    <Col>
                                        <NonInput title={"Foundation Guid"} value={this.state.foundationObj.foundationGuid} />
                                        <NonInput title={"Level"} value={this.state.foundationObj.level} />
                                        <NonInput title={"Foundation Version"} value={this.state.foundationObj.foundationVersion} />
                                        <NonInput title={"Inherit Extension Properties"} value={JSON.stringify(this.state.foundationObj.inheritExtensionProperties)} />
                                        <NonInput title={"Extension Foundation ID"} value={this.state.foundationObj.extensionFoundationId} />    
                                        <NonInput title={"Is Retired"} value={JSON.stringify(this.state.foundationObj.isRetired)} />    
                                        <NonInput title={"Change to Foundation ID"} value={this.state.foundationObj.changedToFoundationId} />    
                                        <NonInput title={"Matching Threshold"} value={this.state.foundationObj.matchingThreshold} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {this.state.foundationObj.foundationAttributes.map((r, i) => ( 
                <Row key={i} noGutters className="list-row">
                    <Card style={{ width: '100%' }} className="no-border">
                        <CardBody>
                            <CardTitle tag="h3">Attribute ID: {r.attributeId} - {r.attributeName} </CardTitle>            
                            <div className="margin-top-5">
                                <Row>
                                    <Col>
                                        <OptionDisplay name={"Defines Foundation"} value={JSON.stringify(r.definesFoundation)} />
                                        <OptionDisplay name={"Is Extension Attribute"} value={JSON.stringify(r.isExtensionAttribute)} />
                                        <OptionDisplay name={"Is Matching Attribute"} value={JSON.stringify(r.isMatchingAttribute)} />
                                        <OptionDisplay name={"Matching Type"} value={r.matchingType} />
                                        <OptionDisplay name={"Matching Weight"} value={r.matchingWeight} />
                                    </Col>
                                    <Col>
                                        <OptionDisplay name={"Display Level"} value={r.displayLevel} />
                                        <OptionDisplay name={"Is Required For Grouping"} value={JSON.stringify(r.requiredForGrouping)} />
                                        <OptionDisplay name={"Use Swatch For Variant Display"} value={JSON.stringify(r.useSwatchForVariantDisplay)} />
                                        <OptionDisplay name={"Use Thumbnail For Variant Display"} value={JSON.stringify(r.useThumbnailForVariantDisplay)} />
                                    </Col>
                                    <Col>
                                        <OptionDisplay name={"Has Additional Properties"} value={JSON.stringify(r.hasAdditionalProperties)} />
                                        <OptionDisplay name={"Inherits Attribute Definitions"} value={JSON.stringify(r.inheritsAttributeDefinitions)} />
                                        <OptionDisplay name={"Inherits Attribute Values"} value={JSON.stringify(r.inheritAttributeValues)} />
                                        <OptionDisplay name={"Enforce Attribute Values"} value={JSON.stringify(r.enforceAttributeValues)} />
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                        <CardBody className="no-padding-top">
                            <CardTitle>Attribute Definitions</CardTitle>
                            <Row>
                                <Col>
                                    <OptionDisplay name={"Min Length"} value={JSON.stringify(r.minLength)} />
                                    <OptionDisplay name={"Max Length"} value={JSON.stringify(r.maxLength)} />
                                    <OptionDisplay name={"Is Descriptor"} value={JSON.stringify(r.isDescriptor)} />
                                    <OptionDisplay name={"Is Derived"} value={JSON.stringify(r.isDerived)} />
                                    <OptionDisplay name={"Has Reference Model"} value={JSON.stringify(r.hasReferenceModel)} />
                                </Col>
                                <Col>
                                    <OptionDisplay name={"Is Required"} value={JSON.stringify(r.isRequired)} />
                                    <OptionDisplay name={"Is Display"} value={JSON.stringify(r.isDisplay)} />
                                    <OptionDisplay name={"Is Grouping"} value={JSON.stringify(r.isGrouping)} />                                
                                    <OptionDisplay name={"Is Ordered"} value={JSON.stringify(r.isOrdered)} />
                                    <OptionDisplay name={"Is Filter"} value={JSON.stringify(r.isFilter)} />
                                </Col>
                                <Col>
                                    <OptionDisplay name={"Is Enumerated"} value={JSON.stringify(r.isEnumerated)} />
                                    <OptionDisplay name={"Allows Free Text"} value={JSON.stringify(r.allowsFreeText)} />
                                    <OptionDisplay name={"Allows Multiple Values"} value={JSON.stringify(r.allowsMultipleValues)} />
                                    <OptionDisplay name={"Allows Found Type Edits"} value={JSON.stringify(r.allowFoundTypeEdits)} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
                ))}
            </div>
        )
    }
}

export default GetFoundation;