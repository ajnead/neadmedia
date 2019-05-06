import React from 'react';
import {CardBody, CardTitle, FormGroup, Form, Label, Input} from 'reactstrap';
import AttributeRoutes from '../../controllers/attributeRoutes';

class EditSynonym extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            attributeSynonyms : [{}],
            attributeId: null,
            attributeValueId: null,
            addSynonymValue: ""
        }

        this.addSynonym = this.addSynonym.bind(this);
        this.deleteSynonym = this.deleteSynonym.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            attributeSynonyms: props.attributeSynonyms,
            attributeId: props.attributeId,
            attributeValueId: props.attributeValueId
        }
    }

    updateAddSynonymValue(event){
        this.setState({
            addSynonymValue : event.target.value
        })
    }

    addSynonym(){
        var addSynonymJson = {
            attributeId: this.state.attributeId,
            synonym: this.state.addSynonymValue,
            unit: "[none]",
            attributeValueId: this.state.attributeValueId
        }

        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.postAttributeSynonym(addSynonymJson,()=>{
            var response = attributeRoutes.returnParam;
            var status = response.metadata.status;
            
            if(status==="success"){
                var attributeSynonymId = response.payload.attributeSynonymId;
                addSynonymJson.attributeSynonymId = attributeSynonymId;

                var array = this.state.attributeSynonyms;
                array.push(addSynonymJson);
                this.setState({
                    attributeSynonyms : array,
                    addSynonymValue: ""
                })
            }
        });
    }

    deleteSynonym(attributeSynonymId){
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.deleteAttributeSynonym(attributeSynonymId,()=>{
            var response = attributeRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                if(response.payload.isSuccess){
                    var arr = this.state.attributeSynonyms;
                    for(var i=0;i<arr.length;i++){
                        var obj = arr[i];
                        if(obj.attributeSynonymId==attributeSynonymId){
                            arr.splice(i,1);

                            this.setState({
                                attributeSynonyms: arr
                            })
                        }
                    }
                }
            }
        });
    }

    render(){
        return(
            <CardBody className="no-padding-top no-padding-bottom">
                <div className="margin-top-5 width-100">
                    <CardTitle tag="h5" className="underline">Synonyms</CardTitle>
                    <Form>
                    {this.state.attributeSynonyms.map((s ,si) => (
                        <FormGroup key={si} check className="float-left vertical-breaks padding-left-0 margin-bottom-10">
                            <Label check>
                                <div className="float-left trash-can-20-20 margin-right-5">
                                    <div className="icon-trash-can" id={"attributeSynonymId_" + s.attributeSynonymId} onClick={() => this.deleteSynonym(s.attributeSynonymId)}></div>
                                </div>
                                <b>Synonym</b>: {s.synonym} | <b>Synonym Unit</b>: {s.unit}
                            </Label>
                        </FormGroup>
                    ))}
                    </Form>
                    <Form inline className="add-synonym margin-bottom-10">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input className="input-text-line" type="text" placeholder="Add new synonym" onChange={event => this.updateAddSynonymValue(event)} value={this.state.addSynonymValue} />
                        </FormGroup>
                        <div className = "add-bttn-30-30">
                            <div className="icon-add" onClick={this.addSynonym}></div>
                        </div>
                    </Form>
                </div>
            </CardBody>
        )
    }
}

export default EditSynonym;