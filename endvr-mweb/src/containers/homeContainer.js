import React from 'react';
import FeedRoutes from '../routes/feedRoutes';
import ParentCard from '../models/feed/parentCard';
import DiscoveryCard from '../models/feed/discoveryCard';
import QuestionCard from '../models/feed/questionCard';

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            start: 0,
            stop: 100,
            pageSize: 25,
            feedChildren: []
        }
    }

    componentDidMount(){
        this.loadFeed();
    }

    loadFeed(){
        const state = this.state;
        const feedRoutes = new FeedRoutes();
        feedRoutes.getFeed(state.start,state.stop,state.pageSize,()=>{
            const response = feedRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    feedChildren: response.payload.feedChildren
                })
            }
        });
    }

    render(){
        var CardSwitch = (props) => {
            switch(props.cardType){
                case 'parent': return <ParentCard parentInstanceId={props.feedChildren.feedChildInstanceId} />
                case 'discovery': return <DiscoveryCard feedChildren={props.feedChildren} />
                case 'question': return <QuestionCard feedChildren={props.feedChildren} />
                default: return <span></span>
             }
        }

        return(
            <div className="home-container">
                {this.state.feedChildren.map((feedChildren,i)=>(
                    <CardSwitch key={i} cardType = {feedChildren.feedChildType} feedChildren={feedChildren} />
                ))}
            </div>
        )
    }

}

export default HomeContainer;