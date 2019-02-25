import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import Configs from '../../configs/configs';

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
        }
    }

    componentDidUpdate(){
        if(this.state.parentInstanceId!==this.props.parentInstanceId){
            this.setState({
                parentInstanceId: this.props.parentInstanceId,
                parent: this.props.parent,
                imageSrc: this.props.imageSrc
            },()=>{
                console.log(this.state);
                this.loadSku();
            })
        }

        if(this.state.imageSrc!==this.props.imageSrc){
            this.setState({
                imageSrc: this.props.imageSrc
            })
        }
    }

    loadSku(){
        const attributes =  this.state.parent.parentAttributes;
        var brand = '';
        var title = '';
        var description = '';
        for(var attribute of attributes){
            switch(attribute.attributeId){
                case 1: title = attribute.parentAttributeValues[0].attributeValue; break;
                case 4: brand = attribute.parentAttributeValues[0].attributeValue; break;
                case 43: description = attribute.parentAttributeValues[0].attributeValue; break;
            }
        }

        this.setState({
            title: title,
            brand: brand,
            description: description
        })

        //lazy load remainder of content
    }

    render(){
        return(
            <div>
                <Card className="border-0">
                    <CardBody>
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
                        <CardText tag="h5">Colors</CardText>
                        <div class="divider secondary"></div>
                        <CardText className="margin-top-10 font-h7">Load Colors Here</CardText>
                    </CardBody>
                    <CardBody>
                        <CardText tag="h5">Sizes</CardText>
                        <div class="divider secondary"></div>
                        <CardText className="margin-top-10 font-h7">Load Sizes Here</CardText>
                    </CardBody>
                    <CardBody>
                        <CardText tag="h5">Collections</CardText>
                        <div class="divider secondary"></div>
                        <CardText className="margin-top-10 font-h7">Load Collection Pills Here</CardText>
                    </CardBody>
                    <CardBody>
                        <CardText tag="h5">Description</CardText>
                        <div class="divider secondary"></div>
                        <CardText className="margin-top-10 font-h7">{this.state.description}</CardText>
                    </CardBody>
                    <CardBody>
                        <CardText tag="h5">Sellers</CardText>
                        <div class="divider secondary"></div>
                        <CardText className="margin-top-10 font-h7">Load Sellers Here</CardText>
                    </CardBody>
                </Card>
                <div className="sku-add-to-cart">
                    <Button block className="bttn-secondary">Add To Basket</Button>
                </div>
            </div>
        )
    }

}

export default SkuModal;