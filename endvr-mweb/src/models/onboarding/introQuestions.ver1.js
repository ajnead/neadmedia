import React from 'react';
import Input from '../../components/display/input';

class IntroQuestions extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            dateOfBirth: ''
        }
    }

    render(){
        return(
            <div>
                <Input
                    className={"input-text"}
                    name={"dataOfBirth"}
                    placeholder={"Date of Birth"}
                    onChange={(event)=>{this.onChange(event,"dateOfBirth")}}
                />
            </div>
        )
    }

}

export default IntroQuestions;