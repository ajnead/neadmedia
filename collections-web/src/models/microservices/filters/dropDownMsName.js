import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import MicroserviceRoutes from '../../../controllers/microserviceRoutes';
import getQueryParameter from '../../../utilities/url/getQueryParameter';
import HasValue from '../../../utilities/helpers/hasValue';

class DropDownMsName extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: true,
            options: [],
            optionsLoaded: false,
            values: []
        }

        this.search = this.search.bind(this);
        this.selected = this.selected.bind(this);
    }
    
    componentDidMount(){
        const filterValue = getQueryParameter("name");
        if(HasValue(filterValue)){
            var values = [];
            values.push(filterValue);
            this.setState({
                values: values
            },()=>{
                this.selected(values);
            })
        }
    }

    search(){
        if(!this.state.optionsLoaded){
            this.setState({  isLoading : true });

            const microserviceRoutes = new MicroserviceRoutes();
            microserviceRoutes.getMicroserviceFilterName(()=>{
                var get = microserviceRoutes.returnParam;
                var status = get.metadata.status;
                
                if(status==="success"){
                    this.setState({
                        isLoading : false, 
                        options: get.payload.microservices,
                        optionsLoaded: true
                    });
                }
            });
        }
    }

    selected(values){
        this.props.dataHandler('name',values);
    }

    render(){
        const filterByFields = ['microserviceName']

        return(
            <AsyncTypeahead
                onChange={(values) => {
                    this.selected(values);
                    this.setState({values});
                }}
                selected={this.state.values}
                minLength={1}
                labelKey="microserviceName"
                onSearch={this.search}
                multiple={this.state.multiple}
                allowNew={this.state.allowNew}
                options={this.state.options}
                filterBy={filterByFields}
                isLoading={this.state.isLoading}
                placeholder="Microservice Name"
                renderMenuItemChildren={(option) => (
                    <div>
                        {option}
                    </div>
                )}
            />
        )
    }
}

export default DropDownMsName;