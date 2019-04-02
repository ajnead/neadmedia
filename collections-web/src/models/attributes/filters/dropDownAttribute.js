import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import AttributeRoutes from '../../../controllers/attributeRoutes'; 

class DropDownAttribute extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: false,
            options: [],
            optionsLoaded: false,
            value: []
        }

        this.search = this.search.bind(this);
    }

    componentDidMount(){

    }

    search(){
        if(!this.state.optionsLoaded){
            this.setState({  isLoading : true });

            const attributeRoutes = new AttributeRoutes();
            attributeRoutes.getUiAttributeNamesFromCache("public",()=>{
                var response = JSON.parse(attributeRoutes.returnParam);
                var status = response._metadata.status;
                
                if(status==='success'){
                    var attrArr = response._payload;
                    var options = []
                    for (var key in attrArr) {
                        if (attrArr.hasOwnProperty(key)) {
                            var obj = {
                                attributeName: attrArr[key],
                                attributeId: key
                            }
                            options.push(obj);
                        }
                    }

                    this.setState({
                        isLoading : false, 
                        options: options,
                        optionsLoaded: true
                    });
                }
            })
        }
    }

    selected(value){
        const attributeId = value[0].attributeId;
        this.props.changeValue("attributeId",attributeId);
    }

    render(){
        const filterByFields = ['attributeId','attributeName']

        return(
            <FormGroup>
            <Label for={"Attribute"} className={"bold"}>{"Attribute"}</Label>
                <AsyncTypeahead
                    onChange={(value) => {
                        this.selected(value);
                        this.setState({value})
                    }}
                    selected={this.state.value}
                    minLength={1}
                    labelKey="attributeName"
                    bg-color-white
                    onSearch={this.search}
                    multiple={false}
                    allowNew={false}
                    options={this.state.options}
                    filterBy={filterByFields}
                    isLoading={this.state.isLoading}
                    placeholder={this.props.placeholder}
                    renderMenuItemChildren={(option) => (
                        <div>
                            {option.attributeName}
                            <div>
                                <small className="text-muted">Attribute ID: {option.attributeId}</small>
                            </div>
                        </div>
                    )}
                />
            </FormGroup>
        )
    }
}

export default DropDownAttribute;