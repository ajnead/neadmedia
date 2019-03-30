import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, CardBody, Card, CardTitle, CardImg, CardFooter, CardLink } from 'reactstrap';
import { FormGroup, Input } from 'reactstrap';
import Moment from 'react-moment'
import 'moment-timezone';
import Configs from '../../../configs/configs';
import RelationshipRoutes from '../../../controllers/relationshipRoutes';
import OptionDisplay from '../../../components/cards/optionDisplay';
import OptionDisplayList from '../../../components/cards/optionDisplayList';
import PreviewJson from '../../../components/pullUp/previewJson';
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
            }
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
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

    loadCollection(){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getCollection(this.state.collectionInstanceId,()=>{
            var response = relationshipRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    collection: response.payload
                })
            }
        });
    }

    render(){
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
                <Row className="margin-top-10">
                    <Col>
                        <h3 className="margin-top-0">Collection Information</h3>
                        <Card>    
                            <CardBody>
                                <CardTitle tag="h4">{this.state.collection.collectionName}</CardTitle>
                                <Row>
                                    <Col xs="auto">
                                        <CardImg src={this.state.collection.imageUrl} />
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
                                <CardLink href="javascript:void(0);" onClick={this.viewJson}>View Collection JSON</CardLink>
                                <CardLink href="javascript:void(0);" onClick={this.indexCollection}>Re-index Collection</CardLink>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <h3 className="margin-top-0">Collection Tags</h3>
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <h3 className="margin-top-0">Collection Children</h3>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default GetCollection;