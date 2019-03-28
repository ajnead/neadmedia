import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import NonInput from '../components/display/nonInput';

class TokenContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            adalToken: 'adal.idtoken',
            tokenCollectionWeb: "No token"
        }
    }

    componentDidMount(){
        const adalToken = localStorage.getItem(this.state.adalToken);

        this.setState({
            tokenCollectionWeb: adalToken
        })
    }

    render(){
        return(
            <Container fluid>
                <Row noGutters>
                    <Col>
                        <h3 className="margin-top-10">Application Tokens</h3>
                        <Card>
                            <CardBody>
                                <NonInput copyButton={true} title={"Collection Web"} value={this.state.tokenCollectionWeb} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TokenContainer;