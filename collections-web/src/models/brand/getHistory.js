import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import BrandRoutes from '../../controllers/brandRoutes';
import HistoryCard from '../../components/cards/historyCards';

class GetHistory extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            brandId: 0,
            brandName: '',
            loadState: "waitingQuery",
            history: []
        }

        this.loadHistory = this.loadHistory.bind(this);
    }

    componentDidMount(){
        this.setState({
            brandId: this.props.brandId,
            brandName: this.props.brandName
        },()=>{
            this.loadHistory();
        })
    }

    componentDidUpdate(){
        if(this.state.brandId!==this.props.brandId){
            this.setState({
                brandId: this.props.brandId,
                brandName: this.props.brandName
            },()=>{
                this.loadHistory();
            })
        }
    }

    loadHistory(){
        this.setState({
            loadState: 'waitingResults'
        });
        
        const brandRoutes = new BrandRoutes();
        brandRoutes.getBrandHistories(this.state.brandId,()=>{
            var response = brandRoutes.returnParam;
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
                            <font>Brand ID: {this.state.brandId} - {this.state.brandName}</font>
                        </h3>
                    </Col>
                </Row>
                <div className="margin-top-15">
                    <HistoryCard history={this.state.history} idTitle={"Brand History ID"} idName={"brandHistoryId"} />
                </div>
            </Container>
        )
    }
}

export default GetHistory;