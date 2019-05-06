import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InputSourceInstanceId from './filters/inputSourceInstanceId';
import SourceRoutes from '../../controllers/sourceRoutes';
import HistoryCards from '../../components/cards/historyCards';

class SourceHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sourceInstanceId: "",
            sourceHistory: [ {  } ],
            loadState: "waitingQuery"
        }

        this.loadHistory = this.loadHistory.bind(this);
        this.returnValue = this.returnValue.bind(this);
    }

    returnValue(key,value){
        this.setState({
            [key]: value
        },()=>{
            this.loadHistory();
        })
    }

    loadHistory(){
        this.setState({
            loadState: 'waitingResults'
        });

        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getSourceHistory(this.state.sourceInstanceId,()=>{
            var response = sourceRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    sourceHistory: response.payload.history,
                    loadState: 'success'
                });   
            }else{
                this.setState({
                    loadState: 'notFound'
                });
            }
        });
    }

    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>Search a Source Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return <HistoryCards history={this.state.sourceHistory} idTitle={"Source History ID"} idName={"sourceHistoryId"} />
                case 'notFound':
                    return <div>Source not found</div>
                default: 
                    return <div>Source not found</div>
            } 
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <InputSourceInstanceId returnValue={this.returnValue} />
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
            </Container>
        )
    }
}

export default SourceHistory;