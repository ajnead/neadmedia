import React from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Moment from 'react-moment'
import 'moment-timezone';
import BrandRoutes from '../../controllers/brandRoutes';
import InputText from '../../components/inputs/inputText';
import InputTextNoLabel from '../../components/inputs/inputTextNoLabel';
import NonInput from '../../components/display/nonInput';
import OptionDisplay from '../../components/cards/optionDisplay';

class EditBrand extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            brandId: 0,
            brandObj: {
                brandName: '',
                brandLogoUrl: '',
                websiteUrl: '',
                brandGrowthType: '',
                isVisibleToConsumer: '',
                brandClass: '',
                brandStatus: '',
                brandLogoUrl: '',
                brandSynonyms: []
            },
            newSynonym: '',
            rightCollection: [],
            leftCollection: []
        }

        this.deleteSynonym = this.deleteSynonym.bind(this);
        this.addSynonym = this.addSynonym.bind(this);
        this.addCollection = this.addCollection.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
    }

    componentDidMount(){
        this.setState({
            brandId: this.props.brandId
        },()=>{
            this.loadBrand();
        })
    }

    componentDidUpdate(){
        if(this.state.brandId!==this.props.brandId){
            this.setState({
                brandId: this.props.brandId
            },()=>{
                this.loadBrand();
            })
        }
    }

    loadBrand(){
        if(this.state.brandId!==0){
            const brandRoutes = new BrandRoutes();
            brandRoutes.getBrand(this.state.brandId,()=>{
                const response = brandRoutes.returnParam;
                const status = response.metadata.status;

                var left = [];
                var right = [];
                var isLeft = true;
                if(response.payload.brandCollections!=null){
                    for(var obj of response.payload.brandCollections){
                        if(isLeft){
                            left.push(obj);
                            isLeft = false;
                        }else{
                            right.push(obj);
                            isLeft = true;
                        }
                    }
                }

                if(status==="success"){
                    this.setState({
                        brandObj: response.payload,
                        rightCollection: right,
                        leftCollection: left
                    })
                }
            })
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    deleteSynonym(brandSynonymId){
        console.log(brandSynonymId);
        const brandRoutes = new BrandRoutes();
        brandRoutes.deleteBrandSynonym(brandSynonymId,this.state.brandId,()=>{
            const response = brandRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                var brandObj = this.state.brandObj;
                var bsArr = brandObj.brandSynonyms;
                
                for(var i =0; i<bsArr.length; i++){
                    var bsObj = bsArr[i];
                    if(brandSynonymId==bsObj.brandSynonymId){
                        bsArr.splice(i,1);
                        break;
                    }
                }

                brandObj.brandSynonyms = bsArr;

                this.setState({
                    brandObj: brandObj
                });
            }
        });
    }

    addSynonym(){
        const brandRoutes = new BrandRoutes();
        brandRoutes.putBrandSynonym(this.state.newSynonym,this.state.brandId,()=>{
            const response = brandRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                const bsObj = {
                    brandSynonymId: response.payload.brandSynonymId,
                    brandId: this.state.brandId,
                    synonymValue: this.state.newSynonym
                }

                var brandObj = this.state.brandObj;
                var bsArr = brandObj.brandSynonyms;
                bsArr.push(bsObj);
                brandObj.brandSynonyms = bsArr;

                this.setState({
                    brandObj: brandObj,
                    newSynonym: ''
                })
            }
        });
    }
    
    addCollection(){
        console.log('add collection coming soon');
    }

    deleteCollection(brandCollectionId){
       console.log(brandCollectionId);
    }

    render(){

        const DisplayCollectionsCards = (props) => {
            return(
                <div>
                    {props.collectionsList.map((c,i)=>(
                        <Card className="margin-bottom-10 height-100" key={i}>
                            <CardBody>
                                <CardTitle tag="h5">
                                    {c.collectionName}
                                    <div className="trash-can-40-40 float-right">
                                        <div className="icon-trash-can" onClick={()=>this.deleteCollection(c.brandCollectionId)}></div>
                                    </div>
                                </CardTitle>
                                {c.collectionDescription!=null ? <CardSubtitle>c.collectionDescription</CardSubtitle> : <span></span>}
                                <Row>
                                    <Col>
                                        <OptionDisplay name={"Brand Collection ID"} value={c.brandCollectionId} />        
                                    </Col>
                                    <Col>
                                        <OptionDisplay name={"Collection Type"} value={c.collectionType} />    
                                    </Col>
                                </Row>
                                <Table className="margin-top-15" size="sm" hover>
                                    <thead>
                                        <tr>
                                            <td>Attribute ID</td>
                                            <td>Search Expression</td>
                                            <td>Case Sensitive</td>
                                            <td>Search Type</td>
                                            <td>Condition</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {c.brandCollectionAttributes.map((a,i2)=>(
                                        <tr key={i2}>
                                            <td>{a.attributeId}</td>         
                                            <td>{a.searchExpression}</td>    
                                            <td>{JSON.stringify(a.isCaseSensitive)}</td>    
                                            <td>{a.searchExpressionType}</td>    
                                            {a.searchExpressionCondition == null || a.searchExpressionCondition == undefined ? <td>and</td> : <td>{a.searchExpressionCondition}</td>}
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <div className="pointer font-size-13">
                                    <div className="float-left font-color-active">
                                        Add new Collection Attribute
                                    </div>
                                    <div className = "float-left margin-left-5 add-bttn-20-20 padding-top-0">
                                        <div className="icon-add"></div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )
        }
        
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <h3>Brand: {this.state.brandObj.brandName} [Brand ID: {this.state.brandId}]</h3>
                        <h6 className="float-left vertical-breaks"><b>Last Updated:</b> <Moment unix tx="America/New_York">{this.state.brandObj.updateDate / 1000}</Moment></h6>
                        <h6 className="float-left"><b>Last Updated By:</b> {this.state.brandObj.updatedBy}</h6>
                    </Col>
                </Row>
                <Row className="margin-top-15">
                    <Col>
                        <InputText 
                            title={"Brand Name"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.brandName}
                            onChange={event => this.changeValue(event,"brandName")}
                        />
                        <InputText 
                            title={"Is Visible To Consumer"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.isVisibleToConsumer}
                            onChange={event => this.changeValue(event,"isVisibleToConsumer")}
                        />
                        <InputText 
                            title={"Brand Website URL"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.websiteUrl}
                            onChange={event => this.changeValue(event,"websiteUrl")}
                        />
                    </Col>
                    <Col>
                        <InputText 
                            title={"Brand Status"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.brandStatus}
                            onChange={event => this.changeValue(event,"brandStatus")}
                        />
                        <InputText 
                            title={"Brand Growth Type"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.brandGrowthType}
                            onChange={event => this.changeValue(event,"brandGrowthType")}
                        />
                        <InputText 
                            title={"Brand Class"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.brandClass}
                            onChange={event => this.changeValue(event,"brandClass")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputText 
                            title={"Brand Logo URL"}
                            className="input-text-line"
                            labelClassName="bold"
                            value={this.state.brandObj.brandLogoUrl}
                            onChange={event => this.changeValue(event,"brandLogoUrl")}
                        />
                    </Col>
                </Row>
                <Row className="margin-top-15">
                    <Col>
                        <NonInput 
                            title={'Brand Logo Hash'}
                            value={this.state.brandObj.brandLogoHash}
                        />
                    </Col>
                    <Col>
                        <NonInput 
                            title={'Brand Logo Status'}
                            value={this.state.brandObj.brandLogoHashStatus}
                        />
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col xs={{ size: 6, offset: 3}}>
                        <Button className="bg-color-second no-border" block >Update Brand</Button>
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col>
                        <h3>Brand Synonyms</h3>
                        <Card>
                            <CardBody className="padding-bottom-5">
                                {this.state.brandObj.brandSynonyms.map((s,i)=>(
                                    <div key={i}>
                                        <div className="float-left trash-can-20-20 margin-right-5">
                                            <div className="icon-trash-can" onClick={()=>this.deleteSynonym(s.brandSynonymId)}></div>
                                        </div>
                                        <OptionDisplay verticalBreaks={true} floatLeft={true} name={"Synonym"} value={s.synonymValue}  />
                                    </div>
                                ))}
                                <div>
                                    <div className="float-left">
                                        <InputTextNoLabel 
                                            placeholder={"Add Synonym"}
                                            className="input-text-line width-250px height-30"
                                            labelClassName="bold"
                                            value={this.state.newSynonym}
                                            onChange={event => this.changeValue(event,"newSynonym")}
                                        />
                                        
                                    </div>
                                    <div className = "float-left margin-left-5 add-bttn-30-30 padding-top-0">
                                        <div className="icon-add" onClick={this.addSynonym}></div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="margin-top-20">
                    <Col>
                        <div className="height-55">
                            <h3 className="float-left">Brand Collections</h3>    
                            <div className="add-bttn-35-35 float-left margin-left-10">
                                <div className="icon-add" onClick={this.addCollection}></div>
                            </div>
                        </div>
                        <Row>
                            <Col><DisplayCollectionsCards collectionsList={this.state.leftCollection} /></Col>
                            <Col><DisplayCollectionsCards collectionsList={this.state.rightCollection} /></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditBrand;