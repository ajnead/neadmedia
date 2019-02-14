import React from 'react';
import GetRequestHistory from '../models/requestHistory/getRequestHistory';

class RequestHistoryContainer extends React.Component {

    render(){
        return(
            <div className="request-history-container">
                <GetRequestHistory />
            </div>
        )
    }

}

export default RequestHistoryContainer;