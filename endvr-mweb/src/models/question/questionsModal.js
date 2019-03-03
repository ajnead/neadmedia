import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import Configs from '../../configs/configs';

class QuestionsModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            question: {
                questionId: null,
                choices: [ {
                    asset: null,
                    choiceText: null
                } ]
            },
            header: 'Help us learn more about you',
            subHeader: 'Questions help us learn more about you to create smarter recommendations.  Each question is used to train our curation engine to your tastes.',
        }

        this.questionAnswered = this.questionAnswered.bind(this);
    }

    componentDidMount(){
        //this.update();
    }

    componentDidUpdate(){
        this.update();
    }

    update(){
        if(this.state.question.questionId!==this.props.question.questionId){
            this.setState({
                question: this.props.question
            })
        }
    }

    questionAnswered(choice){
        console.log(choice);
    }

    render(){
        const assetUrl = Configs.iconAssetsUrl;

        return(
           <Card className="border-0">
                <CardBody>
                    <CardTitle className="font-weight-600 margin-bottom-0">{this.state.header}</CardTitle>
                    <CardText className="font-h7 text-grey">{this.state.subHeader}</CardText>
                </CardBody>
                <CardBody>
                    <CardTitle><span className="font-weight-600">New question</span>: {this.state.question.question}</CardTitle>
                    <Row>
                        {this.state.question.choices.map((choice,i)=>(
                            <Col key={i} className="pointer" onClick={()=>this.questionAnswered(choice.choiceText)}>
                                <CardImg className="feed-card-img" width={'100%'} src={assetUrl + choice.asset} />
                                <div className="font-h6 font-weight-600 text-align-center">{choice.choiceText}</div>
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </Card>
        )
    }

}

export default QuestionsModal;