import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PullUp from '../components/pullUp/pullUp';
import EditAttribute from '../models/attributes/editAttribute';
import GetAttributeHistory from '../models/attributes/getAttributeHistory';
import GetVersions from '../models/attributes/getVersions';
import GetVersionStats from '../models/attributes/getVersionStats';
import ViewAttributeList from '../models/attributes/viewAttributeList';

class AttributeContainer extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            openEditPopup: false,
            component: <EditAttribute />,
            attributeId: null,
            version: null,
            pullUpType: 'edit'
        };

        this.openPullUp = this.openPullUp.bind(this);
        this.close = this.close.bind(this);
        this.setVersion = this.setVersion.bind(this);
        this.openAttributeHistory = this.openAttributeHistory.bind(this);
    }

    openPullUp(){
        this.setState({
            openEditPopup: true,
            component: <EditAttribute />,
            pullUpType: 'edit'
        });
    }

    openAttributeHistory(attributeId,attributeName){
        this.setState({
            openEditPopup: true,
            component: <GetAttributeHistory attributeId={attributeId} attributeName={attributeName} />,
            pullUpType: 'view'
        });
    }

    setVersion(version){
        this.setState({
            version: version
        });
    }

    close(){
        this.setState({
            openEditPopup: false,
        });
    }

    render(){
        return(
            <Container fluid>
                <GetVersions setVersion={this.setVersion} />
                <GetVersionStats version={this.state.version} addAttribute={this.openPullUp} />
                <ViewAttributeList version={this.state.version} open={this.openPullUp} openAttributeHistory={this.openAttributeHistory} />
                <PullUp component={this.state.component} open={this.state.openEditPopup} close={this.close} pullUpType={this.state.pullUpType} />
            </Container>
        )
    }
}

export default AttributeContainer;