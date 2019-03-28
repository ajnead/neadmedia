import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class DropDownVersion extends React.Component {

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
                    id: "public",
                    name: "Public",
                },
                {
                    id: "foundation-0.5.0",
                    name: "foundation_000500",
                },
            ]     
        });
    }

    render(){
        const filterByFields = ['name']

        return(
            <AsyncTypeahead
                minLength={1}
                labelKey="name"
                onSearch={this.search}
                multiple={true}
                allowNew={false}
                options={this.state.options}
                filterBy={filterByFields}
                isLoading={this.state.isLoading}
                placeholder="Search a Foundation Version"
                renderMenuItemChildren={(option) => (
                    <div>
                        {option.name}
                    </div>
                )}
            />
        )
    }
}

export default DropDownVersion;