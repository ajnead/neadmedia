import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardLink } from 'reactstrap';
import Guid from 'guid';
import Configs from '../../configs/configs';
import CreateVersion from './createVersion';
import IndexVersion from './indexVersion';

class GetVersionStats extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            version: null,
            versionStats: {
                
            },
            versionNotes: [],
            loaded: false,
            versionModal: false,
            indexModal: false
        }

        this.toggleIndexModal = this.toggleIndexModal.bind(this);
        this.toggleVersionModal = this.toggleVersionModal.bind(this);
    }

    componentDidUpdate(){
        var version = this.props.version;
        if(version!==this.state.version){
            this.setState({
                version: this.props.version
            },()=>{
                this.load();
            })
        }
    }

    toggleIndexModal(){
        this.setState({
            indexModal: !this.state.indexModal
        });
    }

    toggleVersionModal(){
        this.setState({
            versionModal: !this.state.versionModal
        });
    }

    load(){
        var component = this;
        var version = this.state.version;
        var guid = 'cmui-' + Guid.create();
        var url = Configs.collectionApiUrl + '/attribute/version/' + version + '/read?viewType=all&originTraceId=' + guid; 
        
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
                var versionStats = response.payload;
                var versionNotes = versionStats.versionNotes.split("|");

                component.setState({
                    versionStats: versionStats,
                    versionNotes: versionNotes
                });   
            }

            component.setState({
                metaData : metaData,
                loaded: true
            });
        });
    }

    render(){
        if(this.state.version==="public"){
            return(
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h3">Public Workspace</CardTitle>
                                <CardSubtitle className="margin-top-10">This is the workspace for making changes to the attribute model before any changes are versioned.  A new version can be created at any time.</CardSubtitle>
                            </CardBody>
                            <CardFooter>
                                <CardLink href={"#versionModal"} onClick={this.toggleVersionModal} >Version Workspace</CardLink>
                                <CardLink href={"#indexWorkspace"} onClick={this.toggleIndexModal}>Index Workspace</CardLink>
                                <CardLink href={"#editAttribute=true&attributeId=0"} onClick={()=>this.props.addAttribute()}>Add Attribute</CardLink>
                            </CardFooter>
                        </Card>
                    </Col>
                    <CreateVersion open={this.state.versionModal} onClose={this.toggleVersionModal} />
                    <IndexVersion open={this.state.indexModal} onClose={this.toggleIndexModal} />
                </Row>
            )
        }
        else if(this.state.loaded){
            return(
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h3">{this.state.version}</CardTitle>
                                <CardSubtitle className="margin-top-10">This is version {this.state.version} of the attribute model.  No changes can be made to a version of the attribute model.  All changes must be made in the public workspace.</CardSubtitle>
                                <div className="margin-top-10">
                                    <div className="vertical-breaks float-left"><b>Attribute Version ID</b>: {this.state.versionStats.attributeVersionId}</div>
                                    <div className="vertical-breaks float-left"><b>Code Safe Name [DB Schema]</b>: {this.state.versionStats.codeSafeVersionName}</div>
                                    <div className="vertical-breaks float-left"><b>Is Backward Compatible</b>: {JSON.stringify(this.state.versionStats.isBackwardCompitable)}</div>
                                    <div className="vertical-breaks float-left"><b>Is Deleted</b>: {JSON.stringify(this.state.versionStats.isDeleted)}</div>
                                    <div className="vertical-breaks float-left"><b>Created By</b>: {this.state.versionStats.updatedBy}</div>
                                    <div className="float-left"><b>Created On</b>: {this.state.versionStats.updateDate}</div>
                                </div> 
                            </CardBody>
                            <CardBody className="no-padding-top">
                                <CardTitle className="underline">Version Notes</CardTitle>
                                {this.state.versionNotes.map((vN,i)=>(
                                    <CardSubtitle className="margin-top-10" key={i}>{i+1}. {vN}</CardSubtitle>
                                ))}
                            </CardBody>
                            <CardBody className="no-padding-top">
                                <CardTitle className="underline">Attribute Stats</CardTitle>
                                <div className="margin-top-5">
                                    <div className="vertical-breaks float-left"><b>Attributes</b>: {this.state.versionStats.statCountAttribute}</div>
                                    <div className="vertical-breaks float-left"><b>Attribute Values</b>: {this.state.versionStats.statCountAttributeValues}</div>
                                    <div className="float-left"><b>Attribute Synonyms</b>: {this.state.versionStats.statCountAttributeSynonyms}</div>
                                </div> 
                            </CardBody>
                            <CardFooter>
                                <CardLink href={"#indexWorkspace"} onClick={this.toggleIndexModal}>Index Workspace</CardLink>
                            </CardFooter>
                        </Card>
                    </Col>
                    <IndexVersion open={this.state.indexModal} onClose={this.toggleIndexModal} />
                </Row>
            )
        }else{
            return <div>Please select a verison</div>
        }
    }
}

export default GetVersionStats;