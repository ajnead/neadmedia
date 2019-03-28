import React from 'react';
import { FormGroup, Input } from 'reactstrap'; 
import addQueryParameter from '../../../utilities/url/addQueryParameter';
import getQueryParameter from '../../../utilities/url/getQueryParameter';

class InputSourceInstanceId extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sourceInstanceId: "",
            sourceInstanceIdSearch: ""
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.checkParameter = this.checkParameter.bind(this);
    }

    componentDidMount(){
        this.checkParameter();
    }

    componentDidUpdate(){
        this.checkParameter();
    }

    checkParameter(){
        var queryParameter = getQueryParameter("sourceInstanceId");
        if(queryParameter!==undefined&&queryParameter!=null&&queryParameter.length>3){
            if((this.state.sourceInstanceId!==queryParameter)&&(this.state.sourceInstanceIdSearch!==queryParameter)){
                this.setState({
                    sourceInstanceId: queryParameter,
                    sourceInstanceIdSearch: queryParameter
                },()=>{
                    this.props.returnValue("sourceInstanceId",this.state.sourceInstanceId);
                })
            }
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode===13){
            this.props.returnValue('sourceInstanceId',this.state.sourceInstanceId);
            addQueryParameter('sourceInstanceId',this.state.sourceInstanceId);
        }
    }

    render(){
        return(
            <FormGroup className="margin-top-10">
                <Input 
                    className="input-text-line bg-color-page"
                    type="text" 
                    name="sourceInstanceId" 
                    id="sourceInstanceId" 
                    value={this.state.sourceInstanceId} 
                    onChange={event => this.changeValue(event,"sourceInstanceId")} 
                    onKeyDown={this.checkEnter}
                    placeholder="Source Instance ID"
                />
            </FormGroup>
        )
    }
}

export default InputSourceInstanceId;