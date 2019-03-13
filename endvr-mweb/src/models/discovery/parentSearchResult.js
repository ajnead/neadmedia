import React from 'react';
import { Card, CardBody, CardText, CardImg } from 'reactstrap';
import Configs from '../../configs/configs';
import RelationshipRoutes from '../../routes/relationshipRoutes';

class ParentSearchResult extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            images: [],
            image: '',
            parentInstanceId: '',
            title: '',
            description: '', 
            brand:  '',
        }
    }

    componentDidMount(){
        this.setState({
            parentInstanceId: this.props.parentInstanceId
        },()=>{
            this.loadParent();
        })
    }

    componentDidUpdate(){
        if(this.state.parentInstanceId!==this.props.parentInstanceId){
            this.setState({
                parentInstanceId: this.props.parentInstanceId
            },()=>{
                this.loadParent();
            })
        }
    }

    loadParent(){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getParent(this.state.parentInstanceId,()=>{
            const response = relationshipRoutes.returnParam;
            const status = response.metadata.status;
            var title = '';
            var description = '';
            var brand = ''

            var images = [];
            for(var image of response.payload.images){
                const imageObj = {
                    src: image.imageHash + ".feed." + image.formatType,
                    thumbnail: image.imageHash + ".150." + image.formatType,
                    hash: image.imageHash,
                    main: image.imageHash + "." + image.formatType,
                }

                images.push(imageObj);
            }

            for(var attribute of response.payload.parentAttributes){
                switch(attribute.attributeId){
                    case 1: title = attribute.parentAttributeValues[0].attributeValue; break;
                    case 4: brand = attribute.parentAttributeValues[0].attributeValue; break;
                    case 43: description = attribute.parentAttributeValues[0].attributeValue; break;
                }
            }

            var image = images[0].main;

            if(status==="success"){
                this.setState({
                    images: images,
                    image: image,
                    title: title,
                    brand: brand,
                    description: description
                })
            }
        })
    }

    render(){
        return(
            <Card className="height-100">
                <CardBody>
                    <CardImg src={Configs.collectionsImagesUrl + this.state.image} />
                    <CardText className="font-h10 text-muted padding-0 margin-0">Nike</CardText>
                    <CardText className="font-h9 padding-0 margin-0">{this.state.title}</CardText>
                </CardBody>
            </Card>
            
        )
    }
}

export default ParentSearchResult;