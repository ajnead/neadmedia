import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CrawlerRoutes from '../../controllers/crawlerRoutes';
import HistoryCard from '../../components/cards/historyCards';

class GetHistory extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            crawlerInstanceId: null,
            crawlerName: '',
            loadState: "waitingQuery",
            history: []
        }

        this.loadHistory = this.loadHistory.bind(this);
    }

    componentDidMount(){
        this.setState({
            crawlerInstanceId: this.props.crawlerInstanceId,
            crawlerName: this.props.crawlerName
        },()=>{
            this.loadHistory();
        })
    }

    componentDidUpdate(){
        if(this.state.crawlerInstanceId!==this.props.crawlerInstanceId){
            this.setState({
                crawlerInstanceId: this.props.crawlerInstanceId,
                crawlerName: this.props.crawlerName
            },()=>{
                this.loadHistory();
            })
        }
    }

    loadHistory(){
        this.setState({
            loadState: 'waitingResults'
        });
        
        const crawlerRoutes = new CrawlerRoutes();
        crawlerRoutes.getCrawlerHistory(this.state.crawlerInstanceId,()=>{
            var response = crawlerRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    history: response.payload.history,
                    loadState: 'success'
                });   
            }else{
                this.setState({
                    loadState: 'notFound'
                });
            }
        })
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <h3 className="margin-top-10 width-100 height-22">
                            <font>Crawler ID: {this.state.crawlerInstanceId} [{this.state.crawlerName}]</font>
                        </h3>
                    </Col>
                </Row>
                <div className="margin-top-15">
                    <HistoryCard history={this.state.history} idTitle={"Crawler History ID"} idName={"crawlerHistoryId"} />
                </div>
            </Container>
        )
    }
}

export default GetHistory;