import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import InputText from '../../components/inputs/inputText';

class EditMsMetaData extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            msKey: "",
            msValue: "",
            id: 0,
            i: 0,
            updateDate: "",
            updatedBy: "",
        }

        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount(){
        this.setState({
            msKey: this.props.msKey,
            msValue: this.props.msValue,
            id: this.props.id,
            i: this.props.i,
            updateDate: this.props.updateDate,
            updatedBy: this.props.updatedBy
        });
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    render(){
        return(
            <Row key={this.state.i} noGutters className="list-row">
                <Card style={{ width: '100%' }} className="no-border">
                    <CardBody className="padding-bottom-0">
                        <CardTitle>
                            Microservice Meta Data ID: {this.state.id} 
                            <div className="trash-can-40-40 float-right">
                                <div className="icon-trash-can" onClick={()=>alert("delete me")}></div>
                            </div>
                        </CardTitle> 
                        <CardSubtitle>
                            <div className="float-left vertical-breaks"><b>Last Updated:</b> {this.state.updateDate}</div>
                            <div className="float-left"><b>Last Updated By:</b> {this.state.updatedBy}</div>
                        </CardSubtitle>
                    </CardBody>
                    <CardBody className="padding-top-10">
                        <Row>
                            <Col>
                                <InputText 
                                    name="msKey"
                                    title="Meta Data Key"
                                    className="input-text-line"
                                    labelClassName="bold"
                                    value={this.state.msKey}
                                    onChange={event=>this.changeValue(event,"msKey")}
                                />
                            </Col>
                            <Col>
                                <InputText 
                                    name="msValue"
                                    title="Meta Data Value"
                                    className="input-text-line"
                                    labelClassName="bold"
                                    value={this.state.msValue}
                                    onChange={event=>this.changeValue(event,"msValue")}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Row>
        )
    }
}

export default EditMsMetaData;