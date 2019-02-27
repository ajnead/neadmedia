import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import Configs from '../../configs/configs';
import Pill from '../../components/display/pill';
import SelectVariant from '../parent/components/selectVariant';

class SkuModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            parentInstanceId: '',
            skuInstanceId: '',
            parent: {

            },
            imageSrc: '',
            title: '',
            description: '',
            brand: '',
            variants: [],
            preferences: []
        }

        this.changeSku = this.changeSku.bind(this);
    }

    componentDidUpdate(){
        if(this.state.parentInstanceId!==this.props.parentInstanceId){
            this.setState({
                parentInstanceId: this.props.parentInstanceId,
                parent: this.props.parent
            },()=>{
                this.loadSku();
            })
        }
    }

    componentWillReceiveProps(nextProps){
        const imageFeed = nextProps.imageHash + '.feed.jpg';
        if(nextProps.imageHash!==this.props.imageHash){
            this.setState({
                parentInstanceId: nextProps.parentInstanceId,
                parent: nextProps.parent,
                imageSrc: imageFeed,
                imageHash: nextProps.imageHash
            },()=>{
                this.loadSku();
            })
        }
    }

    loadSku(){
        const attributes =  this.state.parent.parentAttributes;
        var brand = '';
        var title = '';
        var description = '';
        var variants = [];

        //get the attribute data for display
        for(var attribute of attributes){
            switch(attribute.attributeId){
                case 1: title = attribute.parentAttributeValues[0].attributeValue; break;
                case 4: brand = attribute.parentAttributeValues[0].attributeValue; break;
                case 43: description = attribute.parentAttributeValues[0].attributeValue; break;
            }

            if(attribute.isVariantAttribute){
                //TODO: need to look up attribute names from attribute model
                //TODO: expose public attribute api with names for endvr
                switch(attribute.attributeId){
                    case 11: attribute.attributeName='Size'; break;
                    case 12: attribute.attributeName='Color'; break;
                }
                variants.push(attribute);
            }
        }

        //TODO: need to be able to select the clicked/store preferences and pass to variant components
        //organize the preferences
        var preferences = [{
            attributeId: 12,
            attributeValue: null,
            imageHash: this.state.imageHash
        }]

        this.setState({
            title: title,
            brand: brand,
            description: description,
            variants: variants,
            preferences: preferences
        })

        //TODO: lazy load remainder of content from SKU / collections 
        //TODO: need to have loader icons/text/imagery during lazy load
    }

    //TODO: this is being used by the variant to change just the image, this will need to reload the sku
    //TODO: how will this work with the this.loadSku()
    changeSku(skuInstanceId,imageHash,formatType){
        if(imageHash!==null){
            const imageFeed = imageHash + '.feed.' + formatType;
            this.setState({
                imageSrc: imageFeed,
                imageHash: this.props.imageHash
            },()=>{
                console.log(this.state);
            })
        }
    }

    render(){
        return(
            <div>
                <div className="sku-modal-view">
                    <Card className="border-0">
                        <CardBody className="padding-top-0">
                            <Row>
                                <div className="parent-card-brand">
                                    <div className={"parent-card-brand-logo nike-logo"}></div>
                                </div>
                                <Col className="padding-left-10">
                                    <CardTitle className="font-weight-600 margin-bottom-0">{this.state.title}</CardTitle>
                                    <CardText className="font-h8">Available from Nike.com and 2 others</CardText>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardImg src={Configs.collectionsImagesUrl + this.state.imageSrc}></CardImg>
                        <CardBody>
                            <CardText tag="h5">Collections</CardText>
                            <div className="divider secondary"></div>
                            <div className="margin-top-10">
                                <Pill text={'Top Running Shoes'} isLink={true} to={'/discover?collectionInstanceId=col-1-1'}></Pill>
                                <Pill text={'Nike Top 100'} isLink={true} to={'/discover?collectionInstanceId=col-2-1'} ></Pill>
                                <Pill text={'Top 1000 Shoes'} isLink={true} to={'/discover?collectionInstanceId=col-4-1'} ></Pill>
                                <Pill text={'My Favorites'} isLink={true} to={'/discover?collectionInstanceId=col-3-1'} isSecondary={true}></Pill>
                            </div>
                        </CardBody>
                        {this.state.variants.map((variant,i)=>(
                            <SelectVariant 
                                key={i} 
                                variant={variant} 
                                attributeId={variant.attributeId} 
                                preferences={this.state.preferences}
                                onVariantChange={this.changeSku} />
                        ))}
                        <CardBody>
                            <CardText tag="h5">Description</CardText>
                            <div className="divider secondary"></div>
                            <CardText className="margin-top-10 font-h7">{this.state.description}</CardText>
                        </CardBody>
                        <CardBody>
                            <CardText tag="h5">Sellers</CardText>
                            <div className="divider secondary"></div>
                            <CardText className="margin-top-10 font-h7">Load Sellers Here</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="sku-modal-add-bttn">
                    <Button block className="bttn-secondary">Add To Basket</Button>
                </div>
            </div>
        )
    }

}

export default SkuModal;