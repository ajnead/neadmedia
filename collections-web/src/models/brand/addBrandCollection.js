import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import BrandRoutes from '../../controllers/brandRoutes';
import InputText from '../../components/inputs/inputText';

class AddBrandCollextion extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collectionType: "",
            collectionName: "",
            collectionDescription: "",
            imageUrl: "",
            brandId: null,
        }

        this.add = this.add.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            brandId: props.brandId
        }
    }

    toggle(){
        this.refs.popup.toggle();
    } 

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    add(){
        const json = {
            collectionType: this.state.collectionType,
            collectionName: this.state.collectionName,
            collectionDescription: this.state.collectionDescription,
            imageUrl: this.state.imageUrl
        }

        const brandRoutes = new BrandRoutes();
        brandRoutes.putBrandCollectionNew(json,this.state.brandId,()=>{
            const response = brandRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.props.close()
            }else{
                //some error message here
            }
        })
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <p>To add a new Brand Collection complete the required(*) fields</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputText 
                            title={"Type*"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.collectionType}
                            onChange={event => this.changeValue(event,"collectionType")}
                        />    
                    </Col>
                </Row>
                
                <InputText 
                    title={"Name*"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.collectionName}
                    onChange={event => this.changeValue(event,"collectionName")}
                />
                <InputText 
                    title={"Description*"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.collectionDescription}
                    onChange={event => this.changeValue(event,"collectionDescription")}
                />
                <InputText 
                    title={"Image URL"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.imageUrl}
                    onChange={event => this.changeValue(event,"imageUrl")}
                />
                <Row className="margin-top-10">
                    <Col>
                        <Button className="bg-color-second no-border" block onClick={this.add} >Add Brand Collection</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddBrandCollextion;