import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import Configs from '../../configs/configs';
import Modal from '../../components/display/modal';
import QuestionsModal from '../question/questionsModal';

class QuestionCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            question: {
                header: "Help us learn more about you",
                subHeader: "Questions help us learn more about you to create smarter recommendations",
                questions: 40,
                questions: [
                    {
                        "questionId": "qqq-1-1",
                        "question": "You prefer the enjoyment of being outdoors to city life.",
                        answerFormat: 'multiple',
                        answerType: 'single-choice',
                        choices: [
                            {
                                choiceId: 1,
                                choiceText: 'Outdoors',
                                asset: "icon-mountain-green-3305212.svg"
                            },
                            {
                                choiceId: 2,
                                choiceText: 'City Life',
                                asset: "icon-city-skyline-3305208.svg"
                            }
                        ]
                    }                     
                ]
            },
            component: <QuestionsModal />
        }

        this.questionAnswered = this.questionAnswered.bind(this);
    }

    questionAnswered(choice){
        this.setState({
            component : <QuestionsModal question={this.state.question.questions[0]} />
        },()=>{
            this.refs.questionsModal.open();
        })
    }

    render(){
        const assetUrl = Configs.iconAssetsUrl;
        return(
            <div className="card-holder">
                <Card className="border-0">
                    <CardBody>
                        <CardTitle className="font-weight-600 margin-bottom-0">{this.state.question.header}</CardTitle>
                        <CardText className="font-h7 text-grey">{this.state.question.subHeader}</CardText>
                    </CardBody>
                    <CardBody>
                        <CardText className="font-h6"><span className="font-weight-600">New question</span>: {this.state.question.questions[0].question}</CardText>
                        <Row>
                            <Col className="pointer" onClick={()=>this.questionAnswered(this.state.question.questions[0].choices[0].choiceText)}>
                                <CardImg className="feed-card-img" width={'100%'} src={assetUrl + this.state.question.questions[0].choices[0].asset} />
                                <div className="font-h6 font-weight-600 text-align-center">{this.state.question.questions[0].choices[0].choiceText}</div>
                            </Col>
                            <Col className="pointer" onClick={()=>this.questionAnswered(this.state.question.questions[0].choices[1].choiceText)}>
                                <CardImg className="feed-card-img" width={'100%'} src={assetUrl + this.state.question.questions[0].choices[1].asset} />
                                <div className="font-h6 font-weight-600 text-align-center">{this.state.question.questions[0].choices[1].choiceText}</div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Modal ref="questionsModal" component={this.state.component} />
            </div>
        )
    }
}

export default QuestionCard;