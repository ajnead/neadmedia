import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PubSub from 'pubsub-js';
import PullUp from '../pullUp/pullUp';
import PreviewJson from '../pullUp/previewJson';

class NotificationPanel extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            isOpen: false,
            display: "display-none",
            data: [],
            pullUpIsOpen: false,
            component: <PreviewJson json={{}} />,
            maxHistory: 50,
            storageKey: "notificationData"
        }

        this.toggle = this.toggle.bind(this);
        this.togglePullUp = this.togglePullUp.bind(this);
        this.updateState = this.updateState.bind(this);
        this.previewPayload = this.previewPayload.bind(this);
        this.updatePanel = this.updatePanel.bind(this);
        this.traceDeepLink = this.traceDeepLink.bind(this);
    }

    componentDidMount(){
        PubSub.subscribe('notification-badge', (msg, data) => this.updateState(msg, data));
    }

    updateState(msg, data){  
        var obj = {
            traceId: data.metadata.traceId,
            status: data.metadata.status,
            millisecondsTaken: data.metadata.millisecondsTaken,
            eventType: data.eventType,
            pageUrl: data.pageUrl,
            payload: data.payload,
            requestBody: data.requestBody,
            requestUrl: data.requestUrl,
            httpMethod: data.httpRequestMethod,
            httpResponseCode: data.httpResponseCode
        }

        var arr = this.getLocalStorage();
        arr.push(obj);
        localStorage.setItem(this.state.storageKey, JSON.stringify(arr));
        this.updatePanel();
    }

    traceDeepLink(url){
        this.props.history.push(url);
    }

    componentDidUpdate(){
        if(this.state.isOpen!==this.props.isOpen){
            this.setState({
                isOpen: this.props.isOpen
            },()=>{
                this.toggle();
            })
        }
    }

    toggle(){
        var display = "display-none";
        if(this.state.isOpen){
            display = "display-block";
        }

        this.updatePanel();
        this.setState({
            display: display
        });
    }

    getLocalStorage(){
        var arr = localStorage.getItem(this.state.storageKey);
        arr = JSON.parse(arr);
        if(arr===undefined||arr===null){ arr=[]; }

        if(arr.length===this.state.maxHistory){
            arr.splice(0,1);
        }

        return arr;
    }

    updatePanel(){
        var arr = this.getLocalStorage();
        var len = arr.length;
        var reversed = [];
        for(var l=(len -1); l>0; l--){
            var obj = arr[l];
            reversed.push(obj);
        }

        this.setState({
            data: reversed
        });
    }

    togglePullUp(){
        this.setState({
            pullUpIsOpen: !this.state.pullUpIsOpen
        })
    }

    previewPayload(payload,isRequest,requestUrl){
        const RequestComponent = (props) =>{
            return(
                <div>
                    <div className="margin-bottom-10"><b>Request URL:</b> {props.url}</div>
                    <PreviewJson json={payload} />
                </div>
            )
        } 
        var component = <PreviewJson json={payload} />
        if(isRequest){
            component = <RequestComponent url={requestUrl} />
        }

        this.setState({
            component: component
        },()=>{
            this.togglePullUp();
        })
    }

    render(){
        return(
            <div className={"notification-panel " + this.state.display}>
                {this.state.data.map((m,i) =>(
                    <Card key={i} className="margin-top-10">
                        <CardBody>
                            <div className="font-size-15"><b>Request:</b> {m.eventType}</div>
                            <div className="font-size-15 height-22"><b>Trace ID:</b> <a className="alt" href={"javascript:void(0);"} onClick={() => this.traceDeepLink("/system/trace?traceId=" + m.traceId)}>{m.traceId}</a></div>
                            <div className="width-100 height-22">
                                <div className="font-size-15 float-left vertical-breaks"><b>HTTP Method:</b> {m.httpMethod}</div>
                                <div className="font-size-15 float-left"><b>Milliseconds Taken:</b> {m.millisecondsTaken}</div>
                            </div>
                            <div className="width-100 height-22">
                                <div className="font-size-15 float-left vertical-breaks"><b>Status:</b> {m.status}</div>
                                <div className="font-size-15 float-left"><b>Status Code:</b> {m.httpResponseCode}</div>
                            </div>
                            <div className="margin-top-0">
                                <a href="#openPayload" className="alt vertical-breaks font-size-15" onClick={()=>{this.previewPayload(m.requestBody,true,m.requestUrl)}}>View Request</a>
                                <a href="#openPayload" className="alt font-size-15" onClick={()=>{this.previewPayload(m.payload,false,null)}}>View Response</a>
                            </div>
                        </CardBody>
                    </Card>
                ))}
                <PullUp 
                    component={this.state.component}
                    open={this.state.pullUpIsOpen} 
                    close={this.togglePullUp}
                    pullUpType={"view"}
                />
            </div>
        )
    }
}

export default withRouter(NotificationPanel);