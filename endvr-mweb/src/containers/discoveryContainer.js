import React from 'react';
import { Input } from 'reactstrap';

class DiscoveryContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            query: ''
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    render(){
        return(
            <div className="discovery-container">
                <div className="discovery-query">
                    <Input placeholder="search" value={this.state.query} onChange={event=>this.changeValue(event,'query')} />
                </div>
                <div className="discovery-list">

                </div>
                <div className="discovery-relationships">

                </div>
            </div>
        )
    }
}

export default DiscoveryContainer;