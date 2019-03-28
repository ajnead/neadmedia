import React from 'react';
import {Row, Col, Card, CardBody, CardTitle, Form, Button } from 'reactstrap';
import Configs from '../../configs/configs';
import originTracer from '../../utilities/api/originTracer';
import DropDownNoLabel from '../../components/inputs/dropDownNoLabel';
import CrawlerMappingNames from './filters/crawlerMappingNames';

class CrawlerMappings extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            crawlerMappingId: 0,
            crawlerMappingOptions: [ ],
            crawlerConfig : {
                crawlerMappingAttributes: [ { } ]
            },
            crawlerMethod: "diffBot",
            crawlerMethodOptions: [
                {
                    id: "diffBot",
                    value: "Diff Bot"
                }
            ]
        }

        this.setCrawlerMappingId = this.setCrawlerMappingId.bind(this);
        this.getCrawlerMapping = this.getCrawlerMapping.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    setCrawlerMappingId(crawlerMappingId){
        this.setState({
            crawlerMappingId: crawlerMappingId
        });
    }

    getCrawlerMapping(){
        fetch(Configs.collectionApiUrl + '/crawler/mapping/' + this.state.crawlerMappingId + '/read?viewType=all&' + originTracer(), {
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
                this.setState({
                    crawlerConfig : response.payload
                })   
            }
        });
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <h3>Search Crawler Mappings</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DropDownNoLabel 
                            name="crawlerMethod" 
                            value={this.state.crawlerMethod} 
                            options={this.state.crawlerMethodOptions} 
                            onChange={event => this.changeValue(event,"crawlerMethod")}
                        />
                    </Col>
                    <Col>
                        <CrawlerMappingNames changeValue={this.setCrawlerMappingId} crawlerMethod={this.state.crawlerMethod} />
                    </Col>
                    <Col>
                        <Button onClick={this.getCrawlerMapping} className="bg-color-second no-border" block>Get Mapping</Button>
                    </Col>
                </Row>
                <Form>
                    <Row className="margin-top-10">
                        <Col>
                            <h3>Crawler Mapping</h3>
                        </Col>
                    </Row>
                    <Row noGutters className="list-row margin-bottom-15">
                        <Card style={{ width: '100%' }} className="no-border">
                            <CardBody>
                            <div className="margin-top-5">
                                <div className="vertical-breaks float-left"><b>Crawler Mapping ID</b>: {this.state.crawlerConfig.crawlerMappingId}</div>
                                <div className="vertical-breaks float-left"><b>Crawler Method</b>: {this.state.crawlerConfig.crawlerMethod}</div>
                                <div className="vertical-breaks float-left"><b>Crawler Entity ID</b>: {this.state.crawlerConfig.crawlerEntityId}</div>
                                <div className="float-left"><b>Crawler Entity Type</b>: {this.state.crawlerConfig.crawlerEntityClass}</div>
                            </div>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className="float-left">Crawler Attribute Mapping</h3>
                            <div className="add-bttn-35-35 float-left margin-left-10">
                                <div className="icon-add"></div>
                            </div>
                        </Col>
                    </Row>
                    {this.state.crawlerConfig.crawlerMappingAttributes.map((m ,i) => (
                    <Row key={i} noGutters className="list-row">
                        <Card style={{ width: '100%' }} className="no-border">
                            <CardBody>
                                <CardTitle tag="h4">
                                    Crawler Attribute Mapping ID: {m.crawlerMappingAttributeId}
                                    <div className="trash-can-40-40 float-right">
                                        <div className="icon-trash-can"></div>
                                    </div>
                                </CardTitle>
                            </CardBody>
                            <CardBody className="no-padding-top">    
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
                                </Row>
                            </CardBody>
                        </Card>
                    </Row>
                    ))}
                </Form>
            </div>
        )
    }

}

export default CrawlerMappings;