import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import IdentityRoutes from '../../controllers/identityRoutes';
import HistoryCard from '../../components/cards/historyCards';

class GetIdentityHistory extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            identityInstanceId: '',
            loadState: "waitingQuery",
            history: []
        }

        this.loadHistory = this.loadHistory.bind(this);
    }

    componentDidMount(){
        this.setState({
            identityInstanceId: this.props.identityInstanceId
        },()=>{
            this.loadHistory();
        })
    }

    componentDidUpdate(){
        if(this.state.identityInstanceId!==this.props.identityInstanceId){
            this.setState({
                identityInstanceId: this.props.identityInstanceId
            },()=>{
                this.loadHistory();
            })
        }
    }

    loadHistory(){
        this.setState({
            loadState: 'waitingResults'
        });
        
        const identityRoutes = new IdentityRoutes();
        identityRoutes.getIdentityHistory(this.state.identityInstanceId,()=>{
            var response = identityInstanceId.returnParam;
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
                            <font>Identity Instance ID: {this.state.identityInstanceId}</font>
                        </h3>
                    </Col>
                </Row>
                <div className="margin-top-15">
                    <HistoryCard history={this.state.history} idTitle={"Identity History ID"} idName={"identityHistoryId"} />
                </div>
            </Container>
        )
    }
}

export default GetIdentityHistory;