import React from 'react';
import { Row, Card, CardFooter, CardTitle, CardSubtitle, CardBody, CardText, CardLink } from 'reactstrap';
import Guid from 'guid';
import Moment from 'react-moment';
import 'moment-timezone';
import Configs from '../../configs/configs';
import AttributeURLs from '../../configs/attributesURLs';
import OptionDisplay from '../../components/cards/optionDisplay';

class ViewAttributeList extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            attributes: [ { } ],
            version: null
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
        var component = this;
        var version = this.state.version;
        var guid = 'cmui-' + Guid.create();
        var url = Configs.collectionApiUrl + AttributeURLs.getAllAttributes + '?viewType=all&version=' + version + '&originTraceId=' + guid; 
        
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
                var attributes = response.payload.attributes;
            
                component.setState({
                    attributes: attributes
                });   
            }

            component.setState({
                metaData : metaData
            });
        });
    }

    open(){
        this.props.open();
    }

    render(){
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
                                <CardText className="float-right">
                                    <small className="text-muted">Last updated <Moment setmilliseconds={r.updateDate} locale="us" tz="America/New_York" /></small>
                                </CardText>  
                            </CardFooter>) :
                            (<CardFooter>
                                <CardLink href={"#editAttribute=false&attributeId=" + r.attributeId } onClick={this.open}>View Attribute</CardLink>
                                <CardText className="float-right">
                                    <small className="text-muted">Last updated <Moment setmilliseconds={r.updateDate} locale="us" tz="America/New_York" /></small>
                                </CardText>  
                            </CardFooter>)
                        )}
                    </Card>
                </Row>
            ))}
            </div>
        )
    }
}

export default ViewAttributeList;