import React from 'react';
import CrawlerRoutes from '../../controllers/crawlerRoutes';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Moment from 'react-moment'
import 'moment-timezone';
import InputText from '../../components/inputs/inputText';
import InputTextNoLabel from '../../components/inputs/inputTextNoLabel';
import NonInput from '../../components/display/nonInput';
import PopUp from '../../components/display/popup';
import OptionDisplay from '../../components/cards/optionDisplay';

class EditCrawler extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            crawlerInstanceId: null,
            crawler: {
                crawlerSettings: [],
                crawlerAttributes: [],
                crawlerImages: [],
                crawlerName: '',
                crawlerStatus: '',
                crawlerFamily: '',
                crawlerSubFamily: '',
                founationId: '',
                identityInstanceId: '',
            }
        }

        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount(){
        this.setState({
            crawlerInstanceId: this.props.crawlerInstanceId
        },()=>{
            this.loadCrawler()
        })
    }

    componentDidUpdate(){
        if(this.state.crawlerInstanceId!==this.props.crawlerInstanceId){
            this.setState({
                crawlerInstanceId: this.props.crawlerInstanceId
            },()=>{
                this.loadCrawler()
            })
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    loadCrawler(){
        if(this.state.crawlerInstanceId!==null){
            const crawlerRoutes = new CrawlerRoutes();
            crawlerRoutes.getCrawler(this.state.crawlerInstanceId,()=>{
                var response = crawlerRoutes.returnParam;
                var status = response.metadata.status;

                if(status==="success"){
                    this.setState({
                        crawler: response.payload
                    })
                }
            })
        }
    }

    render(){
        const DisplayAttributeJsonCard = (props) => {
            return(
                <Card></Card>
            )
        }

        const DisplayAttributeHtmlCard = (props) => {
            return(
                <Card></Card>
            )
        }

        const DisplayAttributeInheritsFoundationCard = (props) => {
            return(
                <Card></Card>
            )
        }

        const DisplayAttributeStaticCard = (props) => {
            return(
                <Card></Card>
            )
        }

        return(
            <Container fluid>
                <Row>
                    <Col>
                        <h3>{this.state.crawler.crawlerName} [Crawler Instance ID: {this.state.crawlerInstanceId}]</h3>
                        <h6 className="float-left vertical-breaks"><b>Last Updated:</b> <Moment unix tx="America/New_York">{this.state.crawler.updateDate / 1000}</Moment></h6>
                        <h6 className="float-left"><b>Last Updated By:</b> {this.state.crawler.updatedBy}</h6>
                    </Col>
                </Row>
                <Row className="margin-top-15">
                    <Col>
                        <InputText 
                            title={"Crawler Name"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.crawler.crawlerName}
                            onChange={event => this.changeValue(event,"crawlerName")}
                        />
                        <InputText 
                            title={"Crawler Family"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.crawler.crawlerFamily}
                            onChange={event => this.changeValue(event,"crawlerFamily")}
                        />
                        <InputText 
                            title={"Foundation ID"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.crawler.foundationId}
                            onChange={event => this.changeValue(event,"foundationId")}
                        />
                    </Col>
                    <Col>
                        <InputText 
                            title={"Crawler Status"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.crawler.crawlerStatus}
                            onChange={event => this.changeValue(event,"crawlerStatus")}
                        />
                        <InputText 
                            title={"Crawler Sub Family"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.crawler.crawlerSubFamily}
                            onChange={event => this.changeValue(event,"crawlerSubFamily")}
                        />
                        <InputText 
                            title={"Identity Instance ID"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.crawler.identityInstanceId}
                            onChange={event => this.changeValue(event,"identityInstanceId")}
                        />
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col xs={{ size: 6, offset: 3}}>
                        <Button className="bg-color-second no-border" block disabled>Update Crawler</Button>
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <h3>Crawler Settings [{this.state.crawler.crawlerSettings.length}]</h3>
                        {this.state.crawler.crawlerSettings.map((s,i)=>(
                            <Card key={i} className="margin-bottom-10">
                                <CardBody >
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5">Crawler Setting ID: {s.crawlerSettingId}</CardTitle>
                                        </Col>
                                        <Col>
                                            <div className="float-right text-muted">
                                                <Moment unix tx="America/New_York">{s.updateDate / 1000}</Moment>
                                            </div>
                                        </Col>
                                    </Row>
                                    <OptionDisplay name={"JSON Path"} value={s.jsonPath} />  
                                    <Row>
                                        <Col>
                                            <OptionDisplay name={"Setting Type"} value={s.crawlerSettingType} />  
                                            <OptionDisplay name={"Is Loop"} value={JSON.stringify(s.isLoop)} />
                                            <OptionDisplay name={"Parse Key"} value={s.parseKey} />  
                                            <OptionDisplay name={"Query For Parse Key"} value={s.queryForParseKey} />  
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"Setting Type Order"} value={s.crawlerSettingTypeOrder} />      
                                            <OptionDisplay name={"Loop JSON Key"} value={s.loopJsonKey} />
                                            <OptionDisplay name={"Parse End"} value={s.parseEnd} />  
                                            <OptionDisplay name={"Parent Crawler Setting ID"} value={s.parentCrawlerSettingId} />  
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"Setting Type Roles"} value={s.crawlerSettingTypeRoles} />   
                                            <OptionDisplay name={"Array Position"} value={s.arrayPosition} />   
                                            <OptionDisplay name={"Parse End Index Of"} value={s.parseEndIndexOf} />   
                                            <OptionDisplay name={"Parent Crawler Setting ID"} value={s.parentCrawlerSettingId} />  
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>            
                        ))}
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <h3>Crawler Attributes [{this.state.crawler.crawlerAttributes.length}]</h3>
                        {this.state.crawler.crawlerAttributes.map((a,i)=>(
                            <Card key={i} className="margin-bottom-10">
                                <CardBody >
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5">Crawler Attribute ID: {a.crawlerAttributeMapperId}</CardTitle>
                                        </Col>
                                        <Col>
                                            <div className="float-right text-muted">
                                                <Moment unix tx="America/New_York">{a.updateDate / 1000}</Moment>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <OptionDisplay name={"Attribute ID"} value={a.attributeId} />
                                            <OptionDisplay name={"Extraction Type"} value={a.extractionType} />  
                                            <OptionDisplay name={"JSON Path"} value={a.jsonPath} />
                                            <OptionDisplay name={"Restriction Type"} value={a.restrictionType} /> 
                                            <OptionDisplay name={"Retrieve Image"} value={a.retrieveImage} /> 
                                            <OptionDisplay name={"Retrieve Image Parse Key"} value={a.retrieveImageParseKey} /> 
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"Crawler Setting ID"} value={a.crawlerSettingId} />
                                            <OptionDisplay name={"Is Loop"} value={JSON.stringify(a.isLoop)} />      
                                            <OptionDisplay name={"Loop JSON Key"} value={a.loopJsonKey} /> 
                                            <OptionDisplay name={"Restriction Key"} value={a.restrictionKey} /> 
                                            <OptionDisplay name={"Retrieve Image Type"} value={a.retrieveImageType} /> 
                                            <OptionDisplay name={"Override Source SKU"} value={JSON.stringify(a.overrideSource)} /> 
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"Alt Attribute Name"} value={a.altAttributeName} />
                                            <OptionDisplay name={"Parse Order"} value={a.parseOrder} />     
                                            <OptionDisplay name={"Array Position"} value={a.arrayPosition} />
                                            <OptionDisplay name={"Restriction Value"} value={a.restrictionValue} />  
                                            <OptionDisplay name={"Retrieve Image Parse Path"} value={a.retrieveImageParsePath} /> 
                                            <OptionDisplay name={"Override Source SKU Key"} value={a.overrideSourceKey} /> 
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>            
                        ))}
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <h3>Crawler Images [{this.state.crawler.crawlerImages.length}]</h3>
                        {this.state.crawler.crawlerImages.map((img,i)=>(
                            <Card key={i} className="margin-bottom-10">
                                <CardBody >
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5">Crawler Image ID: {img.crawlerAttributeMapperId}</CardTitle>
                                        </Col>
                                        <Col>
                                            <div className="float-right text-muted">
                                                <Moment unix tx="America/New_York">{img.updateDate / 1000}</Moment>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="margin-top-5">
                                        <Col>
                                            <OptionDisplay name={"Attribute ID"} value={img.attributeId} />  
                                            <OptionDisplay name={"Restriction Type"} value={img.restrictionType} />  
                                            <OptionDisplay name={"Position With Restriction"} value={img.positionWithRestriction} />  
                                            <OptionDisplay name={"Replace Value In Link"} value={JSON.stringify(img.replaceValueInLink)} />  
                                        </Col>
                                        <Col>
                                            {img.jsonPath === null ? <OptionDisplay name={"JSON Path"} value={"root"} /> : <OptionDisplay name={"JSON Path"} value={img.jsonPath} /> } 
                                            <OptionDisplay name={"Restriction Key"} value={img.restrictionKey} />  
                                            <OptionDisplay name={"Image Order"} value={img.imageOrder} />  
                                            <OptionDisplay name={"Replace Search Value"} value={img.replaceSearchValue} />          
                                            
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"JSON Key"} value={img.loopJsonKey} />   
                                            <OptionDisplay name={"Restriction Value"} value={img.restrictionValue} />     
                                            <OptionDisplay name={"Image Tag"} value={img.imageTag} />  
                                            <OptionDisplay name={"Replace With Value"} value={img.replaceWithValue} /> 
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>            
                        ))}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditCrawler;