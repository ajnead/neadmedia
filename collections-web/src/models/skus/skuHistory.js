import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SkuRoutes from '../../controllers/skuRoutes';
import InputSkuInstanceId from './filters/inputSkuInstanceId';
import HistoryCards from '../../components/cards/historyCards';

class SkuHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            skuInstanceId: "",
            loadState: "waitingQuery",
            skuHistory: []
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

        const skuRoutes = new SkuRoutes();
        skuRoutes.getSkuHistory(this.state.skuInstanceId,()=>{
            var response = skuRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    skuHistory: response.payload.history,
                    loadState: 'success'
                });   
            }else if(status==="not_found"){
                this.setState({
                    loadState: "notFound"
                })
            }else{
                this.setState({
                    loadState: "error"
                })
            }
        })
    }

    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>To start search a SKU Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return <HistoryCards history={this.state.skuHistory} idTitle={"SKU History ID"} idName={"skuHistoryId"} />
                case 'notFound':
                    return <div>SKU not found</div>
                case 'error': 
                    return <div>SKU not found</div>
                default: 
                    return <div>To start search a SKU Instance ID</div>
            } 
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <InputSkuInstanceId returnValue={this.returnValue} />
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
            </Container>
        )
    }
}

export default SkuHistory;