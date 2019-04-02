import React from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import AttributeRoutes from '../../controllers/attributeRoutes'; 

class GetVersions extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            versions: [{
                versionName: "public",
                codeSafeVersionName: "public",
                attributeVersionId: 0
            }],
            value:[{
                versionName: "public",
                codeSafeVersionName: "public",
                attributeVersionId: 0
            }],
            versionName: "public",
            isLoading: false,
            optionsLoaded: false,
            value: []
        }
        this.search = this.search.bind(this);
    }

    selected(value){
        var versionName = "public";
        if(value!==null&&value!==undefined&&value.length>0){
            versionName = value[0].versionName;            
        }

        this.setState({ versionName: versionName });
        this.props.setVersion(versionName);
    }

    componentDidMount(){
        this.props.setVersion(this.state.versionName);
        this.search();
    }

    search(){
        if(!this.state.optionsLoaded){
            const attributeRoutes = new AttributeRoutes();
            attributeRoutes.getAttributeVersions(()=>{
                var response = attributeRoutes.returnParam;
                var status = response.metadata.status;

                if(status==="success"){
                    var versionsState = this.state.versions;
                    var versionsResponse = response.payload.attributeVersions;
                    for(var v=0; v<versionsResponse.length; v++){
                        versionsState.push(versionsResponse[v]);
                    }

                    this.setState({
                        optionsLoaded: true,
                        versions: versionsState    
                    });   
                }
            });
        }
    }

    render(){
        const filterByFields = ['versionName','codeSafeVersionName']

        return(
            <Row className="margin-top-10">
                <Col xs="6">
                    <FormGroup>
                        <Typeahead
                            onChange={(value) => {
                                this.setState({value})
                                this.selected(value);
                            }}
                            selected={this.state.value}
                            dropDown={true}
                            labelKey="versionName"
                            bg-color-white
                            onSearch={this.search}
                            multiple={false}
                            allowNew={false}
                            options={this.state.versions}
                            filterBy={filterByFields}
                            isLoading={this.state.isLoading}
                            placeholder={"Select attribute version"}
                            renderMenuItemChildren={(option) => (
                                <div>
                                    {option.versionName}
                                    <div>
                                        <small className="text-muted">Code Safe Name: {option.codeSafeVersionName}</small>
                                    </div>
                                </div>
                            )}
                        />
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

export default GetVersions;