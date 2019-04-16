import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import InputText from '../components/display/inputText';

class OnboardingContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: ''
        }
    }

    onChange(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    render(){
        return(
            <Container fluid>
                <Row className="padding-top-25">
                    <Col xs={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardBody>
                                <CardTitle tag={"h5"}>Register</CardTitle>
                                <InputText
                                    labelClassName={"font-bold"}
                                    className={"input-text"}
                                    name={"firstName"}
                                    title={"First Name"}
                                    onChange={(event)=>{this.onChange(event,"firstName")}}
                                />
                                <InputText
                                    labelClassName={"font-bold"}
                                    className={"input-text"}
                                    name={"lastName"}
                                    title={"Last Name"}
                                    onChange={(event)=>{this.onChange(event,"lastName")}}
                                />
                                <InputText
                                    labelClassName={"font-bold"}
                                    className={"input-text"}
                                    name={"emailAddress"}
                                    title={"Email Address"}
                                    onChange={(event)=>{this.onChange(event,"emailAddress")}}
                                />
                                <Button block>Join</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default OnboardingContainer;