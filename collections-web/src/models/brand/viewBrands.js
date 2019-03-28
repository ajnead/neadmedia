import React from 'react';
import { Row, Col } from 'reactstrap';
import DropDownBrandName from './filters/dropDownBrandName';
import GetBrands from './getBrands';

class ViewBrands extends React.Component {

    

    render(){
        return(
            <div className="padding-top-20">
                <Row>
                    <Col>
                        <DropDownBrandName />
                    </Col>
                    <Col></Col>
                </Row>
                <GetBrands />
            </div>
        )
    }
}

export default ViewBrands;