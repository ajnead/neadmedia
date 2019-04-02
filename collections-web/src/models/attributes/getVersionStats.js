import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardLink } from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import CreateVersion from './createVersion';
import OptionDisplay from '../../components/cards/optionDisplay';
import PopUp from '../../components/display/popup';
import AttributeRoutes from '../../controllers/attributeRoutes';

class GetVersionStats extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            version: null,
            versionStats: {
                
            },
            versionNotes: [],
            loaded: false
        }

        this.createVersion = this.createVersion.bind(this);
        this.closeCreateVersion = this.closeCreateVersion.bind(this);
        this.indexVersion = this.indexVersion.bind(this);
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

    indexVersion(){
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.putAttributeVersion(this.state.version,()=>{})
    }

    load(){
        if(this.state.version!==null&&this.state.version!=="public"){
            const attributeRoutes = new AttributeRoutes();
            attributeRoutes.getAttributeVersion(this.state.version,()=>{
                const response = attributeRoutes.returnParam;
                const status = response.metadata.status;

                if(status==="success"){
                    const versionStats = response.payload;
                    var versionNotes = [];
                    if(versionStats.versionNotes!==null&&versionStats.versionNotes!==undefined){
                        versionNotes = versionStats.versionNotes.split("|");
                    }

                    this.setState({
                        versionStats: versionStats,
                        versionNotes: versionNotes,
                        loaded: true
                    });   
                }
            });
        }
    }

    createVersion(){
        this.refs.createVersion.toggle();
    }

    closeCreateVersion(){
        this.refs.createVersion.toggle();
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
                                <CardLink href={"#versionModal"} onClick={this.createVersion} >Version Workspace</CardLink>
                                <CardLink href={"#indexWorkspace"} onClick={this.indexVersion}>Index Workspace</CardLink>
                                <CardLink href={"#editAttribute=true&attributeId=0"} onClick={()=>this.props.addAttribute()}>Add Attribute</CardLink>
                            </CardFooter>
                        </Card>
                    </Col>
                    <PopUp ref="createVersion" title={'Create New Version'} component={<CreateVersion close={this.closeCreateVersion} />}/>
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
                                    <OptionDisplay name={"Attribute Version ID"} value={this.state.versionStats.attributeVersionId} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Code Safe Name [DB Schema]"} value={this.state.versionStats.codeSafeVersionName} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Backward Compatible"} value={JSON.stringify(this.state.versionStats.isBackwardCompitable)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Deleted"} value={JSON.stringify(this.state.versionStats.isDeleted)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Created By"} value={this.state.versionStats.updatedBy} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Created On"} value={<Moment unix tx="America/New_York">{this.state.versionStats.updateDate / 1000}</Moment>} floatLeft={true} />
                                </div> 
                            </CardBody>
                            <CardBody className="no-padding-top">
                                <CardTitle className="underline">Version Notes</CardTitle>
                                <ul>
                                {this.state.versionNotes.map((vN,i)=>(
                                    <li className="margin-top-10 text-muted" key={i}>{vN}</li>
                                ))}
                                </ul>
                                <CardTitle className="underline">Attribute Stats</CardTitle>
                                <div className="margin-top-5">
                                    <OptionDisplay name={"Attributes"} value={this.state.versionStats.statCountAttribute} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Attribute Values"} value={this.state.versionStats.statCountAttributeValues} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Attribute Synonyms"} value={this.state.versionStats.statCountAttributeSynonyms} verticalBreaks={true} floatLeft={true} />
                                </div> 
                            </CardBody>
                            <CardFooter>
                                <CardLink href={"#indexWorkspace"} onClick={this.indexVersion}>Index Workspace</CardLink>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            )
        }else{
            return <div>Please select a verison</div>
        }
    }
}

export default GetVersionStats;