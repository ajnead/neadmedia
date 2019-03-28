import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, CardBody, Card, CardTitle, CardImg, CardFooter, CardLink } from 'reactstrap';
import { FormGroup, Input } from 'reactstrap';
import Moment from 'react-moment'
import 'moment-timezone';
import Configs from '../../../configs/configs';
import RelationshipRoutes from '../../../controllers/relationshipRoutes';
import AttributeRoutes from '../../../controllers/attributeRoutes';
import OptionDisplay from '../../../components/cards/optionDisplay';
import OptionDisplayList from '../../../components/cards/optionDisplayList';
import PreviewJson from '../../../components/pullUp/previewJson';
import PullUp from '../../../components/pullUp/pullUp';
import ArrayHelpers from '../../../utilities/helpers/arrayHelpers';

class GetParent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            parentInstanceId: "",
            parent: { 
                parentChildren: [],
                parentAttributes: []
            },
            selectedImage: "f0777db0ad79baf0e44363be1171ed140c7546e4.jpg",
            currentImage: "f0777db0ad79baf0e44363be1171ed140c7546e4.jpg",
            openPullUp: false,
            attributeNames: null,
            variantAttributes: [],
            nonVariantAttributes: [],
            loadState: "waitingQuery"
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.openPullUp = this.openPullUp.bind(this);
        this.closePullUp = this.closePullUp.bind(this);
        this.loadParent = this.loadParent.bind(this);
        this.indexParent = this.indexParent.bind(this);
    }

    openPullUp(){
        this.setState({
            openPullUp: true
        })
    }

    closePullUp(){
        this.setState({
            openPullUp: false
        })
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode == 13){
            this.loadParent();
        }
    }

    loadAttributeNames(){
        const attributeRoutes = new AttributeRoutes();
        attributeRoutes.getUiAttributeNamesFromCache("public",()=>{
            var response = JSON.parse(attributeRoutes.returnParam);
            var status = response._metadata.status;

            if(status==='success'){
                this.setState({
                    attributeNames: response._payload
                })
            }
        })
    }

    loadParent(){
        this.setState({
            loadState: 'waitingResults'
        })

        if(this.state.attributeNames==null){
            this.loadAttributeNames();
        }

        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getParent(this.state.parentInstanceId,()=>{
            var response = relationshipRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                var payload = response.payload;
                var variantAttributes = [];
                var nonVariantAttributes = [];
                
                const attrNames = this.state.attributeNames
                if(attrNames!==null&&payload.parentAttributes!==null){
                    for(var pa of payload.parentAttributes){
                        pa.attributeName = attrNames[pa.attributeId];
                        if(pa.parentAttributeValues===null){
                            pa.parentAttributeValues = [];
                        }
                    }
                }

                var mainImage = null;
                if(payload.images!=null&&payload.images.length>0){
                    mainImage = payload.images[0].imageHash + "." + payload.images[0].formatType;
                }
                
                for(var pa of payload.parentAttributes){
                    if(pa.isVariantAttribute){
                        for(var pav of pa.parentAttributeValues){
                            pav.skuCount = pav.skuInstanceIds.length;
                        }

                        pa.valuesPerRowAuto = true;
                        if(pa.loadSwatch || pa.loadThumbnail){
                            pa.valuesPerRowAuto = false;
                        }
                        variantAttributes.push(pa);
                    }

                    if(!pa.isVariantAttribute){
                        nonVariantAttributes.push(pa);
                    }
                }

                const arrayHelpers = new ArrayHelpers();
                variantAttributes = arrayHelpers.sortByKey(variantAttributes,"attributeOrder");
                
                const parent = {
                    relationshipInstanceId : payload.relationshipInstanceId,
                    updateDate: payload.updateDate,
                    createDate: payload.createDate,
                    parentInstanceId: payload.parentInstanceId,
                    "note": "data removed for performace"
                }

                this.setState({
                    parent: parent,
                    variantAttributes: variantAttributes,
                    selectedImage: mainImage,
                    loadState: 'success',
                    nonVariantAttributes: nonVariantAttributes
                })
            }else if(status==="not_found"){
                this.setState({
                    loadState: "notFound"
                })
            }else{
                this.setState({
                    loadState: "error"
                })
            }
        });
    }

    indexParent(){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.putParentToIndex(this.state.parentInstanceId);
    }

    render(){
        const DisplayVariants = (props) => {
            const numOfValues = props.values.length;  
            var valuesPerRow = props.valuesPerRow;
            if(props.valuesPerRowAuto){
                if(numOfValues<=6){valuesPerRow=numOfValues;}
                else{valuesPerRow=6;}
            }
            const numOfRows = Math.ceil(numOfValues / valuesPerRow);
            const colGrid = Math.floor(12 / valuesPerRow);

            var variantRowsForDisplay = [];
            for(var r = 0; r < numOfRows; r++){
                var variantsForThisRow = [];
                var min = r * valuesPerRow;
                var max = (min + valuesPerRow);

                if(max>numOfValues){
                    max=numOfValues;
                }
            
                for(var l = min; l < max; l++){
                    variantsForThisRow.push(props.values[l]);
                }

                //load thumbnail vs. swatch needs to be fixed when swatches added
                variantRowsForDisplay.push(
                    <Row key={r} className="margin-top-10">
                        {variantsForThisRow.map((val,i)=>(
                            <Col key={i} xs={colGrid}>
                                <Card className="card-button">
                                    {props.loadSwatch || props.loadThumbnail ? 
                                        (
                                            <CardBody className="card-button-font">
                                                <CardImg top width="100%" src={Configs.imageUrl + val.imageHash + ".150." + val.formatType} alt="No image" />
                                            </CardBody>
                                        ) 
                                        :(
                                            <CardBody className="card-button-font">
                                                {val.attributeValue}
                                            </CardBody>
                                        )
                                    }                                
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )
            }

            return variantRowsForDisplay;
        } 

        const DisplayVariantValuesList = (props) => {
            if(props.loadSwatch){
                return(
                    <Col xs="auto">
                        <CardBody>
                            <CardImg top width="100%" src={Configs.imageUrl + props.imageHash + ".swatch." + props.formatType} alt="No image" />
                        </CardBody>
                    </Col>
                )
            }else if(props.loadThumbnail){
                return(
                    <Col xs="auto">
                        <CardBody>
                            <CardImg top width="100%" src={Configs.imageUrl + props.imageHash + ".150." + props.formatType} alt="No image" />
                        </CardBody>
                    </Col>
                )
            }else{
                return(
                    <Col xs="auto">
                        <Card className="height-100 no-border">
                            <CardBody >
                                <CardTitle className="width-150px text-center" tag="h1">{props.attributeValue}</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                )
            }
        }

        const Display = (props) => {
            return(
                <div>
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Parent Information</h3>
                            <Card>    
                                <CardBody>
                                    <CardTitle tag="h4">Parent Relationship ID: {this.state.parent.parentInstanceId}</CardTitle>
                                    <Row>
                                        <Col><OptionDisplay name={"Relationship Instance ID"} value={this.state.parent.relationshipInstanceId} /></Col>
                                        <Col><OptionDisplay name={"Create Date"} value={<Moment unix tx="America/New_York">{this.state.parent.createDate / 1000}</Moment>} /></Col>
                                        <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{this.state.parent.updateDate / 1000}</Moment>} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Foundation Version"} value={this.state.parent.foundationVersion} /></Col>
                                        <Col><OptionDisplay name={"Foundation ID"} value={this.state.parent.foundationId} /></Col>
                                        <Col></Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <CardLink href="javascript:void(0);" onClick={this.openPullUp}>View Parent JSON</CardLink>
                                    <CardLink href="javascript:void(0);" onClick={this.indexParent}>Re-index Parent</CardLink>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Non Variant Attributes</h3>
                            <Card>    
                                <CardBody>
                                    {this.state.nonVariantAttributes.map((att,i)=>(
                                        <Row key={i}>
                                            <Col xs="3"><OptionDisplay name={"Attribute"} value={att.attributeName + ' [' + att.attributeId + ']'} /></Col>
                                            <Col><OptionDisplay name={"Value"} value={att.parentAttributeValues[0].attributeValue} /></Col>
                                        </Row>
                                    ))}
                                </CardBody>
                            </Card> 
                        </Col>
                    </Row>.
                    <Row className="margin-top-20 padding-bottom-40">
                        <Col>
                            <h3 className="margin-top-0">Images</h3>
                            <Card className="height-100">
                                <CardBody>
                                    <CardImg top width="100%" src={Configs.imageUrl + this.state.selectedImage} alt="No image" />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <h3 className="margin-top-0">Variant Attributes</h3>
                            <Card className="height-100">
                                {this.state.variantAttributes.map((att,i) => (
                                    <CardBody key={i} className="padding-bottom-0">
                                        <CardTitle tag="h5" className="margin-bottom-0">Attribute ID: {att.attributeId} - {att.attributeName}</CardTitle>
                                        <Row className="margin-top-10">
                                            <Col><OptionDisplay name={"Requires Page Reload"} value={JSON.stringify(att.requiresPageReload)} /></Col>
                                            <Col><OptionDisplay name={"Load Swatch"} value={JSON.stringify(att.loadSwatch)} /></Col>    
                                        </Row>
                                        <Row>
                                            <Col><OptionDisplay name={"Is Variant Attribute"} value={JSON.stringify(att.isVariantAttribute)} /></Col>
                                            <Col><OptionDisplay name={"Load Thumbnail"} value={JSON.stringify(att.loadThumbnail)} /></Col>
                                        </Row>
                                        <Row>
                                            <Col><OptionDisplay name={"Attribute Order"} value={JSON.stringify(att.attributeOrder)} /></Col>
                                            <Col><OptionDisplay name={"Variant Count"} value={JSON.stringify(att.parentAttributeValues.length)} /></Col>
                                        </Row>
                                        <Row className="margin-top-10">
                                            <Col>
                                                <DisplayVariants values={att.parentAttributeValues} valuesPerRowAuto={att.valuesPerRowAuto} valuesPerRow={4} loadSwatch={att.loadSwatch} loadThumbnail={att.loadThumbnail} />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                    <div className="margin-top-10">
                    {this.state.variantAttributes.map((att,i) => (
                    <Row key={i} className="margin-top-10">
                        <Col>
                            <h3 className="margin-top-0">Attribute ID: {att.attributeId} - {att.attributeName} - Variant Attribute Values</h3>
                            {att.parentAttributeValues.map((val,v)=>(
                                <Card key={v} className="margin-top-10">
                                    <Row>
                                        <DisplayVariantValuesList loadSwatch={att.loadSwatch} loadThumbnail={att.loadThumbnail} attributeValue={val.attributeValue} imageHash={val.imageHash} formatType={val.formatType}  />
                                        <Col>
                                            <CardBody>
                                                <CardTitle tag="h5" className="margin-bottom-0">Attribute Value: {val.attributeValue}</CardTitle>
                                                <Row className="margin-top-10">
                                                    <Col><OptionDisplay name={"Attribute Unit"} value={val.attributeUnit} /></Col>
                                                    <Col><OptionDisplay name={"Attribute Order"} value={val.attributeOrder} /></Col>
                                                    <Col><OptionDisplay name={"Attribute Value ID"} value={val.attributeValueId} /></Col>
                                                </Row>
                                                <Row>
                                                    <Col><OptionDisplay name={"Image Hash"} value={val.imageHash} /></Col>
                                                    <Col xs="4"><OptionDisplay name={"Format Type"} value={val.formatType} /></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <OptionDisplayList 
                                                            name={"SKU Instance IDs"} 
                                                            values={val.skuInstanceIds} 
                                                            isLink={true} 
                                                            href={"/data/skus/data?skuInstanceId="}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col><OptionDisplay name={"Count of SKUs"} value={val.skuCount} /></Col>
                                                </Row>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </Col>
                    </Row>
                    ))}
                    </div>
                </div>
            )
        }

        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>To start search a Parent Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return(
                       <Display />
                    )
                case 'notFound': 
                    return <div>Parent Relationship type not found</div>
                case 'error': 
                    return <div>An error has occurred</div>
                default:
                    return <div>To start search a Parent Instance ID</div>
            } 
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <FormGroup className="margin-top-10">
                            <Input 
                                className="input-text-line bg-color-page"
                                type="text" 
                                name="parentInstanceId" 
                                id="parentInstanceId" 
                                value={this.state.parentInstanceId} 
                                onChange={event => this.changeValue(event,"parentInstanceId")} 
                                onKeyDown={this.checkEnter}
                                placeholder="Search Parent Instance ID"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
                <PullUp 
                    component={<PreviewJson json={this.state.parent} />} 
                    open={this.state.openPullUp} 
                    close={this.closePullUp}
                    pullUpType={"view"} 
                />
            </Container>
        )
    }
}

export default withRouter(GetParent);