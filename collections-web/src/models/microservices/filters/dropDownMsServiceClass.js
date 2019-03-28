import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import MicroserviceRoutes from '../../../controllers/microserviceRoutes';

class DropDownMsServiceClass extends React.Component {

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

    search(){
        if(!this.state.optionsLoaded){
            this.setState({  isLoading : true });

            const microserviceRoutes = new MicroserviceRoutes();
            microserviceRoutes.getMicroserviceFilterServiceClass(()=>{
                var get = microserviceRoutes.returnParam;
                var status = get.metadata.status;
                
                if(status==="success"){
                    this.setState({
                        isLoading : false, 
                        options: get.payload.serviceClasses,
                        optionsLoaded: true
                    });
                }
            });
        }
    }

    selected(values){
        this.props.dataHandler("serviceClass",values);
    }

    render(){
        const filterByFields = ['serviceClass']

        return(
            <AsyncTypeahead
                onChange={(values) => {
                    this.selected(values);
                    this.setState({values});
                }}
                selected={this.state.values}
                minLength={1}
                labelKey="serviceClass"
                onSearch={this.search}
                multiple={this.state.multiple}
                allowNew={this.state.allowNew}
                options={this.state.options}
                filterBy={filterByFields}
                isLoading={this.state.isLoading}
                placeholder="Microservice Service Class"
                renderMenuItemChildren={(option) => (
                    <div>
                        {option}
                    </div>
                )}
            />
        )
    }
}

export default DropDownMsServiceClass;