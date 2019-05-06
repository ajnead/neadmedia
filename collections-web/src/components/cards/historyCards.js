import React from 'react';
import Moment from 'react-moment'
import 'moment-timezone';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import OptionDisplay from '../../components/cards/optionDisplay';

const HistoryCards = (props) => {
    if(props.history!==null&&props.history!==undefined&&props.history.length>0){
        return(
            <div>
                {props.history.map((his,i) => (
                <Row key={i} className="margin-top-15">
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col><CardTitle>{props.idTitle}: {his[props.idName]}</CardTitle></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Value To"} value={his.valueTo} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Value From"} value={his.valueFrom} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Field Name"} value={his.fieldName} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Restriction"} value={his.restriction} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Action"} value={his.action} /></Col>
                                    <Col><OptionDisplay className="float-right" name={"Updated By"} value={his.updatedBy} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Object ID"} value={his.objectGuid} /></Col>
                                    <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{his.updateDate / 1000}</Moment>} /></Col>
                                </Row>
                                <Row>
                                    <Col><OptionDisplay name={"Trace ID"} value={his.traceId} isLink={true} href={"/system/trace?traceId=" + his.traceId}/></Col>
                                    <Col><OptionDisplay name={"Service Name"} value={his.serviceName} /></Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                ))}
            </div>
        )
    }else{
        return(
            <h6>No History available at this time</h6>
        )
    }
}

export default HistoryCards;