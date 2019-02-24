import React from 'react';
import { Input } from 'reactstrap';
import Routes from '../components/navigation/routes';

class DiscoveryContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            query: ''
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.getSearch = this.getSearch.bind(this);
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode===13){
            this.getSearch();
        }
    }

    getSearch(){
        const protocolPrefix = "endvr/";
        const query = this.state.query;
        const endvrProtocolCheck = query.substring(0,protocolPrefix.length).toLowerCase();
        
        if(protocolPrefix===endvrProtocolCheck){
            const request = query.substring(protocolPrefix.length);
            this.endvrProtocol(request);
        }else{
            //normal search goes here
        }
    }

    endvrProtocol(request){
        var url = null;
        
        for(var route of Routes){
            const path = (route.path).substring(1).toLowerCase();
            if(path===request){
                url = route.path;
            }
        }

        if(url!==null){
            this.props.history.push(url);
        }
    }

    render(){
        return(
            <div className="discovery-container">
                <div className="discovery-query">
                    <Input 
                        placeholder="Search" 
                        value={this.state.query} 
                        onChange={event=>this.changeValue(event,'query')}
                        onKeyDown={this.checkEnter} />
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