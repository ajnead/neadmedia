import React from 'react';
import FeedRoutes from '../routes/feedRoutes';
import ParentCard from '../models/feed/parentCard';
import DiscoveryCard from '../models/feed/discoveryCard';

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            feedType: 'all',
            feedId: 1,
            start: 0,
            stop: 100,
            feed: []
        }
    }

    componentDidMount(){
        this.loadFeed();
    }

    loadFeed(){
        const state = this.state;
        const feedRoutes = new FeedRoutes();
        feedRoutes.getFeed(state.start,state.stop,state.feedType,state.feedId,()=>{
            const response = feedRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    feed: response.payload.feedLines
                })
            }
        });
    }

    render(){
        var CardSwitch = (props) => {
            switch(props.cardType){
                case 'parent': return <ParentCard parentInstanceId={props.feed.feedLinedId} />
                case 'discovery': return <DiscoveryCard feed={props.feed} />
                default: return <span></span>
             }
        }

        return(
            <div className="home-container">
                {this.state.feed.map((feed,i)=>(
                    <CardSwitch key={i} cardType = {feed.feedLineType} feed={feed} />
                ))}
            </div>
        )
    }

}

export default HomeContainer;