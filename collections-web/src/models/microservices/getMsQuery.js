import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Jumbotron } from 'reactstrap';
import ReactJson from 'react-json-view';
import MicroserviceRoutes from '../../controllers/microserviceRoutes';
import NonInput from '../../components/display/nonInput';
import OptionDisplay from '../../components/cards/optionDisplay';

class GetMsQuery extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            microserviceId: 0,
            mObj: { 
                threadContainer: []
            },
            dataType: null,
            serviceKey: null,
            microserviceName: "",
            switch: "Switch to JSON View"
        }

        this.loadMsQuery = this.loadMsQuery.bind(this);
        this.switchToJson = this.switchToJson.bind(this);
    }

    componentDidUpdate(){
        if(this.state.microserviceId!==this.props.microserviceId){
            this.setState({
                microserviceId: this.props.microserviceId,
                dataType: this.props.dataType,
                serviceKey: this.props.serviceKey,
                microserviceName: this.props.name
            },()=>{
                this.loadMsQuery();
            });   
        }
    }

    loadMsQuery(){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.getMsQuery(this.state.dataType,this.state.serviceKey,()=>{
            var get = microserviceRoutes.returnParam;
            var status = get.metadata.status; 

            if(status==="success"){
                this.setState({
                    mObj: get.payload,
                    microserviceId: this.props.microserviceId
                });   
            }
        });
    }

    switchToJson(){
        var switchJson = "Switch to JSON View";
        if(this.state.switch===switchJson){
            switchJson = "Switch to Inline View";
        }

        this.setState({
            switch: switchJson
        });
    }

    render(){
        const Switch = (props) => {
            if(props.switch==="Switch to JSON View"){
                if(this.state.mObj.microserviceId!=null){
                    return(
                        <div>
                            <Row className="margin-top-20">
                                <Col>
                                    <NonInput title={"Service Message"} value={this.state.mObj.serviceMessage} />
                                </Col>
                            </Row>
                            <Row> 
                                <Col>
                                    <NonInput title={"ServiceName"} value={this.state.mObj.serviceName} />
                                    <NonInput title={"Active"} value={JSON.stringify(this.state.mObj.active)} />
                                    <NonInput title={"Thread Is Alive"} value={JSON.stringify(this.state.mObj.threadIsAlive)} />
                                    <NonInput title={"Thread Is Interrupted"} value={JSON.stringify(this.state.mObj.threadIsInterrupted)} />
                                    <NonInput title={"Messages Requested To Be Processed"} value={this.state.mObj.messagesProcessed} />
                                    <NonInput title={"Workers"} value={this.state.mObj.workers} />
                                    <NonInput title={"Heartbeat To Log Interval"} value={this.state.mObj.heartbeatToLogInterval} />
                                    <NonInput title={"Class Path"} value={this.state.mObj.classPath} />
                                    <NonInput title={"Consumed Topic"} value={this.state.mObj.consumedTopic} />
                                    <NonInput title={"Log Name"} value={this.state.mObj.logName} />
                                    <NonInput title={"Machine Name"} value={this.state.mObj.machine} />
                                    <NonInput title={"Microservice URL"} value={this.state.mObj.url} />
                                </Col>
                                <Col>
                                    <NonInput title={"Started At"} value={this.state.mObj.startedAt} />
                                    <NonInput title={"Heartbeat"} value={this.state.mObj.heartbeat} />
                                    <NonInput title={"Minutes Up"} value={this.state.mObj.uptimeMinutes} />
                                    <NonInput title={"Exception Occurred"} value={JSON.stringify(this.state.mObj.exceptionOccurred)} />
                                    <NonInput title={"Must Wait For Free Worker"} value={JSON.stringify(this.state.mObj.mustWait)} />
                                    <NonInput title={"Worker Sleep Interval"} value={this.state.mObj.workerSleepInterval} />
                                    <NonInput title={"Kafka Poll Size"} value={this.state.mObj.pollSize} />
                                    <NonInput title={"Method Invoked"} value={this.state.mObj.methodToInvoke} />
                                    <NonInput title={"Published Topic"} value={this.state.mObj.publishedTopic} />
                                    <NonInput title={"Log Level"} value={this.state.mObj.logLevel} />
                                    <NonInput title={"Paramter Option ID"} value={this.state.mObj.paramOptionId} />
                                    <NonInput title={"Microservice Port"} value={this.state.mObj.port} />
                                </Col>
                            </Row>
                            <Row className="margin-top-0">
                                <Col>
                                    <h3>Available Worker Threads</h3>
                                </Col>
                            </Row>
                            <WorkerCard threadContainer={this.state.mObj.threadContainer} />
                            <DisplayStackTrace stackTrace={this.state.mObj.stackTrace} hasException={this.state.mObj.exceptionOccurred} />
                        </div>
                    )
                }else{
                    return(
                        <Row className="margin-top-20">
                            <Col>
                                <NonInput title={"Service Message"} value={this.state.mObj.success} />
                            </Col>
                        </Row>
                    )
                }
            }else{
                return(
                    <div className="view-json margin-top-20">
                        <ReactJson src={this.state.mObj} displayDataTypes={false}/>
                    </div>
                )
            }
        }

        const WorkerCard = (props) => {
            if(props.threadContainer==null){
                return(
                    <div>No active workers</div>
                )
            }else{
                return(
                    <div className="margin-top-5">
                        {props.threadContainer.map((tc,i)=>(
                        <Row key={i} noGutters className="list-row">
                            <Card style={{ width: '100%' }} className="no-border">
                                <CardBody>
                                    <CardTitle>{tc.thread.threadName}</CardTitle>
                                    <CardSubtitle><OptionDisplay name={"Worker Message"} value={tc.thread.workerMessage} /></CardSubtitle>
                                    <Row className="margin-top-10">
                                        <Col><OptionDisplay name={"Thread Is Alive"} value={JSON.stringify(tc.thread.threadIsAlive)} /></Col>
                                        <Col><OptionDisplay name={"Thread State"} value={tc.thread.threadState} /></Col>
                                        <Col><OptionDisplay name={"Thread Is Interrupted"} value={JSON.stringify(tc.thread.threadIsInterrupted)} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Can Run"} value={JSON.stringify(tc.thread.canRun)} /></Col>
                                        <Col><OptionDisplay name={"Worker Status"} value={tc.thread.workerStatus} /></Col>
                                        <Col><OptionDisplay name={"Has Exception"} value={JSON.stringify(tc.thread.hasException)} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Messages Processed"} value={tc.thread.messagesProcessed} /></Col>
                                        <Col><OptionDisplay name={"Work Done Since Heartbeat"} value={tc.thread.lastHeartbeatWorkDone} /></Col>
                                        <Col><OptionDisplay name={"Sleep Counter"} value={tc.thread.sleepCounter} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Started At"} value={tc.thread.startedAt} /></Col>
                                        <Col><OptionDisplay name={"Last Heart Beat"} value={tc.thread.heartbeat} /></Col>
                                        <Col><OptionDisplay name={"Thread ID"} value={tc.threadId} /></Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        ))}
                    </div>
                )
            }
        }

        const DisplayStackTrace = (props) => {
            if(props.hasException){
                return(
                    <Row className="margin-bottom-10">
                        <Col>
                            <h3 className="margin-top-10">Stack Trace</h3>
                            <Card className="margin-top-10">
                                <Jumbotron fluid className="bg-color-white margin-bottom-0 padding-bottom-0 padding-top-10 padding-left-15 padding-right-15">
                                    {props.stackTrace.map((m, i) => (
                                    <div className="font-size-14 margin-bottom-5">{m}</div>
                                    ))}
                                </Jumbotron>
                            </Card>
                        </Col>
                    </Row>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }

        return(
             <Container fluid > 
                <h3 className="margin-top-10 width-100 height-22">
                    <font className="float-left">Microservice ID: {this.state.microserviceId} - {this.state.microserviceName}</font>
                    <span className = "float-left padding-left-10">[<a className="alt" href="#switchJson" onClick={this.switchToJson}>{this.state.switch}</a>]</span>
                </h3>
                <Switch msObj={this.state.msObj} switch={this.state.switch} />
            </Container>
        )
    }

}

export default GetMsQuery;