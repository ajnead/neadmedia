import React from 'react';
import { Container, Nav } from 'reactstrap';
import ThirdNavLinks from '../components/nav/thirdNavLinks';
import ThirdNavSwitch from '../components/nav/thirdNavSwitch';
import GetParent from '../models/relationships/parent/getParent';
import GetCollection from '../models/relationships/collection/getCollection';

class RelationshipContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                    name: 'Parents',
                    to: '/data/relationships/parents',
                    component: GetParent
                },
                {
                    name: 'Collections',
                    to: '/data/relationships/collections',
                    component: GetCollection
                }
            ],
            relationshipSearch: ""
        }
    }

    render(){
        return(
            <Container fluid>
                <div className="third-nav">
                    <div className="sidebar">
                        <Nav vertical>
                            {this.state.navItems.map((item, i) => {
                            return <ThirdNavLinks key={i} item={item} parameter={this.state.skuInstanceId} />;
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

export default RelationshipContainer;