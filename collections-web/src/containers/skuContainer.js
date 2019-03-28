import React from 'react';
import { Container, Nav } from 'reactstrap';
import ThirdNavLinks from '../components/nav/thirdNavLinks';
import ThirdNavSwitch from '../components/nav/thirdNavSwitch';
import SkuData from '../models/skus/skuData';
import SkuHistory from '../models/skus/skuHistory';
import getQueryParameter from '../utilities/url/getQueryParameter';

class SkuContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                  name: 'SKU Data',
                  to: '/data/skus/data',
                  component: SkuData
                },
                {
                    name: 'Change Log',
                    to: '/data/skus/history',
                    component: SkuHistory
                },
            ],
            skuInstanceIdSearch: ""
        }
    }

    componentDidMount(){
        setInterval(() => {
            var queryParameter = getQueryParameter("skuInstanceId");
            var search = "?skuInstanceId=" + queryParameter;
            if(queryParameter!==undefined&&queryParameter!=null&&queryParameter.length>3){
                if(this.state.skuInstanceIdSearch!==search){
                    this.setState({
                        skuInstanceIdSearch: search
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
                            return <ThirdNavLinks key={i} item={item} parameter={this.state.skuInstanceIdSearch} />;
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

export default SkuContainer;