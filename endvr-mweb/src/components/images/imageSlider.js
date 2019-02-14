import React from 'react';
import { Row, Col } from 'reactstrap';
import Configs from '../../configs/configs';

class ImageSlider extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            component: null,
            openProductDetail: false,
        }
    }

    render(){
        const countImages = this.props.images.length;

        var fieldName = this.props.fieldName;
        if(fieldName==undefined){
            fieldName = 'src';;
        }

        return(
            <Row>
                <div className="scrolling-img-pill-count">{countImages}</div>
                <div className="scrolling-wrapper">
                {this.props.images.map((imgData, i) => ( 
                    <Col key={i} xs={this.props.size} sm={this.props.size} >
                        <img key={i} className="scrolling-img pointer" src={Configs.collectionsImagesUrl + imgData[fieldName]} />
                    </Col>
                ))}
                </div>
            </Row>
        )
    }
}

export default ImageSlider;