import React from 'react';
import Modal from '../components/display/modal';
import QuestionsModal from '../models/customer/questionsModal';

class QuestionsContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            component: <QuestionsModal />
        }

        //format 
        //multiple-accepted, free-text, single-choice 

        this.questions = [
            {
                questionId: 1,
                instanceId: 1,
                questionInstanceId: 'qqq-1-1',
                question: 'I prefer baseball over basketball',
                answerFormat: 'multiple',
                answerType: 'single-choice',
                choices: [
                    {
                        'choiceId' : 1,
                        'choiceText': 'True'
                    },
                    {
                        'choiceId' : 2,
                        'choiceText': 'False'
                    }
                ]

            },
            {
                questionId: 2,
                instanceId: 1,
                questionInstanceId: 'qqq-2-1',
                question: 'I prefer baseball over basketball',
                answerFormat: 'multiple',
                answerType: 'single-choice',
                choices: [
                    {
                        'choiceId' : 1,
                        'choiceText': 'True'
                    },
                    {
                        'choiceId' : 2,
                        'choiceText': 'False'
                    }
                ]

            }
        ]
    }

    componentDidMount(){
        this.refs.questionsModal.open();
        this.next();        
    }

    next(){
        //get open questions, use json above for simulation
        const random = Math.floor((Math.random() * 2));
        this.setState({
            question: this.questions[random] 
        },()=>{
            this.updateQuestionsModal();
        })
    }

    updateQuestionsModal(){
        this.setState({
            component: <QuestionsModal question={this.state.question} />
        })
    }

    render(){
        return(
            <div>
                <Modal ref="questionsModal" component={this.state.component} />
            </div>
        )
    }
}

export default QuestionsContainer;