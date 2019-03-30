import React from 'react';
import { Container } from 'reactstrap';
import { Row, Col, Card, CardBody, CardTitle, CardLink, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import OptionDisplay from '../../components/cards/optionDisplay';
import OptionDisplayList from '../../components/cards/optionDisplayList';
import MicroserviceRoutes from '../../controllers/microserviceRoutes';
import ReverseCamelCase from '../../utilities/helpers/reverseCamelCase';
import HasValue from '../../utilities/helpers/hasValue';
import DropDownMsGroup from './filters/dropDownMsGroup';

class ViewGroups extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            groups: [
                {
                    microserviceNames: [],
                    microserviceUIGroupsNodes: []
                }
            ],
            filters: { }
        }

        this.startGroup = this.startGroup.bind(this);
        this.stopGroup = this.stopGroup.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount(){
        this.getAllGroups();
    }

    getAllGroups(){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.postGroupMicroservices(this.state.filters,()=>{
            var post = microserviceRoutes.returnParam;
            var status = post.metadata.status;

            if(status==="success"){
                this.setState({
                    groups: post.payload.microserviceGroups
                })
            }
        })
    }

    startGroup(groupName){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.getGroupMicroservicesStart(groupName,()=>{
            this.getAllGroups();
        });
    }

    stopGroup(groupName){
        const microserviceRoutes = new MicroserviceRoutes();
        microserviceRoutes.getGroupMicroservicesStop(groupName,()=>{
            this.getAllGroups();
        });
    }

    filterHandler(filterName,filterValues){
        var filters = {};
        filters[filterName] = filterValues;

        if(filterValues.length==0){
            delete filters[filterName];
            delete this.state.filters[filterName]
        }

        var final = Object.assign(this.state.filters,filters);

        this.setState({
            filters: final
        },()=>{
            this.getAllGroups();        
        })
    }

    render(){

        const NodeList = (props) => {
            var nodeArr = [];
            for(var node of props.nodes){
                nodeArr.push(node.nodeName + " [" + node.countMicroservices + "]")
            }

            return(
                <OptionDisplayList name={"Nodes List"} values={nodeArr} />
            )
        }

        const ReverseCamelCaseDisplay = (props) => {
            if(HasValue(props.expression)){
                return ReverseCamelCase(props.expression);
            }else{
                return <span></span>
            }
        }


        return(
            <Container fluid>
                <div className="padding-top-20">
                    <Row>
                        <Col><DropDownMsGroup dataHandler={this.filterHandler} /></Col>
                        <Col></Col>
                    </Row>
                    <div className="margin-top-15">
                        {this.state.groups.map((group,i)=>(
                            <Row key={i} noGutters className="list-row">
                                <Card style={{ width: '100%' }} className="no-border">
                                    <CardBody className="padding-bottom-5">
                                        <CardTitle tag="h4"><ReverseCamelCaseDisplay expression={group.groupName} /> [{group.groupName}]</CardTitle>
                                    </CardBody>
                                    <CardBody className="no-padding-top">
                                        <CardTitle className="underline">Application Group Stats</CardTitle>
                                        <Row>
                                            <Col><OptionDisplay name={"Microservices"} value={group.countMicroservices} /></Col>
                                            <Col><OptionDisplay name={"Active"} value={group.countActive} /></Col>
                                            <Col><OptionDisplay name={"Exception Occurred"} value={group.countException} /></Col>
                                        </Row>
                                        <Row>
                                            <Col><OptionDisplay name={"Nodes Utilized"} value={group.countNodes} /></Col>
                                            <Col><OptionDisplay name={"Messages Processed"} value={group.sumMessages} /></Col>
                                            <Col><OptionDisplay name={"Largest Backlog"} value={group.sumBacklog} /></Col>
                                        </Row>
                                        <CardTitle className="underline margin-top-10">Group Information</CardTitle>
                                        <Row>
                                            <Col><OptionDisplayList name={"Services List"} isLink={true} href={"/system/microservices/all?name="} values={group.microserviceNames} /></Col>
                                        </Row>
                                        <Row>
                                            <Col><NodeList nodes={group.microserviceUIGroupsNodes} /></Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter>
                                        <CardLink href="javascript:void(0);" onClick={()=>this.startGroup(group.groupName)}>Start Group</CardLink>
                                        <CardLink href="javascript:void(0);" onClick={()=>this.stopGroup(group.groupName)}>Stop Group</CardLink>
                                        <CardLink tag={Link} to={"/system/microservices/all?microserviceGroup=" + group.groupName}>View Microservices</CardLink>
                                    </CardFooter>
                                </Card>
                            </Row>    
                        ))}
                    </div>
                </div>
            </Container>
        )
    }
}

export default ViewGroups;