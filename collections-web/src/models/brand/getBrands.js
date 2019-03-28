import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardImg, CardFooter, CardLink } from 'reactstrap';
import BrandRoutes from '../../controllers/brandRoutes';
import Configs from '../../configs/configs';
import OptionDisplay from '../../components/cards/optionDisplay';
import ModalPage from '../../components/display/modalPage';
import RenderJson from '../../components/display/renderJson';
import EditBrand from './editBrand';
import GetHistory from './getHistory';

class GetBrands extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            brandsRight: [],
            brandsLeft: [],
            component: <EditBrand brandId={0}/>,
            pullUpType: "edit"
        }

        this.openEdit = this.openEdit.bind(this);
        this.reindexBrand = this.reindexBrand.bind(this);
        this.captureLogo = this.captureLogo.bind(this);
        this.openHistory = this.openHistory.bind(this);
    }

    componentDidMount(){
        this.loadInitialBrands();
        //this.openEdit(1);
    }

    loadInitialBrands(){
        const brandRoutes = new BrandRoutes();
        brandRoutes.getAllBrands(()=>{
            var response = brandRoutes.returnParam;
            var status = response.metadata.status;

            var right = [];
            var left = [];
            if(response.payload.brands!==null){
                var isLeft = true;
                for(var obj of response.payload.brands){
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
                    brandsRight: right,
                    brandsLeft: left
                })
            }
        })
    }

    openEdit(brandId){
        this.setState({
            component: <EditBrand brandId={brandId} />,
            pullUpType: "edit"
        },()=>{
            this.refs.modalPage.open();
        })
    }

    reindexBrand(brandId){
        const brandRoutes = new BrandRoutes();
        brandRoutes.putBrandToIndex(brandId);
    }

    captureLogo(brandId){
        const brandRoutes = new BrandRoutes();
        brandRoutes.putCaptureAndResizeLogo(brandId,()=>{
            const response = brandRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.loadInitialBrands();
            }
        });
    }

    openHistory(brandId,brandName){
        this.setState({
            component: <GetHistory brandId={brandId} brandName={brandName} />,
            pullUpType: "view"
        },()=>{
            this.refs.modalPage.open();
        })
    }

    viewJson(brandId){
        const brandRoutes = new BrandRoutes();
        brandRoutes.getBrand(brandId,()=>{
            const response = brandRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    component: <RenderJson json={response.payload} />,
                    pullUpType: "view"
                },()=>{
                    this.refs.modalPage.open();
                })
            }
        });
    }

    render(){
        const DisplayBrandList = (props) => {
            return(
                <div>
                {props.brandList.map((brand,i)=>(
                    <Card className = "margin-bottom-10" key={i}>
                        <CardBody>
                            <Row>
                                <Col xs="2">
                                    <CardImg src={Configs.logosUrl + brand.brandLogoHash + ".150.jpg"} />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5">{brand.brandName} </CardTitle>
                                        </Col>
                                        <Col>
                                            <div className="float-right text-success">{brand.brandStatus}</div>
                                        </Col>
                                    </Row>        
                                    <Row>
                                        <Col>
                                            <OptionDisplay name={"Brand ID"} value={brand.brandId} />    
                                            <OptionDisplay name={"Brand Growth Type"} value={brand.brandGrowthType} />    
                                        </Col>
                                        <Col>
                                            <OptionDisplay name={"Is Visible To Consumer"} value={JSON.stringify(brand.isVisibleToConsumer)} />    
                                            <OptionDisplay name={"Brand Class"} value={brand.brandClass} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <CardLink href="javascript:void(0);" onClick={()=>{this.reindexBrand(brand.brandId)}}>Re-Index Brand</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>{this.captureLogo(brand.brandId)}}>Capture Logo</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>{this.openEdit(brand.brandId)}}>Edit Brand</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>{this.openHistory(brand.brandId,brand.brandName)}}>View History</CardLink>
                            <CardLink href="javascript:void(0);" onClick={()=>this.viewJson(brand.brandId)}>View JSON</CardLink>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            )
        } 

        return(
            <div className="padding-top-20">
                <Row>
                    <Col xs="6">
                        <DisplayBrandList brandList={this.state.brandsLeft} />
                    </Col>
                    <Col xs="6">
                        <DisplayBrandList brandList={this.state.brandsRight} />
                    </Col>
                </Row>
                <ModalPage ref="modalPage" component={this.state.component} pullUpType={this.state.pullUpType} />
            </div>
        )
    }
}

export default GetBrands;