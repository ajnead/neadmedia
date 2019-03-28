import React from 'react';
import { Nav, Container } from 'reactstrap';
import ThirdNavLinks from '../components/nav/thirdNavLinks';
import ThirdNavSwitch from '../components/nav/thirdNavSwitch';
import CrawlerMapping from '../models/crawler/crawlerMappings';
import RealTimeCrawler from '../models/crawler/realTimeCrawler';
import CrawlerSettings from '../models/crawler/crawlerSettings';

class CrawlerContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                  name: 'Entity Mappings',
                  to: '/definitions/crawler/mappings',
                  component: CrawlerMapping
                },
                {
                    name: 'Real Time Crawler',
                    to: '/definitions/crawler/realTime',
                    component: RealTimeCrawler
                },
                {
                    name: 'Crawler Setting',
                    to: '/definitions/crawler/settings',
                    component: CrawlerSettings
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