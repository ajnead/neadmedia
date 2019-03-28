import React from 'react';
import { Input, FormGroup } from 'reactstrap';
import addQueryParameter from '../../../utilities/url/addQueryParameter';
import getQueryParameter from '../../../utilities/url/getQueryParameter';

class InputSkuInstanceId extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            skuInstanceId: "",
            skuInstanceIdSearch: "",
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    componentDidMount(){
        this.checkParameter();
    }

    checkParameter(){
        var queryParameter = getQueryParameter("skuInstanceId");
        if(queryParameter!==undefined&&queryParameter!=null&&queryParameter.length>3){
            if((this.state.skuInstanceId!==queryParameter)&&(this.state.skuInstanceIdSearch!==queryParameter)){
                this.setState({
                    skuInstanceId: queryParameter,
                    skuInstanceIdSearch: queryParameter
                },()=>{
                    this.props.returnValue("skuInstanceId",this.state.skuInstanceId);
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
            this.props.returnValue('skuInstanceId',this.state.skuInstanceId);
            addQueryParameter('skuInstanceId',this.state.skuInstanceId);
        }
    }

    render(){
        return(
            <FormGroup className="margin-top-10">
                <Input 
                    className="input-text-line bg-color-page"
                    type="text" 
                    name="skuInstanceId" 
                    id="skuInstanceId" 
                    value={this.state.skuInstanceId} 
                    onChange={event => this.changeValue(event,"skuInstanceId")} 
                    onKeyDown={this.checkEnter}
                    placeholder="SKU Instance ID"
                />
            </FormGroup>
        )
    }
}

export default InputSkuInstanceId;