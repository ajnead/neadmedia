import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class DropDownBrandName extends React.Component {

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
                    brandId: "1",
                    brandName: "Nike",
                },
                {
                    brandId: "2",
                    brandName: "Addidas",
                },
            ]     
        });
    }

    render(){
        const filterByFields = ['brandId','brandName']

        return(
            <AsyncTypeahead
                minLength={1}
                labelKey="brandName"
                onSearch={this.search}
                multiple={true}
                allowNew={false}
                options={this.state.options}
                filterBy={filterByFields}
                isLoading={this.state.isLoading}
                placeholder="Search a Brand"
                renderMenuItemChildren={(option) => (
                    <div>
                        {option.brandName}
                        <div>
                            <small>Brand ID: {option.brandId}</small>
                        </div>
                    </div>
                )}
            />
        )
    }
}

export default DropDownBrandName;