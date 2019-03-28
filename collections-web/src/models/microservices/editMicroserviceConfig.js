import React from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import MicroserviceRoutes from '../../controllers/microserviceRoutes';
import InputText from '../../components/inputs/inputText';
import NonInput from '../../components/display/nonInput';
import EditMsMetaData from './editMsMetaData';
import ifNull from '../../utilities/helpers/ifNull';

class EditMicroserviceConfig extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            microserviceId: 0,
            msObj: { },
            serviceKey: "",
            serviceType: "",
            classPath: "",
            methodToInvoke: "",
            pollSize: 0,
            heartbeatInterval: 0,
            topicConsumedClass: "",
            topicConsumedKey: "",
            topicPublishedClass: "",
            topicPublishedKey: "",
            microserviceParamOptionId: 0,
            serviceClass: "",
            serviceDataType: "",
            microserviceMetaData: [],
            logName: "",
            description: "",
            name: "",
            isCreate: false,
            serviceStatusId: 0,
            microserviceGroupOrdinal: 0,
            microserviceGroup: "",
            locationUrlToRun: "",
            locationPortToRun: 80,
            machineToRun: "",
            workerThreads: "",
            workerSleepInterval: 0,
            heartbeatToLogInterval: 0
        }

        this.loadMicroserviceDetails = this.loadMicroserviceDetails.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.updateMicroservice = this.updateMicroservice.bind(this);
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    componentDidUpdate(){
        if(this.state.microserviceId!==this.props.microserviceId){
            this.setState({
                microserviceId: this.props.microserviceId
            },()=>{
                this.loadMicroserviceDetails();
            })
        }
    }

    loadMicroserviceDetails(){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.getMicroserviceDetails(this.state.microserviceId,()=>{
            var get = microserviceRoutes.returnParam;
            var status = get.metadata.status;
            var payload = get.payload;

            if(status==="success"){
                this.setState({
                    msObj: payload,
                    serviceKey: payload.serviceKey,
                    serviceType: payload.serviceType,
                    classPath: payload.classPath,
                    methodToInvoke: payload.methodToInvoke,
                    topicConsumedClass: payload.topicConsumedClass,
                    topicConsumedKey: payload.topicConsumedKey,
                    topicPublishedClass: ifNull(payload.topicPublishedClass),
                    topicPublishedKey: ifNull(payload.topicPublishedKey),
                    heartbeatInterval: payload.heartbeatInterval,
                    pollSize: payload.pollSize,
                    serviceClass: payload.serviceClass,
                    microserviceParamOptionId: payload.microserviceParamOptionId,
                    microserviceMetaData: payload.microserviceMetaData,
                    description: ifNull(payload.description),
                    name: payload.name,
                    serviceStatusId: payload.serviceStatusId,
                    microserviceGroupOrdinal: ifNull(payload.microserviceGroupOrdinal),
                    microserviceGroup: ifNull(payload.microserviceGroup),
                    logName: ifNull(payload.logName),
                    serviceDataType: ifNull(payload.serviceDataType),
                    locationUrlToRun: ifNull(payload.locationUrlToRun),
                    locationPortToRun: ifNull(payload.locationPortToRun),
                    machineToRun: ifNull(payload.machineToRun),
                    workerThreads: ifNull(payload.workerThreads),
                    heartbeatToLogInterval: ifNull(payload.heartbeatToLogInterval),
                    workerSleepInterval: ifNull(payload.workerSleepInterval)
                });   
            }
        });
    }

    updateMicroservice(){
        var body = {
            serviceKey: this.state.serviceKey,
            serviceType: this.state.serviceType,
            classPath: this.state.classPath,
            methodToInvoke: this.state.methodToInvoke,
            pollSize: this.state.pollSize,
            heartbeatInterval: this.state.heartbeatInterval,
            topicConsumedClass: this.state.topicConsumedClass,
            topicConsumedKey: this.state.topicConsumedKey,
            topicPublishedClass: this.state.topicPublishedClass,
            topicPublishedKey: this.state.topicPublishedKey,
            microserviceParamOptionId: this.state.microserviceParamOptionId,
            serviceClass: this.state.serviceClass,
            serviceDataType: this.state.serviceDataType,
            description: this.state.description,
            name: this.state.name,
            serviceStatusId: this.state.serviceStatusId,
            microserviceGroupOrdinal: this.state.microserviceGroupOrdinal,
            microserviceGroup: this.state.microserviceGroup,
            logName: this.state.logName,
            locationUrlToRun: this.state.locationUrlToRun,
            locationPortToRun: this.state.locationPortToRun,
            machineToRun: this.state.machineToRun,
            workerThreads: this.state.workerThreads,
            heartbeatToLogInterval: this.state.heartbeatToLogInterval,
            workerSleepInterval: this.state.workerSleepInterval
        }

        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.putMicroservice(this.state.microserviceId,body,undefined);
    }

    render(){
        return(
            <Container fluid>
                <Form>
                    <Row className="margin-top-35">
                        <Col>
                            <h3>Microservice ID: {this.state.msObj.microserviceId} - {this.state.name}</h3>
                            <h6 className="float-left vertical-breaks"><b>Last Updated:</b> {this.state.msObj.updateDate}</h6>
                            <h6 className="float-left"><b>Last Updated By:</b> {this.state.msObj.updatedBy}</h6>
                        </Col>
                    </Row>
                    <Row className="margin-top-15">
                        <Col>
                            <NonInput title={"Service Key"} value={this.state.serviceKey} />
                        </Col>
                        <Col>
                            <NonInput title={"Service Data Type"} value={this.state.serviceDataType} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="name"
                                title="Microservice Name"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.name}
                                onChange={event => this.changeValue(event,"name")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="microserviceStatusId"
                                title="Microservice Status"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.serviceStatusId}
                                onChange={event => this.changeValue(event,"serviceStatusId")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="logName"
                                title="Log Name"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.logName}
                                onChange={event => this.changeValue(event,"logName")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="serviceType"
                                title="Service Type"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.serviceType}
                                onChange={event => this.changeValue(event,"serviceType")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="classPath"
                                title="Class Path"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.classPath}
                                onChange={event => this.changeValue(event,"classPath")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="methodToInvoke"
                                title="Method To Invoke"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.methodToInvoke}
                                onChange={event => this.changeValue(event,"methodToInvoke")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="topicConsumedClass"
                                title="Topic Consumed Class"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.topicConsumedClass}
                                onChange={event => this.changeValue(event,"topicConsumedClass")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="topicConsumedKey"
                                title="Topic Consumed Key"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.topicConsumedKey}
                                onChange={event => this.changeValue(event,"topicConsumedKey")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="topicPublishedClass"
                                title="Topic Published Class"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.topicPublishedClass}
                                onChange={event => this.changeValue(event,"topicPublishedClass")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="topicPublishedKey"
                                title="Topic Published Key"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.topicPublishedKey}
                                onChange={event => this.changeValue(event,"topicPublishedKey")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="pollSize"
                                title="Poll Size"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.pollSize}
                                onChange={event => this.changeValue(event,"pollSize")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="heartbeatInterval"
                                title="Heart Beat Interval"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.heartbeatInterval}
                                onChange={event => this.changeValue(event,"heartbeatInterval")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="workerSleepInterval"
                                title="Worker Sleep Interval"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.workerSleepInterval}
                                onChange={event => this.changeValue(event,"workerSleepInterval")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="heartbeatToLogInterval"
                                title="Heart Beat To Log Interval"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.heartbeatToLogInterval}
                                onChange={event => this.changeValue(event,"heartbeatToLogInterval")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="microserviceParamOptionId"
                                title="Microservice Parameter Option"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.microserviceParamOptionId}
                                onChange={event => this.changeValue(event,"microserviceParamOptionId")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="serviceClass"
                                title="Service Class"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.serviceClass}
                                onChange={event => this.changeValue(event,"serviceClass")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="locationUrlToRun"
                                title="Location URL for Microservice"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.locationUrlToRun}
                                onChange={event => this.changeValue(event,"locationUrlToRun")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="locationPortToRun"
                                title="Location Port for Microservice"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.locationPortToRun}
                                onChange={event => this.changeValue(event,"locationPortToRun")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="machineToRun"
                                title="Microservice Machine"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.machineToRun}
                                onChange={event => this.changeValue(event,"machineToRun")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="workerThreads"
                                title="Worker Threads"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.workerThreads}
                                onChange={event => this.changeValue(event,"workerThreads")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="microserviceGroup"
                                title="Microservice Group"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.microserviceGroup}
                                onChange={event => this.changeValue(event,"microserviceGroup")}
                            />
                        </Col>
                        <Col>
                            <InputText 
                                name="microserviceGroupOrdinal"
                                title="Microservice Group Ordinal"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.microserviceGroupOrdinal}
                                onChange={event => this.changeValue(event,"microserviceGroupOrdinal")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText 
                                name="description"
                                title="Microservice Description"
                                className="input-text-line"
                                labelClassName="bold"
                                value={this.state.description}
                                onChange={event => this.changeValue(event,"description")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 6, offset: 3}}>
                            <Button className="bg-color-second no-border" block onClick={this.updateMicroservice}>Update Microservice</Button>
                        </Col>
                    </Row>
                </Form>    
                <Row className="margin-top-15">
                    <Col>
                        <h3>Microservice Meta Data</h3>
                    </Col>
                </Row>
                {this.state.microserviceMetaData.map((m,i) => (
                    <EditMsMetaData key={i} msKey={m.msKey} msValue={m.msValue} id={m.microserviceMetaDataId} i={i} updateDate={m.updateDate} updatedBy={m.updatedBy} />
                ))}
            </Container>
        )
    }
}

export default EditMicroserviceConfig;