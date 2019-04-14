import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import GetCrawlers from './getCrawlers';

class ViewCrawlers extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col>
                      
                    </Col>
                </Row>
                <GetCrawlers />
            </Container>
        )
    }
}

export default ViewCrawlers;