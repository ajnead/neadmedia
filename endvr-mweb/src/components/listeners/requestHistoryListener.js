import React from 'react';
import PubSub from 'pubsub-js';
import ManageStorage from '../../utilities/storage/manageStorage';

class RequestHistoryListener extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            maxHistory: 50,
            storageKey: "requestHistoryData"
        }
    }

    componentDidMount(){
        PubSub.subscribe('endvr-api-request-history', (msg, data) => this.updateStorage(msg, data));
    }

    updateStorage(msg,data){
        var obj = {
            traceId: data.metadata.traceId,
            status: data.metadata.status,
            millisecondsTaken: data.metadata.millisecondsTaken,
            eventType: data.eventType,
            pageUrl: data.pageUrl,
            requestUrl: data.requestUrl,
            httpMethod: data.httpRequestMethod,
            httpResponseCode: data.httpResponseCode
        }

        const manageStorage = new ManageStorage(this.state.storageKey);
        manageStorage.updateStorage(obj);
    }

    render(){
        return(
            <span>API Request Listener Active</span>
        )
    }
}

export default RequestHistoryListener;