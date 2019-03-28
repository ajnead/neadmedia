import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardLink, CardFooter } from 'reactstrap';
import MicroserviceRoutes from '../../controllers/microserviceRoutes';
import ShowCardConfigs from './showCardConfigs';
import OptionDisplay from '../../components/cards/optionDisplay';

class GetMicroserivces extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            microservices : [ { running: { } } ],
            runningMicroservices : [ { } ],
            filters: { },
        }

        this.startStopMicroservice = this.startStopMicroservice.bind(this);
        this.openPullUp = this.openPullUp.bind(this);
    }

    changeFilters(filters){
        this.setState({
            filters: filters
        },()=>{
            this.loadConfigurationsList();
        })
    }

    openPullUp(microserviceId,serviceDataType,serviceKey,pullUp,name){
        this.props.openPullUp(microserviceId,serviceDataType,serviceKey,pullUp,name);
    }

    loadConfigurationsList(filters){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.postMicroserviceConfigurations(this.state.filters,()=>{
            var get = microserviceRoutes.returnParam;
            var status = get.metadata.status;
            
            if(status==="success"){
                var microservices = get.payload.microservices;
                
                for(var m=0; m<microservices.length; m++){
                    var ms = microservices[m];
                    ms.running = {
                        active: false,
                        startedAt: "Loading",
                        heartbeat: "Loading",
                        serviceMessage: "Loading",
                        runningState: "Loading",
                        messagesProcessed: 0
                    };
                }

                this.setState({
                    microservices: microservices,
                    filters: filters
                });   
            }

            this.loadActiveMicroservices();
        });
    }

    loadActiveMicroservices(){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.postActiveMicroservices(()=>{
            var get = microserviceRoutes.returnParam;
            var status = get.metadata.status;
            var runningMs = get.payload.microservices;

            if(status==="success"){
                var microservices = this.state.microservices;
                for(var m=0; m<microservices.length; m++){
                    var ms = microservices[m];
                    var msId = ms.microserviceId;

                    var didUpdateRunning = false;
                    for(var r=0; r<runningMs.length; r++){
                        var rMs = runningMs[r];
                        var rMsId = rMs.microserviceId;

                        if(msId===rMsId){
                            rMs.runningState = "Start";
                            if(rMs.active){
                                rMs.runningState = "Stop";
                            }
                            ms.running = rMs;
                            didUpdateRunning = true;
                        }
                    }

                    //defaults if service has never been runnning
                    if(!didUpdateRunning){
                        ms.running = {
                            active: false,
                            startedAt: "Not started",
                            heartbeat: "No heartbeat",
                            serviceMessage: "Service not started",
                            runningState: "Start",
                            messagesProcessed: 0
                        };
                    }
                }

                this.setState({
                    runningMicroservices: runningMs
                });   
            }
        });
    }

    startStopMicroservice(serviceDataType,serviceKey){
        var microservices = this.state.microservices
        var msState = null;
        for(var m=0; m<microservices.length; m++){
            var ms = microservices[m];
            var mDataType = ms.serviceDataType;
            var mServiceKey = ms.serviceKey;

            if(mDataType===serviceDataType&&mServiceKey===serviceKey){
                msState = ms.running.runningState;
                break;
            }
        }

        if(msState!=null){
            var action = msState.toLowerCase();
            const microserviceRoutes = new MicroserviceRoutes();
            microserviceRoutes.getStartStopMicroservice(action,serviceDataType,serviceKey,()=>{
                var get = microserviceRoutes.returnParam;
                var status = get.metadata.status;

                if("success"===status){
                    this.loadConfigurationsList();
                }
            });
        }
    }

    render(){
        return(
            <div>
            {this.state.microservices.map((m, i) => ( 
                <Row key={i} noGutters className="list-row">
                    <Card style={{ width: '100%' }} className="no-border">
                        <CardBody>
                            <CardTitle tag="h4">{m.name} [{m.microserviceId}] <div className="float-right">{m.microserviceGroup}</div></CardTitle>
                            <CardSubtitle>{m.description}</CardSubtitle>
                        </CardBody>
                        <CardBody className="no-padding-top">
                            <CardTitle className="underline">Orchestration</CardTitle>
                            <Row className="margin-top-5">
                                <Col><OptionDisplay name={"Active"} value={JSON.stringify(m.running.active)} /></Col>
                                <Col><OptionDisplay name={"Started At"} value={m.running.startedAt} /></Col>
                                <Col><OptionDisplay name={"Heart Beat"} value={m.running.heartbeat} /></Col>
                            </Row>
                            <Row>
                                <Col><OptionDisplay name={"URL"} value={m.locationUrlToRun} /></Col>
                                <Col><OptionDisplay name={"Port"} value={m.locationPortToRun} /></Col>
                                <Col><OptionDisplay name={"Machine"} value={m.machineToRun} /></Col>
                            </Row>
                            <Row>
                                {m.running.exceptionOccurred ? 
                                     <Col><OptionDisplay name={"Service Message"} value={m.running.serviceMessage} isError={true} /></Col>
                                    :<Col><OptionDisplay name={"Service Message"} value={m.running.serviceMessage} isError={false} /></Col>
                                }
                                <Col xs="4"><OptionDisplay name={"Messages Processed"} value={m.running.messagesProcessed} /></Col>
                            </Row>
                        </CardBody>
                        <ShowCardConfigs msObj={m} />
                        <CardFooter>
                                <CardLink 
                                    href={"#pullUp=edit&microserviceId=" + m.microserviceId} 
                                    onClick={()=>this.openPullUp(m.microserviceId,m.serviceDataType,m.serviceKey,"edit",m.name)}
                                >Edit Config</CardLink>
                                <CardLink 
                                    href={"#pullUp=history&microserviceId=" + m.microserviceId}  
                                    onClick={()=>this.openPullUp(m.microserviceId,m.serviceDataType,m.serviceKey,"history",m.name)}
                                >Config History</CardLink>
                                <CardLink 
                                    href={"#startStop"} 
                                    onClick={()=>this.startStopMicroservice(m.serviceDataType,m.serviceKey)}
                                >{m.running.runningState}</CardLink>
                                <CardLink 
                                    href={"#pullUp=query&microserviceId=" + m.microserviceId + "&serviceKey=" + m.serviceKey + "&dataType=" + m.serviceDataType}  
                                    onClick={()=>this.openPullUp(m.microserviceId,m.serviceDataType,m.serviceKey,"query",m.name)}
                                >Query</CardLink>
                        </CardFooter>
                    </Card>
                </Row>
            ))}
            </div>
        )
    }

}

export default GetMicroserivces;