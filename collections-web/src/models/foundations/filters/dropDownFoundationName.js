import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class DropDownFoundationName extends React.Component {

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
                    foundationId: "1",
                    foundationName: "Footware",
                    level: "1",
                },
                {
                    foundationId: "2",
                    foundationName: "Running",
                    level: "2"
                },
            ]     
        });
    }

    render(){
        const filterByFields = ['foundationId','foundationName','level']

        return(
            <AsyncTypeahead
                minLength={1}
                labelKey="foundationName"
                onSearch={this.search}
                multiple={true}
                allowNew={false}
                options={this.state.options}
                filterBy={filterByFields}
                isLoading={this.state.isLoading}
                placeholder="Search a Foundation"
                renderMenuItemChildren={(option) => (
                    <div>
                        {option.foundationName}
                        <div>
                            <small>Foundation ID: {option.foundationId} | Level: {option.level} </small>
                        </div>
                    </div>
                )}
            />
        )
    }
}

export default DropDownFoundationName;