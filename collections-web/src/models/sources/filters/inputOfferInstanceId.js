import React from 'react';
import { FormGroup, Input } from 'reactstrap'; 
import addQueryParameter from '../../../utilities/url/addQueryParameter';
import getQueryParameter from '../../../utilities/url/getQueryParameter';

class InputOfferInstanceId extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            offerInstanceId: "",
            offerInstanceIdSearch: ""
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
        var queryParameter = getQueryParameter("offerInstanceId");
        if(queryParameter!==undefined&&queryParameter!=null&&queryParameter.length>3){
            if((this.state.offerInstanceId!==queryParameter)&&(this.state.offerInstanceIdSearch!==queryParameter)){
                this.setState({
                    offerInstanceId: queryParameter,
                    offerInstanceIdSearch: queryParameter
                },()=>{
                    this.props.returnValue("offerInstanceId",this.state.offerInstanceId);
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
            this.props.returnValue('offerInstanceId',this.state.offerInstanceId);
            addQueryParameter('offerInstanceId',this.state.offerInstanceId);
        }
    }

    render(){
        return(
            <FormGroup className="margin-top-10">
                <Input 
                    className="input-text-line bg-color-page"
                    type="text" 
                    name="offerInstanceId" 
                    id="offerInstanceId" 
                    value={this.state.offerInstanceId} 
                    onChange={event => this.changeValue(event,"offerInstanceId")} 
                    onKeyDown={this.checkEnter}
                    placeholder="Offer Instance ID"
                />
            </FormGroup>
        )
    }
}

export default InputOfferInstanceId;