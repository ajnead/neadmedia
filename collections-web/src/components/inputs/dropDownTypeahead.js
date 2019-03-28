import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class DropDownTypeahead extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: false,
            options: [],
            filterByFields: ['firstName']
        }
    }

    render(){
        const filterByFields = this.props.filterByFields;

        return(
            <AsyncTypeahead
                labelKey="login"
                minLength={1}
                labelKey="firstName"
                onSearch={this.identitySearch}
                multiple={true}
                options={this.state.identitySearch.options}
                filterBy={filterByFields}
                isLoading={this.state.identitySearch.isLoading}
                placeholder="Search for Brand, Retailer, or Reseller"
                renderMenuItemChildren={(option, props) => (
                    <div>
                        {option.firstName}
                        <div>
                            <small>IdentityInstanceId: {option.identityInstanceId}</small>
                        </div>
                    </div>
                )}
            />
        )
    }
}