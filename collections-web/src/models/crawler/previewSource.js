import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import ReactJson from 'react-json-view';
import Configs from '../../configs/configs';
import originTracer from '../../utilities/api/originTracer';
import CrawlerMappingNames from './filters/crawlerMappingNames';


class PreviewSource extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            crawlerMappingId: "1",
            crawlerMappingOptions: [
                {
                    value: "Nike",
                    id: "1"
                    
                },
                {
                    value: "Running Warehouse",
                    id: "2"
                }
            ],
            cralwerObj: null,
            sourceObj: null,
            crawlerMethod: null
        }

        this.setCrawlerMappingId = this.setCrawlerMappingId.bind(this);
        this.createUpdateSource = this.createUpdateSource.bind(this);
        this.transformToSource = this.transformToSource.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            cralwerObj: props.src,
            crawlerMethod: props.crawlerMethod
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    setCrawlerMappingId(crawlerMappingId){
        this.setState({
            crawlerMappingId: crawlerMappingId
        })
    }

    transformToSource(){
        fetch(Configs.collectionApiUrl + '/crawler/mapping/' + this.state.crawlerMappingId + '/'+ this.state.crawlerMethod + '/transform?viewType=all&' + originTracer(), {
            method: 'POST',
            headers: {
                'Authorization': 'private' ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.cralwerObj)
        })
        .then(response => response.json())
        .then(response => {
            var metaData = response.metadata;
            var status = metaData.status;

            if(status==="success"){
                this.setState({
                    sourceObj: response.payload
                })
            }
        });
    }

    createUpdateSource(){
        fetch(Configs.collectionApiUrl + '/source/' + this.state.sourceObj.sourceSku + '/write?' + originTracer(), {
            method: 'POST',
            headers: {
                'Authorization': 'private' ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.sourceObj)
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
            <div className="margin-left-10">
                <Row>
                    <Col xs="6">
                        <CrawlerMappingNames changeValue={this.setCrawlerMappingId} crawlerMethod={this.state.crawlerMethod} hasLabel={true} />
                    </Col>
                    <Col xs="3">
                        <Button className="bg-color-second no-border margin-top-33" block={true} onClick={this.transformToSource}>Transform To Source</Button>
                    </Col>
                    <Col xs="3">
                    {(this.state.sourceObj!=null)?
                        (<Button className="bg-color-second no-border margin-top-33" block={true} onClick={this.createUpdateSource}>Create/Update Source</Button>) :
                        (<div></div>)
                    }
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <ReactJson src={this.state.cralwerObj} displayDataTypes={false}/>
                    </Col>
                    <Col xs="6">
                    {(this.state.sourceObj!=null)?
                        (<ReactJson src={this.state.sourceObj} displayDataTypes={false}/>) :
                        (<div></div>)
                    }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PreviewSource;