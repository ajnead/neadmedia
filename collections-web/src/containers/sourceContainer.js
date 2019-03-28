import React, { Component } from 'react';
import { Container, Nav } from 'reactstrap';
import ThirdNavLinks from '../components/nav/thirdNavLinks';
import ThirdNavSwitch from '../components/nav/thirdNavSwitch';
import PipelineHistory from '../models/sources/pipelineHistory';
import SourceData from '../models/sources/sourceData';
import SourceHistory from '../models/sources/sourceHistory';
import ViewPipeline from '../models/sources/viewPipeline';
import getQueryParameter from '../utilities/url/getQueryParameter';

class SourceContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                    name: 'View Pipeline',
                    to: '/data/sources/pipeline',
                    component: ViewPipeline
                },
                {
                  name: 'Source Data',
                  to: '/data/sources/data',
                  component: SourceData
                },
                {
                    name: 'Change Log',
                    to: '/data/sources/history',
                    component: SourceHistory
                  },
                {
                    name: 'Pipeline History',
                    to: '/data/sources/pipelineHistory',
                    component: PipelineHistory
                },
            ],
            sourceInstanceSearch: ""
        }
    }

    componentDidMount(){
        setInterval(() => {
            var queryParameter = getQueryParameter("sourceInstanceId");
            var search = "?sourceInstanceId=" + queryParameter;
            if(queryParameter!==undefined&&queryParameter!=null&&queryParameter.length>3){
                if(this.state.sourceInstanceSearch!==search){
                    this.setState({
                        sourceInstanceSearch: search
                    })
                }
            }
        }, 100);
    }

    render(){
        return(
            <Container fluid>
                <div className="third-nav">
                    <div className="sidebar">
                        <Nav vertical>
                            {this.state.navItems.map((item, i) => {
                            return <ThirdNavLinks key={i} item={item} parameter={this.state.sourceInstanceSearch} />;
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

export default SourceContainer;