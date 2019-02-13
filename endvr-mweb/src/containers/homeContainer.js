import React from 'react';
import '../styles/feed.css';
import ParentCard from '../models/feed/parentCard';

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            feed: []
        }
    }

    render(){
        return(
            <div className="home-container">
                <ParentCard parentInstanceId={'rrp-1-2'} />
                <ParentCard parentInstanceId={'rrp-1-2'} />
            </div>
        )
    }

}

export default HomeContainer;