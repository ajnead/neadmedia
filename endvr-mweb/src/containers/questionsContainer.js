import React from 'react';
import Modal from '../components/display/modal';

class QuestionsContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        this.refs.questionsModal.open();
        //get open questions
    }

    render(){
        return(
            <div>
                <Modal ref="questionsModal" />
            </div>
        )
    }
}

export default QuestionsContainer;