import React from 'react';
import { CardBody, CardTitle, Row, Col } from 'reactstrap';
import OptionDisplay from '../../components/cards/optionDisplay';

class ShowCardConfigs extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collapsed: true,
            collapsedText: "expand",
            collapsedClassName: "display-none",
            msObj: {}
        }
        
        this.toggle = this.toggle.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            msObj: props.msObj
        }
    }

    toggle(){
        var collapsedText = "expand";
        var collapsedClassName = "display-none";
        if(this.state.collapsed){
            collapsedText = "collapse";
            collapsedClassName = "display-block";
        }

        this.setState({
            collapsed: !this.state.collapsed,
            collapsedClassName: collapsedClassName,
            collapsedText: collapsedText    
        })
    }

    render(){
        return(
            <CardBody className="no-padding-top">
                <CardTitle><font className="underline">Configurations</font> [<a className="alt" href="#expand" onClick={this.toggle}>{this.state.collapsedText}</a>]</CardTitle>
                <div className={this.state.collapsedClassName}>
                    <Row className="margin-top-5">
                        <Col><OptionDisplay name={"Service Key"} value={this.state.msObj.serviceKey} /></Col>
                        <Col><OptionDisplay name={"Service Data Type"} value={this.state.msObj.serviceDataType} /></Col>
                        <Col><OptionDisplay name={"Service Class"} value={this.state.msObj.serviceClass} /></Col>
                    </Row>
                    <Row>
                        <Col><OptionDisplay name={"Service Status"} value={this.state.msObj.serviceStatusId} /></Col>
                        <Col><OptionDisplay name={"Service Type"} value={this.state.msObj.serviceType} /></Col>
                        <Col><OptionDisplay name={"Log Name"} value={this.state.msObj.logName} /></Col>
                    </Row>
                    <Row>
                        <Col><OptionDisplay name={"Method To Invoke"} value={this.state.msObj.pollSize} /></Col>
                        <Col><OptionDisplay name={"Heartbeat Interval"} value={this.state.msObj.heartbeatInterval} /></Col>
                        <Col><OptionDisplay name={"Poll Size"} value={this.state.msObj.pollSize} /></Col>
                    </Row>
                    <Row>
                        <Col><OptionDisplay name={"Class Path"} value={this.state.msObj.classPath} /></Col>
                        <Col><OptionDisplay name={"Topic Consumed Key"} value={this.state.msObj.topicConsumedKey} /></Col>
                        <Col><OptionDisplay name={"Topic Published Key"} value={this.state.msObj.topicPublishedKey} /></Col>
                    </Row>
                </div>
            </CardBody>
        )
    }
}

export default ShowCardConfigs;