import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Input, Jumbotron } from 'reactstrap';
import Moment from 'react-moment'
import 'moment-timezone';
import NonInput from '../components/display/nonInput';
import queryParamaterFromRouter from '../utilities/url/queryParamterFromRouter';
import TraceRoutes from '../controllers/traceRoutes';
import OptionDisplay from '../components/cards/optionDisplay';

class TraceContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            traceMetaData: [ { } ],
            data: { stackTrace : [] },
            loadState: 'waitingQuery',
            traceId: ""
        };

        this.queryTrace = this.queryTrace.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.getQuerySearch = this.getQuerySearch.bind(this);
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode == 13){
            this.queryTrace();
        }
    }

    componentDidMount() {
        this.getQuerySearch();
    }

    componentDidUpdate() {
        this.getQuerySearch();
    }

    getQuerySearch(){
        var traceId = queryParamaterFromRouter(this,"traceId");
        if(traceId!==undefined&&traceId!=null){
            if(this.state.traceId!==traceId){
                this.setState({
                    traceId: traceId
                },()=>{ this.queryTrace(); })
            }
        }
    }

    queryTrace(){
        if(this.state.traceId!==""){
            this.setState({
                loadState: 'waitingResult'
            });

            const traceRoutes = new TraceRoutes();
            traceRoutes.getTrace(this.state.traceId, (get)=>{
                var get = traceRoutes.returnParam;
                var status = get.metadata.status;

                if(status==="success"){
                    this.setState({
                        traceMetaData : get.payload.traceMetaData,
                        data: get.payload,
                        loadState: 'success'
                        
                    });   
                }else{
                    this.setState({
                        loadState: 'notFound'
                    })
                }
            });
        }else{
            this.setState({
                loadState: 'waitingQuery'
            })
        }
    }
    
    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery': return <div>To start a search enter a Trace ID on the line above</div>
                case 'waitingResult': return <div>Loading...</div>
                case 'success': 
                    return(
                        <div>
                            <TraceInfo data={props.data} traceMetaData={props.traceMetaData} />
                            <StackTraceInfo data={props.data} />
                        </div>
                    )
                case 'notFound': return <div>Trace not found</div>
                default: return <div>An error has occurred</div>
            }
        }

        const TraceInfo = (props) => {
            return(
                <div>
                    <Row>
                        <Col>
                            <h3 className="margin-top-10">Trace Information</h3>
                            <Card>
                                <CardBody>
                                    <NonInput title={"Trace ID"} value={props.data.traceId} />
                                    <NonInput title={"Alternate ID"} value={props.data.alternateId} />
                                    <NonInput title={"Origin Trace ID"} value={props.data.previousTraceIds} />
                                    <NonInput title={"Resource Requested"} value={props.data.resourceRequested} />
                                    <NonInput title={"Remote Address"} value={props.data.remoteAddress} />
                                    <NonInput title={"Is Done"} value={JSON.stringify(props.data.isDone)} />
                                    <NonInput title={"Is Success"} value={JSON.stringify(props.data.isSuccess)} />
                                    <NonInput title={"Action Intent"} value={props.data.actionIntent} />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <h3 className="header-margin">Stack Information</h3>
                            <Card>
                                <CardBody>
                                    <NonInput title={"Machine"} value={props.data.machine} />
                                    <NonInput title={"Deployed Version"} value={props.data.version} />
                                    <NonInput title={"Thread Name"} value={props.data.threadName} />
                                    <NonInput title={"Thread ID"} value={props.data.threadId} />
                                    <NonInput title={"Trace Start At"} value={<Moment unix tx="America/New_York">{props.data.createDate / 1000}</Moment>} />
                                    <NonInput title={"Trace Completed At"} value={<Moment unix tx="America/New_York">{props.data.completeDate / 1000}</Moment>} />
                                    <NonInput title={"Millseconds Taken"} value={props.data.millisecondsTaken} />
                                    <NonInput title={"Data Type Affected"} value={props.data.classDataType} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className="margin-top-10">Trace Meta Data</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {props.traceMetaData.map((m, i) => (
                            <Card key={i} className="margin-top-10">
                                <CardBody>
                                    <Row>
                                        <Col><OptionDisplay name={"Sequence Order"} value={m.sequenceOrder} /></Col>
                                        <Col><OptionDisplay name={"Action Classification"} value={m.actionClass} /></Col>
                                        <Col><OptionDisplay name={"Action Type"} value={m.actionType} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Service Name"} value={m.serviceName} /></Col>
                                        <Col><OptionDisplay name={"Has Stack Trace"} value={JSON.stringify(m.hasStackTrace)} /></Col>
                                        <Col><OptionDisplay name={"Timestamp"} value={m.timeStamp} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Method Invoked"} value={m.methodInvoked} /></Col>
                                        <Col><OptionDisplay name={"Trace Placed At"} value={m.tracePlacedAt} /></Col>
                                        <Col><OptionDisplay name={"Trace Message Level"} value={m.traceMessageLevel} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Service Message"} value={m.serviceMessage} /></Col>
                                        {m.classTypeAffected!==null ?
                                             <Col xs="4"><OptionDisplay name={"Class Type Affected"} value={m.classTypeAffected} /></Col>
                                            :<div></div>
                                        }
                                    </Row>
                                </CardBody>
                            </Card>
                            ))}
                        </Col>
                    </Row>
                </div>
            )
        }

        const StackTraceInfo = (props) => {
            if(props.data.stackTrace!=null&&props.data.stackTrace.length>0){
                return(
                    <Row>
                        <Col>
                            <h3 className="header-margin">Stack Trace</h3>
                            <Jumbotron fluid className="bg-color-white padding-top-10 padding-left-15 padding-right-15">
                                        {props.data.stackTrace.map((m, i) => (
                                        <p>{m}</p>
                                        ))}
                            </Jumbotron>
                        </Col>
                    </Row>
                )
            }else{
                return (<Row></Row>)
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
                                name="traceId" 
                                id="traceId" 
                                value={this.state.traceId} 
                                onChange={event => this.changeValue(event,"traceId")} 
                                onKeyDown={this.checkEnter}
                                placeholder="Search Trace ID"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <DetermineResponse 
                    loadState={this.state.loadState} 
                    data={this.state.data} 
                    traceMetaData={this.state.traceMetaData} 
                />
            </Container>
        )
    }
}

export default TraceContainer;