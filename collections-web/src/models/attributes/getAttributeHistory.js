import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import HistoryCards from '../../components/cards/historyCards';
import AttributeRoutes from '../../controllers/attributeRoutes';

class GetAttributeHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            attributeId: 0,
            attributeName: "",
            loadState: "waitingQuery",
            history: []
        }
    }

    componentDidUpdate(){
        if(this.state.attributeId!==this.props.attributeId){
            this.setState({
                attributeId: this.props.attributeId,
                attributeName: this.props.attributeName
            },()=>{
                this.loadAttributeHistory();
            })
        }
    }

    loadAttributeHistory(){
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.getAttributeHistory(this.state.attributeId,()=>{
            var response = attributeRoutes.returnParam;
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
                            <font>Attribute ID: {this.state.attributeId} - {this.state.attributeName}</font>
                        </h3>
                    </Col>
                </Row>
                {this.state.loadState == 'success' ? 
                    <div className="margin-top-15">
                        <HistoryCards history={this.state.history} idTitle={"Atttribute History ID"} idName={"attributeHistoryId"} />
                    </div>
                    :
                    <div>Loading....</div>
                }
            </Container>
            
        )
    }
}

export default GetAttributeHistory;