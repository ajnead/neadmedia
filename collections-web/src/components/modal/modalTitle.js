import React from 'react';
import { Row, Col } from 'reactstrap';

const ModalTitle = (props) => {
    return(
        <Row className="no-margin">
            <Col xs="10">
                <h3>{props.title}</h3>
            </Col>
            <Col xs="2">
                <div className = "modal-exit float-right" onClick = {props.toggle}></div>
            </Col>
        </Row>
    )
}

export default ModalTitle;