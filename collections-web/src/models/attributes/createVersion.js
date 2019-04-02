import React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import AttributeRoutes from '../../controllers/attributeRoutes';

class CreateVersion extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            versionNote1: null,
        };

        this.create = this.create.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    create(){
        var arr = [];
        arr.push(this.state.versionNote1);

        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.postAttributeVersionNew(arr,()=>{
            const response = attributeRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.props.close();
            }
        })
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    render(){
        return(
            <div>
                <FormGroup>
                    <div className="height-30 padding-top-5"><div className="float-left">Version Notes</div> <a className="float-right alt display-none">Add Another Note</a></div>
                    <Input type="text" name="versionNotes" id="versionNotes" onChange={(event)=>this.changeValue(event,"versionNote1")} />
                </FormGroup>
                <Button className="bg-color-second no-border" block onClick={this.create}>Create New Attribute Version</Button>
            </div>
        )
    }
}

export default CreateVersion;