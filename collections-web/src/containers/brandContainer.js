import React from 'react';
import { Container } from 'reactstrap';
import ViewBrands from '../models/brand/viewBrands';

class BrandContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <Container fluid>
                <ViewBrands />
            </Container>
        )
    }
}

export default BrandContainer;