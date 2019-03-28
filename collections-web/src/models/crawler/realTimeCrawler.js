import React from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import ReactJson from 'react-json-view'
import Configs from '../../configs/configs';
import originTracer from '../../utilities/api/originTracer';
import DropDownNoLabel from '../../components/inputs/dropDownNoLabel';
import PullUp from '../../components/pullUp/pullUp';
import PreviewSource from './previewSource';
import CreateEntityMapping from './createEntityMapping';



class RealTimeCrawler extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            url: "",
            openPullUp: false,
            component: null,
            crawlerMethod: "diffBot",
            crawlerObj: { },
            crawlerResponse: false,
            loadState: "waitingQuery",
            crawlerTypeOptions: [
                {
                    value: "Diff Bot",
                    id: "diffBot"
                }
            ],
        }
        
        this.openPullUp = this.openPullUp.bind(this);
        this.closePullUp = this.closePullUp.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.getRawDiffBot = this.getRawDiffBot.bind(this);
    }

    componentDidMount(){
        //this.openPullUp("createEntityMapping");
    }

    openPullUp(componentType){
        var component = null;
        if(componentType==="createEntityMapping"){
            component = <CreateEntityMapping src={this.state.crawlerObj} method={this.state.crawlerMethod}/>
        }

        if(componentType==="previewSource"){
            component = <PreviewSource src={this.state.crawlerObj} crawlerMethod={this.state.crawlerMethod}/>
        }

        this.setState({
            openPullUp: true,
            component: component
        });
    }

    closePullUp(){
        this.setState({
            openPullUp: false
        });
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    getRawDiffBot(){
        this.setState({
            loadState: 'waitingResults'
        });

        var split = (this.state.url).split("?");
        var url = encodeURIComponent(split[0]);
        fetch(Configs.collectionApiUrl + '/crawler/realTime/' + this.state.crawlerMethod + '?url=' + url + '&viewType=all&' + originTracer(), {
            method: 'GET',
            headers: {
                'Authorization': 'private' 
            }
        })
        .then(response => response.json())
        .then(response => {
            var metaData = response.metadata;
            var status = metaData.status;

            if(status==="success"){
                this.setState({
                    crawlerObj: response.payload,
                    crawlerResponse: true,
                    loadState: 'success'
                })   
            }
        });
    }

    render(){
        const ViewResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div></div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return <ReactJson src={props.crawlerObj} displayDataTypes={false}/>
                default: 
                    return <div></div>
            } 
        }

        return(
            <div>
                <Row>
                    <Col>
                        <h3>Scrap Product Page</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <Input 
                            type="text" 
                            value={this.state.url} 
                            placeholder="product detail page url" 
                            onChange={event => this.changeValue(event,"url")} 
                        />
                    </Col>
                    <Col xs="3">
                        <DropDownNoLabel 
                            name="crawlerMethod" 
                            value={this.state.crawlerMethod} 
                            options={this.state.crawlerTypeOptions} 
                            onChange={event => this.changeValue(event,"crawlerMethod")}
                        />
                    </Col>
                    <Col xs="3">
                        <Button onClick={this.getRawDiffBot} className="bg-color-second no-border" block>Crawl URL</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="9">
                        <div className="view-json overflow-x-hidden">
                            <ViewResponse loadState={this.state.loadState} crawlerObj={this.state.crawlerObj} />
                        </div>
                    </Col>
                    <Col xs="3">
                        {(this.state.crawlerResponse) ?
                        (<div>
                            <Button onClick={()=>this.openPullUp("createEntityMapping")} className="bg-color-second no-border" block>Create Mapping</Button>
                            <Button onClick={()=>this.openPullUp("previewSource")} className="bg-color-second no-border margin-top-18" block>Preview Source</Button>
                        </div>) :
                        (<div></div>)
                        }
                    </Col>
                </Row>
                <PullUp component={this.state.component} open={this.state.openPullUp} close={this.closePullUp} />
            </div>
        )
    }
}

export default RealTimeCrawler;