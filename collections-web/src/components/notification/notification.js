import React from 'react';
import PubSub from 'pubsub-js';

class Notification extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            traceId: null,
            status: 'success',
            millisecondsTaken: null,
            display: "display-none",
            pageUrl: null,
            eventType: null
        }

        this.updateState = this.updateState.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
    }

    componentDidMount(){
        PubSub.subscribe('notification-badge', (msg, data) => this.updateState(msg, data));
    }

    updateState(msg, data){  
        if(data.showMessageModal||(data.metadata.status!=="success"&&data.metadata.status!=="not_found")){
            this.setState({
                traceId: data.metadata.traceId,
                status: data.metadata.status,
                millisecondsTaken: data.metadata.millisecondsTaken,
                display: "display-block",
                eventType: data.eventType,
                pageUrl: data.pageUrl
            },()=>this.clearDisplay());
        }
    }

    clearDisplay(){
        setTimeout(() => {
            this.setState({
                display: "display-none"
            })
        }, 3000);
    }

    render(){
        return(
            <div className={"notification " + this.state.status + " " + this.state.display}>
                <div className="notification-header">
                    <div><b>Request:</b> {this.state.eventType}</div>
                    <div><b>Trace ID:</b> {this.state.traceId}</div>
                    <div><b>Status:</b> {this.state.status}</div>
                    <div><b>Milliseconds Taken:</b> {this.state.millisecondsTaken}</div>
                </div>
            </div>
        )
    }
}

export default Notification;