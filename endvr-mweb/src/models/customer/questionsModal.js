import React from 'react';

class QuestionsModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            question: {}
        }
    }

    componentDidUpdate(){
        if(this.state.question.questionId!==this.props.question.questionId){
            this.setState({
                question: this.props.question
            })
        }
    }

    render(){
        return(
            <span>{this.state.question.question}</span>
        )
    }

}

export default QuestionsModal;