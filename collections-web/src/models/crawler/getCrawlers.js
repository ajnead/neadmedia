import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardFooter, CardLink } from 'reactstrap';
import CrawlerRoutes from '../../controllers/crawlerRoutes';
import Configs from '../../configs/configs';
import OptionDisplay from '../../components/cards/optionDisplay';
import ModalPage from '../../components/display/modalPage';
import RenderJson from '../../components/display/renderJson';
import getQueryParameter from '../../utilities/url/getQueryParameter';
import EditCrawler from './editCrawler';
import GetHistory from './getHistory';

class GetCrawlers extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            crawlerLeft: [],
            crawlerRight: [],
            component: <EditCrawler crawlerInstanceId={null} />,
            pullUpType: "view"
        }
    }

    componentDidMount(){
        this.loadCrawlers();
        this.openCrawlerViewEdit('crw-2-1');
    }

    loadCrawlers(){
        const crawlerRoutes = new CrawlerRoutes();
        crawlerRoutes.getAllCrawler(()=>{
            var response = crawlerRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                var right = [];
                var left = [];
                
                if(response.payload.crawlers!==null&&response.payload.crawlers!==undefined){
                    var isLeft = true;
                    for(var obj of response.payload.crawlers){
                        if(isLeft){
                            left.push(obj);
                            isLeft = false;
                        }else{
                            right.push(obj);
                            isLeft = true;
                        }
                    }
                }
            
                this.setState({
                    crawlerRight: right,
                    crawlerLeft: left
                })
            }
        }) 
    }

    openCrawlerViewEdit(crawlerInstanceId){
        this.setState({
            component: <EditCrawler crawlerInstanceId={crawlerInstanceId} />,
            pullUpType: "edit"
        },()=>{
            this.refs.modalPage.open();
        })
    }

    openHistory(crawlerInstanceId,crawlerName){
        this.setState({
            component: <GetHistory crawlerInstanceId={crawlerInstanceId} crawlerName={crawlerName} />,
            pullUpType: "view"
        },()=>{
            this.refs.modalPage.open();
        })
    }

    render(){
        const DisplayCralwerList= (props) => {
            return(
                <div>
                {props.crawlerList.map((crawler,i)=>(
                    <Card className = "margin-bottom-10" key={i}>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5">{crawler.crawlerName} </CardTitle>
                                        </Col>
                                        <Col>
                                            <div className="float-right text-success">{crawler.crawlerStatus}</div>
                                        </Col>
                                    </Row>        
                                    <Row>
                                        <Col>
                                            <OptionDisplay name={"Crawler Instance ID"} value={crawler.crawlerInstanceId} />    
                                            <OptionDisplay name={"Identity Instance ID"} value={crawler.identityInstanceId} />    
                                            <OptionDisplay name={"Foundation ID"} value={crawler.foundationId} />    
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"Crawler Family"} value={crawler.crawlerFamily} />    
                                            <OptionDisplay name={"Crawler Sub Family"} value={crawler.crawlerSubFamily} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <CardLink href="javascript:void(0);" onClick={()=>{alert(1)}}>Re-Index Crawler</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>{this.openCrawlerViewEdit(crawler.crawlerInstanceId)}}>Edit Crawler</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>{this.openHistory(crawler.crawlerInstanceId,crawler.crawlerName)}}>View History</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>alert(1)}>View JSON</CardLink>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            )
        }

        return(
            <div>
                <Row>
                    <Col xs="6">
                        <DisplayCralwerList crawlerList={this.state.crawlerLeft} />
                    </Col>
                    <Col xs="6">
                        <DisplayCralwerList crawlerList={this.state.crawlerRight} />
                    </Col>
                </Row>
                <ModalPage ref="modalPage" component={this.state.component} pullUpType={this.state.pullUpType} />
            </div>
        )
    }
}

export default GetCrawlers;