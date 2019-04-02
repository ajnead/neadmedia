import React from 'react';
import { Row, Card, CardFooter, CardTitle, CardSubtitle, CardBody, CardText, CardLink } from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import AttributeRoutes from '../../controllers/attributeRoutes';
import OptionDisplay from '../../components/cards/optionDisplay';

class ViewAttributeList extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            attributes: [ { } ],
            version: null,
            loadState: "waiting"
        }
        
        this.open = this.open.bind(this);
    }

    componentDidUpdate(){
        var version = this.props.version;
        if(version!==this.state.version){
            this.setState({
                version: version
            },() =>{
                this.load();
            });
        }
    }

    load(){
        this.setState({loadState: "waiting"});
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.getAllAttributes(this.state.version,()=>{
            var response = attributeRoutes.returnParam;
            var status = response.metadata.status;
            
            if(status==="success"){
                var attributes = response.payload.attributes;
            
                this.setState({
                    attributes: attributes,
                    loadState: "done"
                });   
            }else{
                this.setState({loadState: "error"});
            }
        })
    }

    open(){
        this.props.open();
    }

    render(){
        if(this.state.loadState==="done"){
            return(
                <div>
                {this.state.attributes.map((r, i) => ( 
                    <Row key={i} noGutters className="list-row">
                        <Card style={{ width: '100%' }} className="no-border">
                            <CardBody>
                                <CardTitle tag="h3">{r.attributeName} [{r.attributeJsonName}]</CardTitle>
                                <CardSubtitle>{r.attributeDescription}</CardSubtitle>
                                <div className="margin-top-5">
                                    <OptionDisplay name={"Attribute ID"} value={r.attributeId} verticalBreaks={true} floatLeft={true} />
                                    {r.attributeVersion==null ?
                                        <OptionDisplay name={"Version Name"} value={"Public Workspace"} verticalBreaks={true} floatLeft={true} />
                                        :<OptionDisplay name={"Version Name"} value={r.attributeVersion} verticalBreaks={true} floatLeft={true} />
                                    }
                                    <OptionDisplay name={"Attribute Family"} value={r.attributeFamily} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Attribute Sub Family"} value={r.attributeSubFamily} verticalBreaks={false} floatLeft={true} />
                                </div> 
                            </CardBody>
                            <CardBody className="no-padding-top">
                                <CardTitle className="underline">{r.attributeName} Definitions</CardTitle>
                                <div>
                                    <OptionDisplay name={"Min Length"} value={r.minLength} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Max Length"} value={r.maxLength} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Descriptor"} value={JSON.stringify(r.isDescriptor)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Required"} value={JSON.stringify(r.isRequired)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Display"} value={JSON.stringify(r.isDisplay)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Grouping"} value={JSON.stringify(r.isGrouping)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Filter"} value={JSON.stringify(r.isFilter)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Enumerated"} value={JSON.stringify(r.isEnumerated)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Allows Free Text"} value={JSON.stringify(r.allowsFreeText)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Allow Multiple Value"} value={JSON.stringify(r.allowsMultipleValues)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Ordered"} value={JSON.stringify(r.isOrdered)} verticalBreaks={true} floatLeft={true} />
                                    <OptionDisplay name={"Is Derived"} value={JSON.stringify(r.isDerived)} verticalBreaks={false} floatLeft={true} />
                                </div>
                            </CardBody>
                            {(r.attributeVersion == null ?
                                (<CardFooter>
                                    <CardLink href={"#editAttribute=true&attributeId=" + r.attributeId } onClick={this.open}>Edit Attribute</CardLink>
                                    <CardLink href={"#editAttribute=true&attributeId=" + r.attributeId } onClick={()=>this.props.openAttributeHistory(r.attributeId,r.attributeName)}>View Attribute History</CardLink>
                                    <CardText className="float-right padding-right-5">
                                        <small className="text-muted">Last updated: <Moment unix tx="America/New_York">{r.updateDate / 1000}</Moment></small>
                                    </CardText>  
                                </CardFooter>) :
                                (<CardFooter>
                                    <CardLink href={"#editAttribute=false&attributeId=" + r.attributeId } onClick={this.open}>View Attribute</CardLink>
                                    <CardText className="float-right padding-right-5">
                                        <small className="text-muted">Last updated: <Moment unix tx="America/New_York">{r.updateDate / 1000}</Moment></small>
                                    </CardText>  
                                </CardFooter>)
                            )}
                        </Card>
                    </Row>
                ))}
                </div>
            )
        }else if(this.state.loadState==="error"){
            return <div>An error occurred, please check the Trace ID to learn more</div>
        }else{
            return <div>Loading...</div>
        }
    }
}

export default ViewAttributeList;