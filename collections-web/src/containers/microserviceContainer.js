import React from 'react'
import { Container, Nav } from 'reactstrap';
import ThirdNavLinks from '../components/nav/thirdNavLinks';
import ThirdNavSwitch from '../components/nav/thirdNavSwitch';
import ViewMicroservices from '../models/microservices/viewMicroservices';
import ViewGroups from '../models/microservices/viewGroups';
import ViewNodes from '../models/microservices/viewNodes';

class MicroserviceContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                    name: 'Microservices',
                    to: '/system/microservices/all',
                    component: ViewMicroservices
                },
                {
                    name: 'Application Groups',
                    to: '/system/microservices/groups',
                    component: ViewGroups
                },
                {
                    name: 'Node Health',
                    to: '/system/microservices/nodes',
                    component: ViewNodes
                }
            ],
        }
    }

    render(){
        return(
            <Container fluid>
                <div className="third-nav">
                    <div className="sidebar">
                        <Nav vertical>
                            {this.state.navItems.map((item, i) => {
                            return <ThirdNavLinks key={i} item={item} />;
                            })}
                        </Nav>
                    </div>
                </div>
                <div className="panel">
                    <ThirdNavSwitch nav={this.state.navItems} />
                </div>
            </Container>
        )
    }
}

export default MicroserviceContainer;