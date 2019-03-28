import React from 'react';
import Configs from '../../../configs/configs';
import originTracer from '../../../utilities/api/originTracer';
import DropDownNoLabel from '../../../components/inputs/dropDownNoLabel';
import DropDown from '../../../components/inputs/dropDown';

class CrawlerMappingNames extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            crawlerMappingOptions: [],
            crawlerMethod: null,
            hasLabel: false
        }

        this.changeValue = this.changeValue.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            crawlerMethod: props.crawlerMethod,
            hasLabel: props.hasLabel
        }
    }

    componentDidMount(){
        this.getCrawlerMappingOptions();
    }

    componentDidUpdate(props){
        if(this.state.crawlerMethod!==props.crawlerMethod){
            this.getCrawlerMappingOptions();
        }
    }

    changeValue(event){
        this.props.changeValue(event.target.value);
    }

    getCrawlerMappingOptions(){
        fetch(Configs.collectionApiUrl + '/crawler/mapping/crawlerMethod/' + this.state.crawlerMethod + '/read?viewType=public&' + originTracer(), {
            method: 'GET',
            headers: {
                'Authorization': 'private' 
            }
        })
        .then(response => response.json())
        .then(response => {
            var metaData = response.metadata;
            var status = metaData.status;

            if(status==="success"){
                var mappingsArr = response.payload.mappings;

                var mappingsOptionsArr = [];
                for(var m=0; m<mappingsArr.length; m++){
                    var mappingObj = mappingsArr[m];
                    var mappingOptionObj = {
                        id: mappingObj.crawlerMappingId,
                        value: mappingObj.crawlerMappingName
                    }
                    mappingsOptionsArr.push(mappingOptionObj);

                    if(m===0){
                        this.props.changeValue(mappingOptionObj.id);
                    }
                }

                this.setState({
                    crawlerMappingOptions: mappingsOptionsArr
                })   
            }
        });
    }

    render(){
        if(this.state.hasLabel){
            return(
                <DropDown
                    title="Crawler Mapping" 
                    name="crawlerMappingId" 
                    value={this.state.crawlerMappingId} 
                    options={this.state.crawlerMappingOptions} 
                    onChange={event => this.changeValue(event)}
                />
            )
        }else{
            return(
                <DropDownNoLabel 
                    name="crawlerMappingId" 
                    value={this.state.crawlerMappingId} 
                    options={this.state.crawlerMappingOptions} 
                    onChange={event => this.changeValue(event)}
                />
            )
        }
    }
}

export default CrawlerMappingNames;