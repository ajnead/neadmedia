import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class DropDownIdentities extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: false,
            options: []
        }

        this.search = this.search.bind(this);
    }

    search(){
        this.setState({  isLoading : true });

        //api call goes here

        this.setState({
            isLoading : false, 
            options: [
                {
                    identityInstanceId: "idt-4-1",
                    primaryName: "Running Warehouse",
                    identityClassId: "Retailer"
                },
                {
                    identityInstanceId: "idt-3-1",
                    primaryName: "Nike",
                    identityClassId: "Brand"
                },
            ]     
        });
    }

    render(){
        const filterByFields = ['primaryName','identityInstanceId']

        return(
            <AsyncTypeahead
                minLength={1}
                labelKey="primaryName"
                onSearch={this.search}
                multiple={true}
                allowNew={false}
                options={this.state.options}
                filterBy={filterByFields}
                isLoading={this.state.isLoading}
                placeholder="Search a Source Owner Identity"
                renderMenuItemChildren={(option) => (
                    <div>
                        {option.primaryName}
                        <div>
                            <small>Identity Instance ID: {option.identityInstanceId} | Indentity Type: {option.identityClassId} </small>
                        </div>
                    </div>
                )}
            />
        )
    }
}

export default DropDownIdentities;