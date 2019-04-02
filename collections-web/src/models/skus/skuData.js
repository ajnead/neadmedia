import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardFooter, CardLink, CardGroup, CardImg, CardText } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment'
import 'moment-timezone';
import Configs from '../../configs/configs';
import SkuRoutes from '../../controllers/skuRoutes';
import RelationshipRoutes from '../../controllers/relationshipRoutes';
import AttributeRoutes from '../../controllers/attributeRoutes';
import OptionDisplay from '../../components/cards/optionDisplay';
import OptionDisplayList from '../../components/cards/optionDisplayList';
import PreviewJson from '../../components/pullUp/previewJson';
import PullUp from '../../components/pullUp/pullUp';
import InputSkuInstanceId from './filters/inputSkuInstanceId';

class SkuData extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            skuInstanceId: "",
            sku: {
                skuSources: [],
                skuAttributes: [],
                skuImages: [],
                attributeNames: null
            },
            openPullUp: false,
            loadState: "waitingQuery",
            relationships: {
                relationshipInstanceIds: [],
                collectionSummaries: []
            },
            relationshipsDataAvailable: false
        }

        this.openPullUp = this.openPullUp.bind(this);
        this.closePullUp = this.closePullUp.bind(this);
        this.returnValue = this.returnValue.bind(this);
        this.loadSku = this.loadSku.bind(this);
        this.loadAttributeNames = this.loadAttributeNames.bind(this);
        this.indexSku = this.indexSku.bind(this);
    }

    openPullUp(){
        this.setState({
            openPullUp: true
        })
    }

    closePullUp(){
        this.setState({
            openPullUp: false
        })
    }

    returnValue(key,value){
        this.setState({
            [key]: value
        },()=>{
            this.loadSku();
        })
    }

    loadAttributeNames(){
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.getUiAttributeNamesFromCache("public",()=>{
            var response = JSON.parse(attributeRoutes.returnParam);
            var status = response._metadata.status;

            if(status==='success'){
                this.setState({
                    attributeNames: response._payload
                })
            }
        })
    }

    loadSku(){
        this.setState({
            loadState: 'waitingResults',
            relationshipsDataAvailable: false
        })

        if(this.state.attributeNames==null){
            this.loadAttributeNames();
        }

        const skuRoutes = new SkuRoutes();
        skuRoutes.getSku(this.state.skuInstanceId,()=>{
            var response = skuRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                var payload = response.payload;
                
                const attrNames = this.state.attributeNames
                if(attrNames!==null&&payload.parentAttributes!==null&&payload.skuAttributes.length>0){
                    for(var sa of payload.skuAttributes){
                        sa.attributeName = attrNames[sa.attributeId];
                    }
                }

                this.setState({
                    sku: payload,
                    loadState: 'success'
                },()=>{
                    this.loadRelationships();
                })
            }else if(status==="not_found"){
                this.setState({
                    loadState: "notFound"
                })
            }else{
                this.setState({
                    loadState: "error"
                })
            }
        });
    }

    loadRelationships(){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getUiRelationshipsBySkuInstanceId(this.state.skuInstanceId,()=>{
            var response = relationshipRoutes.returnParam;
            var status = response.metadata.status;
            if(status==="success"){
                this.setState({
                    relationships: response.payload,
                    relationshipsDataAvailable: true
                })
            }
        });
    }

    indexSku(){
        const skuRoutes = new SkuRoutes();
        skuRoutes.putSkuToIndex(this.state.skuInstanceId);
    }

    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>To start search a SKU Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return(
                       <LoadSku />
                    )
                case 'notFound': 
                    return <div>SKU not found</div>
                case 'error': 
                    return <div>SKU not found</div>
                default:
                    return <div>To start search a SKU Instance ID</div>
            } 
        }

        var LoadSku = () => {
            return(
                <div>
                    <Row>
                        <Col>
                            <h3 className="margin-top-0">SKU Information</h3>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h4">{this.state.sku.skuInstanceId} [{this.state.sku.skuGuid}]</CardTitle>
                                    <Row>
                                        <Col><OptionDisplay name={"Tenant ID"} value={this.state.sku.tenantId} /></Col>
                                        <Col><OptionDisplay name={"Create Date"} value={<Moment unix tx="America/New_York">{this.state.sku.createDate / 1000}</Moment>} /></Col>
                                        <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{this.state.sku.updateDate / 1000}</Moment>} /></Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <CardLink href="javascript:void(0);" onClick={this.openPullUp}>View SKU JSON</CardLink>
                                    <CardLink href="javascript:void(0);" onClick={this.indexSku}>Re-index Sku</CardLink>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Images</h3>
                            <SkuImages />
                        </Col>
                    </Row>
                    <SkuRelationships />
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Sources</h3>
                            <Card>
                                <CardBody>
                                    {this.state.sku.skuSources.map((source,i) => (
                                        <Row key={i}>
                                            <Col xs="4">
                                                <OptionDisplay 
                                                    name={"Source Instance ID"} 
                                                    value={source.sourceInstanceId} 
                                                    isLink={true} 
                                                    href={'/data/sources/data?sourceInstanceId=' + source.sourceInstanceId}/>
                                            </Col>
                                            <Col><OptionDisplay name={"Added On"} value={<Moment unix tx="America/New_York">{source.createDate / 1000}</Moment>} /></Col>
                                        </Row>
                                    ))}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div className="margin-top-10">
                        <h3 className="margin-top-0">Attributes</h3>
                        {this.state.sku.skuAttributes.map((att,i) => (
                            <Row key={i} className="margin-top-15">
                                <Col>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <CardTitle tag="h5">Attribute ID: {att.attributeId} - {att.attributeName}</CardTitle>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Attribute Value"} value={att.attributeValue} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Attribute Unit"} value={att.attributeUnit} /></Col>
                                                <Col><OptionDisplay name={"Attribute Order"} value={att.attributeOrder} /></Col>
                                                <Col><OptionDisplay name={"Attribute Value ID"} value={att.attributeValueId} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Attribute Priority"} value={att.attributePriority} /></Col>
                                                <Col><OptionDisplay name={"Attribute Type"} value={att.attributeType} /></Col>
                                                <Col><OptionDisplay name={"Source Attribute Status"} value={att.skuAttributeStatus} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Source Instance ID"} value={att.sourceInstanceId} /></Col>
                                                <Col><OptionDisplay name={"Source Attribute ID"} value={att.sourceAttributeId} /></Col>
                                                <Col><OptionDisplay name={"SKU Attribute ID"} value={att.skuAttributeId} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Last Updated"} value={<Moment unix tx="America/New_York">{att.updateDate / 1000}</Moment>} /></Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            )
        }

        var SkuImages = () => {
            return(
                <Row className="margin-top-20">
                    <CardGroup>
                        {this.state.sku.skuImages.map((img,i) => (
                        <Col key={i} xs="2">
                            <Card className="sku-image">
                                <CardImg top width="100%" src={Configs.imageUrl + img.hash + "." + img.formatType} alt="No image" />
                                <CardBody>
                                    <CardText className="margin-bottom-0">{img.imageTag}</CardText>
                                    <CardText>
                                        <small className="text-muted">{<Moment unix tx="America/New_York" format="MM/DD/YYYY">{img.updateDate / 1000}</Moment>}</small>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        ))}
                    </CardGroup>
                </Row>
            )
        }

        var SkuRelationships = () => {
            if(this.state.relationshipsDataAvailable){
                return(
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Relationships</h3>
                            <Card>
                                <CardBody>
                                    <Row className = "margin-bottom-0">
                                        <Col>
                                            <OptionDisplayList 
                                                name={"Parent Instance IDs"} 
                                                values={this.state.relationships.relationshipInstanceIds} 
                                                isLink={true} 
                                                href={"/data/relationships/parents?parentInstanceId="}/>
                                        </Col>
                                    </Row>
                                    {this.state.relationships.collectionSummaries.map((cs,i) => (
                                        <Row key={i}>
                                            <Col xs="4">
                                                <OptionDisplay 
                                                    name={"Collection Instance ID"} 
                                                    value={cs.collectionInstanceId} 
                                                    isLink={true} 
                                                    href={'/data/relationships/collections?collectionInstanceId=' + cs.collectionInstanceId}/>
                                            </Col>
                                            <Col><OptionDisplay name={"Collection Name"} value={cs.collectionName} /></Col>
                                        </Row>
                                    ))}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                )
            }else{
                return(
                    <span></span>
                )
            }
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <InputSkuInstanceId returnValue={this.returnValue} />
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
                <PullUp 
                    component={<PreviewJson json={this.state.sku} />} 
                    open={this.state.openPullUp} 
                    close={this.closePullUp}
                    pullUpType={"view"} 
                />
            </Container>
        )
    }

}

export default withRouter(SkuData);