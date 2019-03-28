import React from 'react';
import Moment from 'react-moment'
import 'moment-timezone';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import InputSourceInstanceId from './filters/inputSourceInstanceId';
import SourceRoutes from '../../controllers/sourceRoutes';
import OptionDisplay from '../../components/cards/optionDisplay';

class PipelineHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sourceInstanceId: "",
            pipelineHistory: [ {  } ],
            loadState: "waitingQuery"
        }

        this.returnValue = this.returnValue.bind(this);
        this.loadPipelineHistory = this.loadPipelineHistory.bind(this);
    }

    returnValue(key,value){
        this.setState({
            [key]: value
        },()=>{
            this.loadPipelineHistory();
        })
    }

    loadPipelineHistory(){
        this.setState({
            loadState: "waitingResults"
        })

        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getPipelineHistory(this.state.sourceInstanceId,()=>{
            var response = sourceRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    pipelineHistory: response.payload.all,
                    loadState: 'success'
                });   
            }else{
                this.setState({
                    loadState: 'notFound'
                });   
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
                    return <PipelineCards history={this.state.pipelineHistory} />
                case 'notFound':
                    return <div>Source not found</div>
                default: 
                    return <div>Source not found</div>
            } 
        }

        const PipelineCards = (props) => {
            return (
                <div>
                    {props.history.map((his,i) => (
                    <Row key={i} className="margin-top-15">
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Source Pipeline Change ID: {his.sourcePipelineChangeId}</CardTitle>
                                    <CardSubtitle><OptionDisplay name={"Change Message"} value={his.changeMessage} /></CardSubtitle>
                                    <Row className="margin-top-10">
                                        <Col><OptionDisplay name={"Status From"} value={his.previousSourcePipelineStatusId} /></Col>
                                        <Col><OptionDisplay name={"Status To"} value={his.newSourcePipelineStatusId} /></Col>
                                        <Col><OptionDisplay name={"Service Name"} value={his.serviceName} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{his.updateDate / 1000}</Moment>} /></Col>
                                        <Col><OptionDisplay name={"Updated By"} value={his.updatedBy} /></Col>
                                        <Col><OptionDisplay name={"Machine"} value={his.machine} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Trace ID"} value={his.traceId} /></Col>
                                        <Col><OptionDisplay name={"Origin Trace ID"} value={his.originTraceId} /></Col>
                                        <Col></Col>
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
            </Container>
        )
    }    
}

export default PipelineHistory;