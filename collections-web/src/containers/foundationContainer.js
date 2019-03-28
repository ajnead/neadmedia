import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DropDownVersion from '../models/foundations/filters/dropDownVersion';
import DropDownFoundationName from '../models/foundations/filters/dropDownFoundationName';
import GetFoundation from '../models/foundations/getFoundation';

class FoundationContainer extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <Container fluid className="padding-top-20">
                <Row>
                    <Col>
                        <DropDownVersion />
                    </Col>
                    <Col>
                        <DropDownFoundationName />
                    </Col>
                    <Col></Col>
                </Row>
                <GetFoundation />
            </Container>
        )
    }
}

export default FoundationContainer;