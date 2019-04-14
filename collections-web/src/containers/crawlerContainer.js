import React from 'react';
import { Nav, Container } from 'reactstrap';
import ThirdNavLinks from '../components/nav/thirdNavLinks';
import ThirdNavSwitch from '../components/nav/thirdNavSwitch';
import ViewCrawlers from '../models/crawler/viewCrawlers';
import DefaultView from '../components/defaultView'

class CrawlerContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                  name: 'Configurations',
                  to: '/definitions/crawler/mappings',
                  component: ViewCrawlers
                },
                {
                    name: 'Real Time Crawler',
                    to: '/definitions/crawler/realTime',
                    component: DefaultView
                }
            ]
        }
    }

    render(){
        return(
            <Container fluid className = "padding-top-10">
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

export default CrawlerContainer;