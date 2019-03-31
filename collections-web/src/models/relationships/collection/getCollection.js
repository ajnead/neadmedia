import React from 'react';
import { Container, Row, Col, CardBody, Card, CardTitle, CardImg, CardFooter, CardLink, CardText } from 'reactstrap';
import { FormGroup, Input } from 'reactstrap';
import Moment from 'react-moment'
import 'moment-timezone';
import Configs from '../../../configs/configs';
import RelationshipRoutes from '../../../controllers/relationshipRoutes';
import OptionDisplay from '../../../components/cards/optionDisplay';
import RenderJson from '../../../components/display/renderJson';
import ModalPage from '../../../components/display/modalPage';
import getQueryParameter from '../../../utilities/url/getQueryParameter';
import addQueryParameter from '../../../utilities/url/addQueryParameter';

class GetCollection extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collectionInstanceId: '',
            collectionInstanceIdSearch: '',
            collection: {
                collectionTags: [],
                collectionChildren: []
            },
            childLeft: [],
            childRight: [],
            tagLeft: [],
            tagRight: [],
            loadState: "waitingQuery"
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.openModalPageCollectionJson = this.openModalPageCollectionJson.bind(this);
        this.indexCollection = this.indexCollection.bind(this);
    }

    componentDidMount(){
        setInterval(() => {
            var queryParameter = getQueryParameter("collectionInstanceId");
            if(queryParameter!==undefined&&queryParameter!=null&&queryParameter.length>3){
                if(this.state.collectionInstanceIdSearch!==queryParameter){
                    this.setState({
                        collectionInstanceIdSearch: queryParameter,
                        collectionInstanceId: queryParameter
                    },()=>{
                        this.loadCollection();
                    })
                }
            }
        }, 100);
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode == 13){
            addQueryParameter("collectionInstanceId",this.state.collectionInstanceId);
        }
    }

    openModalPageCollectionJson(){
        this.refs.viewCollectionJson.open();
    }

    indexCollection(){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.putCollectionToIndex(this.state.collectionInstanceId);
    }

    loadCollection(){
        this.setState({ loadState: 'waitingResults' })

        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getCollection(this.state.collectionInstanceId,()=>{
            const response = relationshipRoutes.returnParam;
            const status = response.metadata.status;
            

            if(status==="success"){
                const payload = response.payload;

                var childRight = [];
                var childLeft = [];
                if(payload.collectionChildren!==null&&payload.collectionChildren!==undefined){
                    var isLeft = true;
                    for(var obj of payload.collectionChildren){
                        if(isLeft){
                            childLeft.push(obj);
                            isLeft = false;
                        }else{
                            childRight.push(obj);
                            isLeft = true;
                        }
                    }
                }

                var tagRight = [];
                var tagLeft = [];
                if(payload.collectionTags!==null&&payload.collectionTags!==undefined){
                    var isLeft = true;
                    for(var obj of payload.collectionTags){
                        if(isLeft){
                            tagLeft.push(obj);
                            isLeft = false;
                        }else{
                            tagRight.push(obj);
                            isLeft = true;
                        }
                    }
                }

                this.setState({
                    collection: response.payload,
                    childRight: childRight,
                    childLeft: childLeft,
                    tagRight: tagRight,
                    tagLeft: tagLeft,
                    loadState: 'success'
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

    render(){
        const DisplayChildren = (props) => {
            return(
                <div>
                    {props.children.map((child,i)=>(
                        <Card key={i} className="margin-bottom-10">    
                            <CardBody>
                                <Row>
                                    <Col xs="3">
                                        <CardImg src={Configs.imageUrl + child.imageLookupId + ".jpg"} />
                                    </Col>
                                    <Col>
                                        <OptionDisplay name={"Child Type"} value={child.childType} />
                                        <DisplayChildrenLink childType={child.childType} childTypeInstanceId={child.childTypeInstanceId} />
                                        <OptionDisplay name={"Count Of Type"} value={child.countOfType} />
                                        <OptionDisplay name={"Count Of"} value={child.countOf} />
                                        <OptionDisplay name={"Rank Display Type"} value={child.rankDisplayType} />
                                        <OptionDisplay name={"Rank In Collection"} value={child.rankInCollection} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )
        }

        const DisplayChildrenLink = (props) => {
            switch(props.childType){
                case 'parent' : return <OptionDisplay name={"Child Type Instance ID"} value={props.childTypeInstanceId} isLink={true} href={'/data/relationships/parents?parentInstanceId=' + props.childTypeInstanceId}/>
                case 'sku' : return <OptionDisplay name={"Child Type Instance ID"} value={props.childTypeInstanceId} isLink={true} href={'/data/skus/data?skuInstanceId=' + props.childTypeInstanceId}/>
            }
        }

        const DisplayTags = (props) => {
            return(
                <div>
                    {props.tags.map((tag,i)=>(
                        <Card key={i} className="margin-bottom-10">    
                            <CardBody>
                                <Row>
                                    <Col>
                                        <OptionDisplay name={"Collection Tag ID"} value={tag.collectionTagId} />
                                        <OptionDisplay name={"Attribute ID"} value={tag.attributeId} />
                                    </Col>
                                    <Col>
                                        <OptionDisplay name={"Tag"} value={tag.tag} />
                                        <OptionDisplay name={"Attribute Value ID"} value={tag.attributeValueId} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )
        }

        const Display = (props) => {
            return(
                <div>
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Collection Information</h3>
                            <Card>    
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h4">Collection Name: {this.state.collection.collectionName}</CardTitle>    
                                        </Col>
                                        <Col>
                                            <div className="float-right text-success">{this.state.collection.collectionStatus}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto">
                                            <CardImg src={this.state.collection.imageUrl} />
                                            <CardText className="text-muted text-center">Default Image</CardText>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col><OptionDisplay name={"Collection Instance ID"} value={this.state.collection.collectionInstanceId} /></Col>
                                                <Col><OptionDisplay name={"Create Date"} value={<Moment unix tx="America/New_York">{this.state.collection.createDate / 1000}</Moment>} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Relationship Instance ID"} value={this.state.collection.relationshipInstanceId} /></Col>
                                                <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{this.state.collection.updateDate / 1000}</Moment>} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Collection Class"} value={this.state.collection.collectionClass} /></Col>
                                                <Col><OptionDisplay name={"Collection Class Id"} value={this.state.collection.collectionClassId} /></Col>
                                            </Row>
                                            <Row>
                                                <Col><OptionDisplay name={"Generate Type"} value={this.state.collection.generatedType} /></Col>
                                                <Col><OptionDisplay name={"Generate Frequency Hours"} value={this.state.collection.generatedFrequencyHours} /></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <CardLink href="javascript:void(0);" onClick={this.openModalPageCollectionJson}>View Collection JSON</CardLink>
                                    <CardLink href="javascript:void(0);" onClick={this.indexCollection}>Re-index Collection</CardLink>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="margin-top-20">
                        <Col>
                            <h3 className="margin-top-0">Collection Tags</h3>
                            <Row>
                                <Col>
                                    <DisplayTags tags={this.state.tagLeft} />
                                </Col>
                                <Col>
                                    <DisplayTags tags={this.state.tagRight} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Collection Children</h3>
                            <Row>
                                <Col>
                                    <DisplayChildren children={this.state.childLeft} />
                                </Col>
                                <Col>
                                    <DisplayChildren children={this.state.childRight} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        }

        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>To start search a Collection Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return(
                       <Display />
                    )
                case 'notFound': 
                    return <div>Collection relationship type not found</div>
                case 'error': 
                    return <div>An error has occurred</div>
                default:
                    return <div>To start search a Collection Instance ID</div>
            } 
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <FormGroup className="margin-top-10">
                            <Input 
                                className="input-text-line bg-color-page"
                                type="text" 
                                name="collectionInstanceId" 
                                id="collectionInstanceId" 
                                value={this.state.collectionInstanceId} 
                                onChange={event => this.changeValue(event,"collectionInstanceId")} 
                                onKeyDown={this.checkEnter}
                                placeholder="Search a Collection Instance ID"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
                <ModalPage ref="viewCollectionJson" component={<RenderJson json={this.state.collection} />} pullUpType={"view"} />
            </Container>
        )
    }

}

export default GetCollection;