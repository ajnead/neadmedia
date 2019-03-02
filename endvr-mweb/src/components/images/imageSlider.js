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

        var fieldName = 'src'; 
        if(this.props.fieldName!==undefined&&this.props.fieldName!==null){
            fieldName = this.props.fieldName;
        }

        var assetUrl = Configs.collectionsImagesUrl;
        if(this.props.assetUrl!==undefined&&this.props.assetUrl!==null){
            assetUrl = this.props.assetUrl;
        }

        var imageClass = '';
        if(this.props.imageClass!==undefined&&this.props.imageClass!==null){
            imageClass=' ' + this.props.imageClass;
        }

        return(
            <Row noGutters>
                <div className="scrolling-wrapper">
                {this.props.images.map((imgData, i) => ( 
                    <Col className="scrolling-img-col" key={i} xs={this.props.size} sm={this.props.size} >
                        <img key={i} className={"scrolling-img pointer" + imageClass} src={assetUrl + imgData[fieldName]} />
                        {imgData.title!==null ? <div className="font-h8 text-align-center">{imgData.title}</div> : <span></span>}
                    </Col>
                ))}
                </div>
            </Row>
        )
    }
}

export default ImageSlider;

//<div className="scrolling-img-pill-count">{countImages}</div>