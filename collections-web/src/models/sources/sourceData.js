import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Card, CardGroup, CardImg, CardBody, CardTitle, CardText, CardLink, CardFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment'
import 'moment-timezone';
import Configs from '../../configs/configs';
import OptionDisplay from '../../components/cards/optionDisplay';
import PreviewJson from '../../components/pullUp/previewJson';
import PullUp from '../../components/pullUp/pullUp';
import ProcessPipeline from './actions/processPipeline';
import InputSourceInstanceId from './filters/inputSourceInstanceId';
import SourceRoutes from '../../controllers/sourceRoutes';
import AttributeRoutes from '../../controllers/attributeRoutes'; 

class SourceData extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sourceInstanceId: "",
            source: {
                sourceImages: [ { } ],
                sourceAttributes: [ { } ],
                sourceContainers: [ { } ],
            },
            openPullUp: false,
            sourceState: "noData",
            indexModalOpen: false,
            loadState: "waitingQuery",
            attributeNames: null,
            sourceAttributeStatuses: null,
            pullUpJson: { },
            matching: { }
        }

        this.indexSource = this.indexSource.bind(this);
        this.toggleIndexModal = this.toggleIndexModal.bind(this);
        this.openPullUp = this.openPullUp.bind(this);
        this.closePullUp = this.closePullUp.bind(this);
        this.loadSource = this.loadSource.bind(this);
        this.returnValue = this.returnValue.bind(this);
        this.loadAttributeNames = this.loadAttributeNames.bind(this);
        this.loadSourceAttributeStatuses = this.loadSourceAttributeStatuses.bind(this);
        this.loadMatchingData = this.loadMatchingData.bind(this);
    }

    componentDidMount(){
        this.loadAttributeNames();
        this.loadSourceAttributeStatuses();
    }

    openPullUp(dataTypeToShow){
        var pullUpJson = { }
        switch(dataTypeToShow){
            case 'matching':  pullUpJson = this.state.matching; break;
            default: pullUpJson = this.state.source; break;
        }

        this.setState({
            pullUpJson: pullUpJson,
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
            this.loadSource();
        })
    }

    toggleIndexModal(){
        this.setState({
            indexModalOpen: !this.state.indexModalOpen
        })
    }

    loadSource(){
        this.setState({
            loadState: "waitingResults"
        });

        if(this.state.attributeNames===null){
            this.loadAttributeNames();
        }

        if(this.state.sourceAttributeStatuses===null){
            this.loadSourceAttributeStatuses();
        }

        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getUiSourceAndSourceKey(this.state.sourceInstanceId,()=>{
            var response = sourceRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                var payload = response.payload.source;
                var sourceKey = response.payload.sourceKey;
                if(sourceKey!=null){
                    payload.skuInstanceId = sourceKey.skuInstanceId;
                }
                var attrNames = this.state.attributeNames
                if(attrNames!==null&&payload.sourceAttributes!==null){
                    for(var sa of payload.sourceAttributes){
                        sa.attributeName = attrNames[sa.attributeId];
                    }
                }
                
                var attrStatuses = this.state.sourceAttributeStatuses;
                if(attrStatuses!==null&&payload.sourceAttributes!==null){
                    for(var sa of payload.sourceAttributes){
                        var obj = attrStatuses[sa.sourceAttributeStatusId];
                        if(obj!==undefined&&obj!==null){
                            sa.attributeStatusName = obj.name;
                            sa.attributeStatusMeaning = obj.statusMeaning;
                        }
                    }
                }

                this.setState({
                    source: payload,
                    loadState: "success"
                });   
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

    loadSourceAttributeStatuses(){
        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getUiSourceAttributeStatuses(()=>{
            var get = sourceRoutes.returnParam;
            var status = get.metadata.status;

            if(status==='success'){
                this.setState({
                    sourceAttributeStatuses: get.payload
                })
            }
        })
    }

    indexSource(){
        const sourceRoutes = new SourceRoutes();
        sourceRoutes.putSourceToIndex(this.state.sourceInstanceId);
    }

    loadMatchingData(){
        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getSourceMatching(this.state.sourceInstanceId,()=>{
            var get = sourceRoutes.returnParam;
            var status = get.metadata.status;

            if(status==='success'){
                this.setState({
                    matching: get.payload
                },()=>{
                    this.openPullUp("matching");
                })
            }
        })
    }

    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>To start search a Source Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return(
                        <div>
                            <SourceInfoCard values={this.state} openPullUp={this.openPullUp} loadSource={this.loadSource} indexSource={this.indexSource} loadMatchingData={this.loadMatchingData} />
                            <h3 className="margin-top-10">Pipeline</h3>
                            <ProcessPipeline sourceInstanceId={this.state.sourceInstanceId} />
                            <SourceImages values={this.state} />
                            <SourceAttributes values={this.state} />
                        </div>
                    )
                case 'notFound': 
                    return <div>Source not found</div>
                case 'error': 
                    return <div>An error occurred.  Please use Trace ID to find out more.</div>
                default:
                    return <div>To start search a Source Instance ID</div>
            } 
        }

        const SourceInfoCard = (props) => {
            return(
                <Row>
                    <Col>
                        <h3 className="margin-top-0">Information</h3>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h4">{props.values.source.sourceInstanceId} [{props.values.source.sourceGuid}]</CardTitle>
                                <Row>
                                    {props.values.source.skuInstanceId!==null ?
                                         <Col><OptionDisplay name={"SKU Instance ID"} value={props.values.source.skuInstanceId} isLink={true} href={"/data/skus/data?skuInstanceId=" + props.values.source.skuInstanceId} /></Col>
                                        :<Col><OptionDisplay name={"SKU Instance ID"} value={"Not matched"} /></Col>
                                    }
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Source Status ID"} value={props.values.source.sourceStatusId} /></Col>
                                    <Col><OptionDisplay name={"Pipeline State"} value={props.values.source.sourcePipelineState} /></Col>
                                    <Col><OptionDisplay name={"Source Pipeline Status ID"} value={props.values.source.sourcePipelineStatusId} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Uploaded Method"} value={props.values.source.uploadedMethod} /></Col>
                                    <Col><OptionDisplay name={"Foundation"} value={props.values.source.foundationId} /></Col>
                                    <Col><OptionDisplay name={"Saved DB Instance"} value={props.values.source.instanceId} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Identity Instance ID"} value={props.values.source.identityInstanceId} /></Col>
                                    <Col><OptionDisplay name={"Create Date"} value={<Moment unix tx="America/New_York">{props.values.source.createDate / 1000}</Moment>} /></Col>
                                    <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{props.values.source.updateDate / 1000}</Moment>} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Image Count"} value={props.values.source.sourceImages.length} /></Col>
                                    <Col><OptionDisplay name={"Attribute Count"} value={props.values.source.sourceAttributes.length} /></Col>
                                    <Col><OptionDisplay name={"Container Count"} value={props.values.source.sourceContainers.length} /></Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <CardLink href="#" onClick={props.openPullUp}>View Source JSON</CardLink>
                                <CardLink href="#" onClick={props.loadMatchingData}>View Matching Output</CardLink>
                                <CardLink href="#" onClick={props.loadSource}>Refresh Source</CardLink>
                                <CardLink href="#" onClick={props.indexSource}>Re-index Source</CardLink>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            )
        }

        const SourceImages = (props) => {
            return(
                <Row className="margin-top-10">
                    <Col>
                        <h3 className="margin-top-0">Images</h3>
                        <Row>
                            <CardGroup>
                                {props.values.source.sourceImages.map((img,i) => (
                                <Col key={i} xs="2">
                                    <Card className="source-image">
                                        <CardImg top width="100%" src={Configs.imageUrl + img.hash + "." + img.formatType} alt="No image" />
                                        <CardBody>
                                            <CardText>{img.imageStatusMessage}</CardText>
                                            <CardText>
                                                <small className="text-muted">{img.updateDate}</small>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                ))}
                            </CardGroup>
                        </Row>
                    </Col>
                </Row>
            )
        }

        const SourceAttributes = (props) => {
            return(
                <div>
                    <h3 className="margin-top-10">Attributes</h3>
                    {props.values.source.sourceAttributes.map((att,i) => (
                    <Row key={i} className="margin-top-15">
                        <Col>        
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5">Attribute ID: {att.attributeId} - {att.attributeName}</CardTitle>
                                        </Col>
                                        <Col>
                                            {att.attributeStatusMeaning==='success' ?
                                             <div className="float-right text-success">{att.attributeStatusName}</div>
                                            :<div className="float-right text-error">{att.attributeStatusName}</div>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Attribute Value"} value={att.attributeValue} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Attribute Unit"} value={att.attributeUnit} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Alt Attribute Name"} value={att.altAttributeName} /></Col>
                                        <Col><OptionDisplay name={"Attribute Order"} value={att.attributeOrder} /></Col>
                                        <Col><OptionDisplay name={"Enumerated Option ID"} value={att.enumeratedOptionId} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Attribute Found Type"} value={att.attributeFoundType} /></Col>
                                        <Col><OptionDisplay name={"Attribute Value ID"} value={att.attributeValueId} /></Col>
                                        <Col><OptionDisplay name={"Attribute Priority"} value={att.attributePriority} /></Col>
                                    </Row>
                                    <Row>
                                        {att.serviceName==="webApi" ?
                                             <Col><OptionDisplay name={"Updated By"} value={att.updatedBy} /></Col>
                                            :<Col><OptionDisplay name={"Updated By"} value={att.serviceName} /></Col>
                                        }
                                        <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{att.updateDate / 1000}</Moment>} /></Col>
                                        <Col><OptionDisplay name={"Created By"} value={att.createdBy} /></Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    ))}
                </div>
            )
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <InputSourceInstanceId returnValue={this.returnValue} />
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
                <PullUp 
                    component={<PreviewJson json={this.state.pullUpJson} />} 
                    open={this.state.openPullUp} 
                    close={this.closePullUp}
                    pullUpType={"view"} 
                />
            </Container>
        )
    }
}

export default withRouter(SourceData);