import React from 'react';
import Moment from 'react-moment'
import 'moment-timezone';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardLink } from 'reactstrap';
import InputSourceInstanceId from './filters/inputSourceInstanceId';
import InputOfferInstanceId from './filters/inputOfferInstanceId';
import OfferRoutes from '../../controllers/offerRoutes';
import OptionDisplay from '../../components/cards/optionDisplay';
import RenderJson from '../../components/display/renderJson';
import ModalPage from '../../components/display/modalPage';

class OfferData extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loadState: "waitingQuery",
            sourceInstanceId: "",
            offerInstanceId: "",
            offers: [],
            offer: {}
        }

        this.returnValue = this.returnValue.bind(this);
    }

    returnValue(key,value){
        this.setState({
            [key]: value
        },()=>{
            this.loadOffer();
        })
    }

    loadOffer(){
        const json = {
            offerInstanceId: this.state.offerInstanceId,
            sourceInstanceId: this.state.sourceInstanceId
        }

        const offerRoutes = new OfferRoutes();
        offerRoutes.postSearchOffers(json,()=>{
            const response = offerRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    offers: response.payload.offers,
                    loadState: "success"
                })
            }else if(status==="not_found"){
                this.setState({
                    loadState: "notFound"
                });   
            }else{
                this.setState({
                    loadState: "error"
                });   
            }
        });
    }

    openModalPageOfferJson(offerInstanceId){
        const offers = this.state.offers;
        for(const offer of offers){
            if(offer.offerInstanceId==offerInstanceId){
                this.setState({
                    offer: offer
                },()=>{
                    this.refs.viewOfferJson.open();
                })
            }
        }
    }

    indexOffer(offerInstanceId){
        const offerRoutes = new OfferRoutes();
        offerRoutes.putOfferToIndex(offerInstanceId,()=>{});
    }

    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>Search a Source Instance ID or Offer Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return <DisplayOffers offers={this.state.offers} />
                case 'notFound':
                    return <div>Offer not found</div>
                default: 
                    return <div>Offer not found</div>
            } 
        }

        const DisplayOffers = (props) => {
            return (
                <div>
                    {props.offers.map((offer,i) => (
                        <Row key={i} className="margin-top-15">
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Offer Instance ID: {offer.offerInstanceId}</CardTitle>
                                    <Row className="margin-top-10">
                                        <Col><OptionDisplay name={"Offer Class"} value={offer.offerClass} /></Col>
                                        <Col><OptionDisplay name={"Source Instance ID"} value={offer.sourceInstanceId} isLink={true} href={"/data/sources/data?sourceInstanceId=" + offer.sourceInstanceId} /></Col>
                                        <Col><OptionDisplay name={"Identity Instance ID"} value={offer.identityInstanceId} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Unit Container Level"} value={offer.unitContainerLevel} /></Col>
                                        <Col><OptionDisplay name={"Number Of Units"} value={offer.numberOfUnits} /></Col>
                                        <Col>{offer.sponsporedLink!==null ? <OptionDisplay name={"Has Sponsored Link"} value={JSON.stringify(true)} /> : <OptionDisplay name={"Has Sponsored Link"} value={JSON.stringify(false)} /> }</Col>
                                    </Row>
                                    <Row>
                                        <Col><OptionDisplay name={"Service Name"} value={offer.serviceName} /></Col>
                                        <Col><OptionDisplay name={"Updated By"} value={offer.updatedBy} /></Col>
                                        <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{offer.updateDate / 1000}</Moment>} /></Col>
                                    </Row>
                                    <CardTitle className="underline margin-top-10">Prices</CardTitle>
                                    {offer.offerPrices.map((price,i2) => (
                                        <Row key={i2}>
                                            <Col><OptionDisplay name={"Price Type"} value={price.priceType} /></Col>
                                            <Col><OptionDisplay name={"Price"} value={price.price} /></Col>
                                            <Col><OptionDisplay name={"Update Date"} value={<Moment unix tx="America/New_York">{price.updateDate / 1000}</Moment>} /></Col>
                                        </Row>
                                    ))}
                                </CardBody>
                                <CardFooter>
                                    <CardLink href="javascript:void(0);" onClick={()=>this.openModalPageOfferJson(offer.offerInstanceId)}>View Offer JSON</CardLink>
                                    <CardLink href="javascript:void(0);" onClick={()=>this.indexOffer(offer.offerInstanceId)}>Re-index Offer</CardLink>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    ))}
                </div>
            )
        }

        return(
            <Container fluid>
                <Row>
                    <Col xs="6">
                        <InputSourceInstanceId returnValue={this.returnValue} />
                    </Col>
                    <Col xs="6">
                        <InputOfferInstanceId returnValue={this.returnValue} />
                    </Col>
                </Row>
                <DetermineResponse loadState={this.state.loadState} />
                <ModalPage ref="viewOfferJson" component={<RenderJson json={this.state.offer} />} pullUpType={"view"} />
            </Container>
        )
    }
}

export default OfferData;