import React from 'react';
import {Row, Col, FormGroup, Label, Input} from 'reactstrap';
import originTracer from '../../utilities/api/originTracer';
import Configs from '../../configs/configs';
import AttributeURLs from '../../configs/attributesURLs';

class GetVersions extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            versions: [{
                versionName: "public",
                attributeVersionId: 0
            }],
            versionDefault: "public"
        }

        this.selectVersion = this.selectVersion.bind(this);
    }

    selectVersion(event){
        var version = event.target.value;
        this.setState({
            versionDefault: version
        })
        this.props.setVersion(version);
    }

    componentDidMount(){
        this.props.setVersion(this.state.versionDefault);
        var url = Configs.collectionApiUrl + AttributeURLs.getAllVersions + '?viewType=public&' + originTracer(); 
        fetch(url, {
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
                var versionsState = this.state.versions;
                var versionsResponse = response.payload.attributeVersions;
                for(var v=0; v<versionsResponse.length; v++){
                    versionsState.push(versionsResponse[v]);
                }

                this.setState({
                    versions: versionsState    
                });   
            }
        });
    }

    render(){
        return(
            <Row className="margin-top-10">
                <Col>
                    <FormGroup>
                        <Label for="attributeVersion">Attribute Version</Label>
                        <Input type="select" name="attributeVersion" id="attributeVersion" value={this.state.versionDefault} onChange={event => this.selectVersion(event)}>
                            {this.state.versions.map((r, i) => ( 
                                <option value={r.versionName} key={i}>{r.versionName}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col></Col>
            </Row>
        )
    }
}

export default GetVersions;