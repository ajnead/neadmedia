import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PullUp from '../../components/pullUp/pullUp';
import GetMicroservices from './getMicroservices';
//import getParameters from '../utilities/url/getParameters';
//import getParameter from '../utilities/url/getParameter';
import GetMsQuery from './getMsQuery';
import EditMicroserviceConfig from './editMicroserviceConfig';
import GetConfigHistory from './getConfigHistory';
import DropDownMsGroup from './filters/dropDownMsGroup';
import DropDownMsServiceClass from './filters/dropDownMsServiceClass';
import DropDownMsName from './filters/dropDownMsName';

class ViewMicroservices extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pullUpOpen: false,
            component: null,
            microserviceId: 0,
            pullUp: null,
            pullUpType: "edit",
            filters: { },
            forceUpdate: false
        }

        this.togglePullUp = this.togglePullUp.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount(){
        /*
        var paramArr = getParameters();
        var pullUp = getParameter(paramArr,"pullUp");
        var msId = getParameter(paramArr,"microserviceId");
        var serviceKey = getParameter(paramArr,"serviceKey");
        var dataType = getParameter(paramArr,"dataType");
        this.togglePullUp(msId,dataType,serviceKey,pullUp,null);      
        */

        this.getFilterMicroservices();
    }

    togglePullUp(microserviceId,serviceDataType,serviceKey,pullUp,name){
        var component = null;
        var pullUpType = "edit";

        switch(pullUp){
            case "query" : 
                component = <GetMsQuery microserviceId={microserviceId} dataType={serviceDataType} serviceKey={serviceKey} name={name} /> ; 
                var pullUpType = "view"; 
                break;
            case "edit" : 
                component = <EditMicroserviceConfig microserviceId={microserviceId} />; 
                break;
            case "history" : 
                component = <GetConfigHistory microserviceId={microserviceId} name={name} />; 
                var pullUpType = "view"; 
                break;
        }

        this.setState({
            pullUpOpen: !this.state.pullUpOpen,
            microserviceId: microserviceId,
            component: component,
            pullUp: pullUp,
            pullUpType: pullUpType
        });
    }

    filterHandler(filterName,filterValues){
        var filters = {};
        filters[filterName] = filterValues;

        if(filterValues.length==0){
            delete filters[filterName];
            delete this.state.filters[filterName]
        }

        var final = Object.assign(this.state.filters,filters);

        this.setState({
            filters: final
        },()=>{
            this.getFilterMicroservices();        
        })
    }

    getFilterMicroservices(){
        this.refs.getMicroservices.changeFilters(this.state.filters);
    }

    render(){
        return(
            <Container fluid>
                <Row className="padding-top-20">
                    <Col><DropDownMsGroup dataHandler={this.filterHandler} /></Col>
                    <Col><DropDownMsServiceClass dataHandler={this.filterHandler} /></Col>
                    <Col><DropDownMsName dataHandler={this.filterHandler} /></Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <GetMicroservices 
                            ref="getMicroservices"
                            openPullUp={this.togglePullUp} 
                            filters={this.state.filters} 
                            forceUpdate={this.state.forceUpdate} 
                            updateComplete={this.updateComplete} 
                        />
                    </Col>
                </Row>
                <PullUp open={this.state.pullUpOpen} close={this.togglePullUp} component={this.state.component} pullUpType={this.state.pullUpType} />
            </Container>
        )
    }
}

export default ViewMicroservices;

/**
 * <Row>
        <Col>
            <div className="margin-top-10">
                <h3 className="float-left">Microservices</h3>
                <div className="add-bttn-35-35 float-left margin-left-10">
                    <div className="icon-add" onClick={()=>alert("put a modal here to create a microservice")}></div>
                </div>
            </div>
        </Col>
    </Row>
 */