import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardLink } from 'reactstrap';
import IdentityRoutes from '../../controllers/identityRoutes';
import OptionDisplay from '../../components/cards/optionDisplay';
import RenderJson from '../../components/display/renderJson';
import ModalPage from '../../components/display/modalPage';

class ViewIdentities extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loadState: "waitingQuery",
            identityClassId: "application",
            identityInstanceId: "",
            primaryEmail: "",
            identities: [],
            identity: {}
        }

        this.returnValue = this.returnValue.bind(this);
        this.loadIdentities = this.loadIdentities.bind(this);
    }

    componentDidMount(){
        this.loadIdentities();
    }

    returnValue(key,value){
        this.setState({
            [key]: value
        })
    }

    loadIdentities(){
        const json = {
            identityClassId: this.state.identityClassId,
            identityInstanceId: this.state.identityInstanceId,
            primaryEmail: this.state.primaryEmail
        }

        const identityRoutes = new IdentityRoutes();
        identityRoutes.postSearchIdentity(json,()=>{
            const response = identityRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    identities: response.payload.identities,
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

    openJson(identityInstanceId){
        const identities = this.state.identities;
        for(const identity of identities){
            if(identity.identityInstanceId===identityInstanceId){
                this.setState({
                    identity: identity
                },()=>{
                    this.refs.viewJson.open();
                })
            }
        }
    }

    indexIdentity(identityInstanceId){
        const identityRoutes = new IdentityRoutes();
        identityRoutes.putIdentityToIndex(identityInstanceId,()=>{});
    }

    render(){
        const DetermineResponse = (props) => {
            switch(props.loadState) {
                case 'waitingQuery':
                    return <div>Search a Source Instance ID or Offer Instance ID</div>
                case 'waitingResults':
                    return <div>Loading...</div>
                case 'success':
                    return <DisplayIdentities identities={this.state.identities} />
                case 'notFound':
                    return <div>Offer not found</div>
                default: 
                    return <div>Offer not found</div>
            } 
        }

        const DisplayIdentities = (props) => {
            return (
                <div>
                    {props.identities.map((id,i) => (
                        <Row key={i} className="margin-top-15" noGutters>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <CardTitle>Identity Instance ID: {id.identityInstanceId}</CardTitle>    
                                        </Col>
                                        <Col>
                                            <div className="float-right text-success">{id.identityStatusId}</div>
                                        </Col>
                                    </Row>
                                    <Row className="margin-top-10">
                                        <Col><OptionDisplay name={"Primary Name"} value={id.primaryName} /></Col>
                                        <Col><OptionDisplay name={"Secondary Name"} value={id.secondaryName} /></Col>
                                        <Col><OptionDisplay name={"Primary Email"} value={id.primaryEmail} /></Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <CardLink href="javascript:void(0);" onClick={()=>this.openJson(id.identityInstanceId)}>View Identity JSON</CardLink>
                                    <CardLink href="javascript:void(0);" onClick={()=>this.indexIdentity(id.identityInstanceId)}>Re-index Identity</CardLink>
                                    <CardLink href="javascript:void(0);" onClick={()=>this.indexIdentity(id.identityInstanceId)}>View History</CardLink>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    ))}
                </div>
            )
        }

        return(
            <div>
                <DetermineResponse loadState={this.state.loadState} />
                <ModalPage ref="viewJson" component={<RenderJson json={this.state.identity} />} pullUpType={"view"} />
            </div>
        )
    }
}

export default ViewIdentities;