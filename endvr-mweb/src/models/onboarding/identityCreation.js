import React from 'react';
import Input from '../../components/display/input';
import IdentityRoutes from '../../routes/identityRoutes';

class IdentityCreation extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: ''
        }
    }

    onChange(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    submit(){
        var json = {
            primaryName: this.state.firstName,
            secondaryName: this.state.lastName,
            primaryEmail: this.state.emailAddress
        }

        const identityRoutes = new IdentityRoutes();
        identityRoutes.createIdentity(json,()=>{
            const response = identityRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                console.log("Account Created");
            }
        })
    }

    render(){
        return(
            <div>
                <Input
                    className={"input-text"}
                    name={"firstName"}
                    placeholder={"First Name"}
                    onChange={(event)=>{this.onChange(event,"firstName")}}
                />
                <Input
                    className={"input-text"}
                    name={"lastName"}
                    placeholder={"Last Name"}
                    onChange={(event)=>{this.onChange(event,"lastName")}}
                />
                <Input
                    className={"input-text"}
                    name={"emailAddress"}
                    placeholder={"Email Address"}
                    onChange={(event)=>{this.onChange(event,"emailAddress")}}
                />
                <Input
                    className={"input-text"}
                    name={"Password"}
                    placeholder={"Password"}
                    type={"password"}
                    onChange={(event)=>{this.onChange(event,"password")}}
                />
            </div>
        )
    }
}

export default IdentityCreation;