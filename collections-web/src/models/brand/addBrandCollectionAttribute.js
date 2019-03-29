import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import BrandRoutes from '../../controllers/brandRoutes';
import InputText from '../../components/inputs/inputText';
import DropDownAttribute from '../attributes/filters/dropDownAttribute';

class AddBrandCollextionAttribute extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            attributeId: "",
            searchExpression: "",
            searchExpressionType: "contains",
            searchExpressionOrder: null,
            searchExpressionCondition: "and",
            isCaseSensitive: false,
            brandCollectionId: null,
            brandId: null,
        }

        this.add = this.add.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            brandId: props.brandId,
            brandCollectionId: props.brandCollectionId
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    handleFilter(key,value){
        this.setState({
            [key]: value
        })
    }

    add(){
        const json = {
            attributeId: this.state.attributeId,
            searchExpression: this.state.searchExpression,
            searchExpressionType: this.state.searchExpressionType,
            searchExpressionOrder: this.state.searchExpressionOrder,
            searchExpressionCondition: this.state.searchExpressionCondition,
            isCaseSensitive: this.state.isCaseSensitive,
            searchExpressionOrder: this.state.searchExpressionOrder,
        }

        const brandRoutes = new BrandRoutes();
        brandRoutes.putBrandCollectionUpdateAttrNew(json,this.state.brandId,this.state.brandCollectionId,()=>{
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
                        <p>To add a new Brand Collection Attribute complete the required(*) fields</p>
                    </Col>
                </Row>
                <DropDownAttribute bgWhite={true} changeValue={this.handleFilter}/> 
                <InputText 
                    title={"Search Expression*"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.searchExpression}
                    onChange={event => this.changeValue(event,"searchExpression")}
                />
                <InputText 
                    title={"Search Expression Type*"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.searchExpressionType}
                    onChange={event => this.changeValue(event,"searchExpressionType")}
                />
                <InputText 
                    title={"Search Expression Conditions*"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.searchExpressionCondition}
                    onChange={event => this.changeValue(event,"searchExpressionCondition")}
                />
                <InputText 
                    title={"Is Case Sensitive*"}
                    className="input-text-line"
                    labelClassName="bold"
                    value={this.state.isCaseSensitive}
                    onChange={event => this.changeValue(event,"isCaseSensitive")}
                />
                <Row className="margin-top-10">
                    <Col>
                        <Button className="bg-color-second no-border" block onClick={this.add}>Add</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddBrandCollextionAttribute;