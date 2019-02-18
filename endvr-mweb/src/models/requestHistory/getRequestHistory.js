import React from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import ManageStorage from '../../utilities/storage/manageStorage';
import KeyValue from '../../components/display/keyValue';
import ArrayHelpers from '../../utilities/helpers/arrayHelpers';

class GetRequestHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            storageKey: "requestHistoryData",
            history: []
        }
    }

    componentDidMount(){
        const manageStorage = new ManageStorage(this.state.storageKey);
        const history = manageStorage.getStorage();
        

        if(history!==null&&history!==undefined){
            const arrayHelpers = new ArrayHelpers;
        
            this.setState({
                history: arrayHelpers.reversed(history),
                hasHistory: true
            })
        }else{
            this.setState({
                history: [],
                hasHistory: false
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.history.map((history,i)=>(
                <div key={i} className="card-holder">
                    <Card className="border-0">
                        <CardBody>
                            <Row>
                                <Col><KeyValue className={'font-h7'} name={'Trace ID'} value={history.traceId} /></Col>
                            </Row>
                            <Row>
                                <Col><KeyValue className={'font-h7'} name={'Resource'} value={history.eventType} /></Col>
                            </Row>
                            <Row>
                                <Col><KeyValue className={'font-h7'} name={'Status'} value={history.status} /></Col>
                                <Col><KeyValue className={'font-h7'} name={'Milliseconds'} value={history.millisecondsTaken} /></Col>
                            </Row>
                            <Row>
                                <Col><KeyValue className={'font-h7'} name={'HTTP Method'} value={history.httpMethod} /></Col>
                                <Col><KeyValue className={'font-h7'} name={'Response Code'} value={history.httpResponseCode} /></Col>
                            </Row>
                        </CardBody>
                    </Card>    
                </div>
                ))}
            </div>
        )
    }
}

export default GetRequestHistory;