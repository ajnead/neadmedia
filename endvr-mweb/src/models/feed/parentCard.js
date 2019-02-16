import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Carousel, CarouselIndicators, CarouselControl, CarouselItem, CardImg } from 'reactstrap';
import Configs from '../../configs/configs';
import RelationshipRoutes from '../../routes/relationshipRoutes';
import ImageSlider from '../../components/images/imageSlider';

class ParentCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0,
            images: [
                { src: '81b0ef55d92527af53b4c52989b6ecacd07f5347.feed.jpg', thumbnail: '81b0ef55d92527af53b4c52989b6ecacd07f5347.150.jpg' },
                { src: '2d1570ce6149e1d2517e6d1957b355a7996b5d42.feed.jpg', thumbnail: '2d1570ce6149e1d2517e6d1957b355a7996b5d42.150.jpg' },         
                { src: 'a336cf118aac13c965a9be5318c149ecb86a0d3c.feed.jpg', thumbnail: 'a336cf118aac13c965a9be5318c149ecb86a0d3c.150.jpg' },
                { src: 'f0777db0ad79baf0e44363be1171ed140c7546e4.feed.jpg', thumbnail: 'f0777db0ad79baf0e44363be1171ed140c7546e4.150.jpg' }                  
            ],
            parentInstanceId: ''
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
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
        var parentInstanceId = this.state.parentInstanceId;
    }

    render(){
        const { activeIndex } = this.state;
        
        const slides = this.state.images.map((item) => {
          return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src} >
              <CardImg src={Configs.collectionsImagesUrl + item.src} />
            </CarouselItem>
          );
        });

        return(
            <div className="card-holder">
                <Card className="border-0">
                    <CardBody className="margin-bottom-20">
                        <CardTitle className="font-weight-600 margin-bottom-5">Nike Zoom Pegasus Turbo</CardTitle>
                        <CardText className="font-h6">The Nike Zoom Pegasus Turbo is the Pegasus you know and love with major upgrades for speed.</CardText>
                    </CardBody>
                    <Carousel activeIndex = {activeIndex} next = {this.next} previous = {this.previous} >
                        <CarouselIndicators items = {this.state.images} activeIndex = {activeIndex} onClickHandler = {this.goToIndex} />
                        {slides}
                        <CarouselControl direction = "prev" directionText = "Previous" onClickHandler = {this.previous} />
                        <CarouselControl direction = "next" directionText = "Next" onClickHandler = {this.next} />
                    </Carousel>
                    <CardBody className="margin-top-10">
                        <ImageSlider images = {this.state.images} size="auto" fieldName={'thumbnail'} />
                    </CardBody>
                </Card>
                <CardBody className = "card-footer">
                    <div className = "font-h7 text-grey">Chosen because you follow Nike</div>
                </CardBody>
            </div>
        )
    }
}

export default ParentCard;