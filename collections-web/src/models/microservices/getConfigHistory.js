import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MicroserviceRoutes from '../../controllers/microserviceRoutes';
import HistoryCard from '../../components/cards/historyCards';

class GetConfigHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            microserviceId: 0,
            microserviceName: "NoName",
            loadState: "waitingQuery",
            history: []
        }

        this.loadMicroserviceHistory = this.loadMicroserviceHistory.bind(this);
    }

    componentDidUpdate(){
        if(this.state.microserviceId!==this.props.microserviceId){
            this.setState({
                microserviceId: this.props.microserviceId,
                microserviceName: this.props.name
            },()=>{
                this.loadMicroserviceHistory();
            })
        }
    }

    loadMicroserviceHistory(){
        this.setState({
            loadState: 'waitingResults'
        });
        
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.getMicroserviceConfigurationHistory(this.state.microserviceId,()=>{
            var response = microserviceRoutes.returnParam;
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
                            <font>Microservice ID: {this.state.microserviceId} - {this.state.microserviceName}</font>
                        </h3>
                    </Col>
                </Row>
                <div className="margin-top-15">
                    <HistoryCard history={this.state.history} idTitle={"Microservice History ID"} idName={"microserviceHistoryId"} />
                </div>
            </Container>
        )
    }
}

export default GetConfigHistory;