import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Carousel, CarouselIndicators, CarouselControl, CarouselItem, CardImg } from 'reactstrap';
import Configs from '../../configs/configs';
import RelationshipRoutes from '../../routes/relationshipRoutes';
import ImageSlider from '../../components/images/imageSlider';
import Modal from '../../components/display/modal';
import SkuModal from '../parent/skuModal';

class ParentCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0,
            images: [
                { src: '81b0ef55d92527af53b4c52989b6ecacd07f5347.feed.jpg', thumbnail: '81b0ef55d92527af53b4c52989b6ecacd07f5347.150.jpg' }
            ],
            parentInstanceId: '',
            parent: {
                
            },
            title: '',
            description: '', 
            brand:  '',
            skuComponent: <SkuModal parent={{}} parentInstanceId={''} />
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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

    toggleModal(imageSrc){
        this.setState({
            imageSrc: imageSrc
        },()=>{
            this.updateSkuComponent();
            this.refs.skuModal.open();
        })
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
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

            if(description.indexOf('.')>0){
                description = description.substring(0,description.indexOf('.'));
            }

            if(status==="success"){
                this.setState({
                    images: images,
                    title: title,
                    brand: brand,
                    description: description,
                    parent: response.payload,
                })
            }
        })
    }

    updateSkuComponent(){
        const component = 
            <SkuModal 
                parent={this.state.parent} 
                parentInstanceId={this.state.parentInstanceId}
                imageSrc={this.state.imageSrc}
            />;
        this.setState({
            skuComponent: component
        })
    }

    render(){
        const { activeIndex } = this.state;

        const slides = this.state.images.map((item) => {
          return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src} >
              <CardImg src={Configs.collectionsImagesUrl + item.src} onClick={()=>this.toggleModal(item.src)} />
            </CarouselItem>
          );
        });

        return(
            <div className="card-holder">
                <Card className="border-0">
                    <CardBody className="margin-bottom-20">
                        <Row>
                            <div className="parent-card-brand">
                                <div className={"parent-card-brand-logo nike-logo"}></div>
                            </div>
                            <Col className="padding-left-10">
                                <CardTitle className="font-weight-600 margin-bottom-0">{this.state.title}</CardTitle>
                                <CardText className="font-h8">Available from Nike.com and 2 others</CardText>
                            </Col>
                        </Row>
                        <CardText className="margin-top-10 font-h8">{this.state.description}</CardText>
                    </CardBody>
                    <Carousel activeIndex = {activeIndex} next = {this.next} previous = {this.previous} >
                        <CarouselIndicators items = {this.state.images} activeIndex = {activeIndex} onClickHandler = {this.goToIndex} />
                        {slides}
                        <CarouselControl direction = "prev" directionText = "Previous" onClickHandler = {this.previous} />
                        <CarouselControl direction = "next" directionText = "Next" onClickHandler = {this.next} />
                    </Carousel>
                    <CardBody className="margin-top-10">
                        <ImageSlider imageClass={"parent-card-variant-slider-img"} images = {this.state.images} size="auto" fieldName={'thumbnail'} />
                    </CardBody>
                </Card>
                <Modal 
                    ref="skuModal" 
                    component={this.state.skuComponent} 
                />
                <CardBody className = "card-footer">
                    <div className = "font-h7 text-grey">Chosen because you follow Nike</div>
                </CardBody>
            </div>
        )
    }
}

export default ParentCard;