import React from 'react';
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, Fade } from 'reactstrap';
import { Pagination } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import OptionDisplay from '../../components/cards/optionDisplay';
import Configs from '../../configs/configs';
import SourceRoutes from '../../controllers/sourceRoutes';
import ShowHideSourceInfo from './components/showHideSourceInfo'
import DropDownIdentities from './filters/dropDownIdentities';
import DropDownBrands from './filters/dropDownBrands';

class ViewPipeline extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            processingCounts: [
                {
                    id: 0,
                    name: 'Waiting Start',
                    active: "active",
                    value: ""
                },
                {
                    id: 140,
                    name: 'Initial Clasification',
                    group: 'Data Manipulation',
                    active: "",
                    value: ""
                },
                {
                    id: 150,
                    name: 'Normalized',
                    group: 'Data Manipulation',
                    active: "",
                    value: ""
                },
                {
                    id: 160,
                    name: 'Extraction Complete',
                    group: 'Data Manipulation',
                    active: "",
                    value: ""
                },
                {
                    id: 200,
                    name: 'Image Captured',
                    group: 'Image Processing',
                    active: "",
                    value: ""
                },
                {
                    id: 210,
                    name: 'Image Processed',
                    group: 'Image Processing',
                    active: "",
                    value: ""
                },
                {
                    id: 220,
                    name: 'Image Cropped',
                    group: 'Image Processing',
                    active: "",
                    value: ""
                },
                {
                    id: 230,
                    name: 'Image Thumbnail',
                    group: 'Image Processing',
                    active: "",
                    value: ""
                },
                {
                    id: 300,
                    name: 'Container Checked',
                    group: 'Container Processing',
                    active: "",
                    value: ""
                },
                {
                    id: 400,
                    name: 'Final Classification',
                    group: 'Classification',
                    active: "",
                    value: ""
                },
                {
                    id: 500,
                    name: 'Validated',
                    group: 'Validated',
                    active: "",
                    value: ""
                },
                {
                    id: 700,
                    name: 'Matched',
                    group: 'Matched',
                    active: "",
                    value: ""
                }
            ],
            sourcePipelineStates: [
                {
                    id: 'success',
                    name: 'Processing',
                    active: "",
                    value: ""
                },
                {
                    id: 'error',
                    name: 'Data Errors',
                    active: "",
                    value: ""
                },
                {
                    id: 'review',
                    name: 'Requires Review',
                    active: "",
                    value: ""
                },
                {
                    id: 'failure',
                    name: 'System Failures',
                    active: "",
                    value: ""
                },
                {
                    id: 'complete',
                    name: 'Pipeline Complete',
                    active: "",
                    value: ""
                },
                {
                    id: 'total',
                    name: 'Total',
                    active: "",
                    value: ""
                },
            ],
            pipelineList: [],
            pageNumber: 1,
            maxCountPerPage: 100,
            maxButtonsForPaging: 25,
            currentResultFrom: 0,
            resultCount: 0,
            pageCount: 1,
            pageArray: [],
            pageResult: 'display-none',
            sourcePipelineState: '',
            sourcePipelineStatusId: 0,
            loadState: 'waitingQuery',
            showProcessingCounts: false
        }

        this.loadQueryPipelineCounts = this.loadQueryPipelineCounts.bind(this);
        this.selectPipelineState = this.selectPipelineState.bind(this);
        this.selectPipelineStatus = this.selectPipelineStatus.bind(this);
        this.sourceDeepLink = this.sourceDeepLink.bind(this);
        this.pageResults = this.pageResults.bind(this);
        this.loadNextPageOfResults = this.loadNextPageOfResults.bind(this);
    }

    componentDidMount(){
        this.loadQueryPipelineCounts();
    }

    sourceDeepLink(url){
        this.props.history.push(url);
    }

    loadQueryPipelineCounts(){
        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getQueryPipelineCounts(()=>{
            const get = sourceRoutes.returnParam;
            var status = get.metadata.status;
            
            if(status==='success'){  
                this.setState({
                    sourcePipelineStates: this.countSourcePipelineStates(get.payload),
                    processingCounts: this.countProcessingStatus(get.payload)
                })
            }else{
                this.setState({ loadState: 'error' });
            }
        })
    }

    countSourcePipelineStates(payload){
        var arr = this.state.sourcePipelineStates;
        var countsArr = payload.stateCounts;
        
        var total = 0;
        for(var obj of arr){
            for(var countsObj of countsArr){
                if(obj.id===countsObj.sourcePipelineState){
                    obj.value = countsObj.count;
                    total = total + obj.value;
                    break;
                }
            }
        }
        
        return arr;
    }

    countProcessingStatus(payload){
        var arr = this.state.processingCounts;
        var countsArr = payload.counts;

        for(var obj of arr){
            for(var countsObj of countsArr){
                if(obj.id===countsObj.sourcePipelineStatusId){
                    obj.value = countsObj.count;
                    break;
                }
            }
        }

        return arr;
    }

    selectPipelineState(id){
        this.pageResults(0);
        var arr = this.state.sourcePipelineStates;
        var idActive = '';
        for(var sps of arr){
            sps.active = "";
            if(sps.id===id){
                sps.active = "active";
                idActive  = id;
            }
        }

        var showProcessingCounts = false;
        if(idActive==='success'){
            showProcessingCounts = true;
        }

        this.setState({
            sourcePipelineStates: arr,
            sourcePipelineState: idActive,
            showProcessingCounts: showProcessingCounts,
            pipelineList: []
        },()=>{
            if(idActive!=='success'){
                this.loadNextPageOfResults(1);
            }
        })
    }

    selectPipelineStatus(id){
        this.pageResults(0);
        var arr = this.state.processingCounts;
        var idActive = 0;
        for(var sps of arr){
            sps.active = "";
            if(sps.id===id){
                sps.active = "active";
                idActive  = id;
            }
        }

        this.setState({
            processingCounts: arr,
            sourcePipelineStatusId: idActive,
            pipelineList: []
        },()=>{
            this.loadNextPageOfResults(1);
        })
    }

    loadViewPipelineStateList(){
        this.setState({ loadState: 'waitingResults' });
        const sourceRoutes = new SourceRoutes();
        var stateLookup = this.state.sourcePipelineState;
        if(stateLookup==="total"){
            stateLookup="success";
        }
        sourceRoutes.getViewPipelineStateList(this.state.currentResultFrom,this.state.maxCountPerPage,stateLookup,()=>{
            const get = sourceRoutes.returnParam;
            var status = get.metadata.status;
            var count = get.payload.count;

            if(status==='success'){
                this.setState({
                    pipelineList: get.payload.results,
                    loadState: 'success'
                },()=>{
                    this.pageResults(count)
                })
            }else{
                this.setState({ loadState: 'error' });
            }
        });
    }

    loadViewPipelineProcesingList(){
        this.setState({ loadState: 'waitingResults' });
        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getViewPipelineProcessingList(this.state.currentResultFrom,this.state.maxCountPerPage,this.state.sourcePipelineStatusId,()=>{
            const get = sourceRoutes.returnParam;
            var status = get.metadata.status;
            var count = get.payload.count;

            if(status==='success'){
                this.setState({
                    pipelineList: get.payload.results,
                    loadState: 'success',
                },()=>{
                    this.pageResults(count)
                })
            }else{
                this.setState({ loadState: 'error' });
            }
        });
    }

    pageResults(count){
        this.setState({ resultCount: count })
        const maxPerPage = this.state.maxCountPerPage;
        const maxButtonsForPaging = this.state.maxButtonsForPaging;
        var pageArray = [];

        var pageResult = 'display-none';
        if(count>maxPerPage){
            pageResult = 'display-block';
            var pageCount = (count/maxPerPage) + 1;
            for(var i=1 ; i<=pageCount; i++){
                var  obj = {
                    active: 'normal',
                    page: i
                }

                if(this.state.pageNumber===obj.page){
                    obj.active = 'active';
                }

                if(pageArray.length<=(maxButtonsForPaging-1)){
                    pageArray.push(obj);
                }
            }
        }

        this.setState({
            pageResult: pageResult,
            pageCount: pageCount,
            pageArray: pageArray
        });
    }

    loadNextPageOfResults(pageNumber){
        if(pageNumber<1){
            var checkPageNumber = pageNumber;
            pageNumber = this.state.pageNumber;
            checkPageNumber===-2 ? pageNumber = pageNumber + 1 : pageNumber = pageNumber -1;
        }

        var pageCount = this.state.pageCount;
        if(pageCount===undefined){ pageCount = 1; } 

        if(pageNumber>0&&pageNumber<=pageCount){
            var currentResultFrom = (pageNumber -1) * this.state.maxCountPerPage; 

            this.setState({
                pageNumber: pageNumber,
                currentResultFrom: currentResultFrom,
            },()=>{
                if(this.state.showProcessingCounts){
                    this.loadViewPipelineProcesingList();
                }else{
                    this.loadViewPipelineStateList();
                }
            })
        }
    }
    
    render(){
        const DisplaySourceListSwtich = (props) => {
            switch(props.loadState){
                case 'waitingQuery' :return <div>Please click a status to retrieve a list of Sources</div>
                case 'waitingResults': return <div>Loading...</div>
                case 'success': return <DisplaySourceList pipelineList={props.pipelineList} />
                case 'error': return <div>Something appears to have gone wrong</div>
                default: return <div>Please click a status to retrieve a list of Sources</div>
            }
        }

        const DisplaySourceList = (props) => {
            return(
                <div>
                    {props.pipelineList.map((state,i)=>(
                    <Card key={i} className="margin-bottom-5 margin-right-5">
                        <CardBody>
                            <Row>
                                <Col xs="2">
                                    <CardImg className="source-pipleine-list-img" src={Configs.imageUrl + state.image + "." + state.imageFormatType} />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <CardTitle><b>Source Instance ID</b>: <a className="alt" href={"#deepLinkToSource"} onClick={()=>{this.sourceDeepLink("/data/sources/data?sourceInstanceId=" + state.sourceInstanceId)}}>{state.sourceInstanceId}</a></CardTitle>
                                        </Col>
                                        <Col>
                                            <div className="float-right">{state.sourcePipelineStatusId}</div>
                                        </Col>
                                    </Row>
                                    <div className="underline">Identifying Attributes</div>
                                    <Row>
                                        <Col>
                                            <OptionDisplay name={"Title"} value={state.title} />
                                            <OptionDisplay name={"Brand"} value={state.brand} />
                                        </Col>
                                        <Col>
                                            {state.keyAttributes.map((ka,i)=>(
                                            <OptionDisplay key={i} name={ka.name} value={ka.value} />
                                            ))}
                                        </Col>
                                    </Row>
                                    <ShowHideSourceInfo data={state} />
                                </Col>                                
                            </Row>
                        </CardBody>
                    </Card>
                    ))}
                </div>
            )
        }

        return(
            <Container fluid>
                <Row className="padding-top-0">
                    <div className="display-none">
                        <Col className="no-padding">
                            <DropDownIdentities />
                        </Col>
                        <Col>
                            <DropDownBrands />
                        </Col>
                    </div>
                </Row>
                <Row className="margin-top-20 margin-bottom-10">
                    {this.state.sourcePipelineStates.map((state,i)=>(
                    <Col key={i} className="no-padding margin-right-10 height-100">
                        <Card className={"height-100 source-pipeline-count " + state.active} onClick={() => this.selectPipelineState(state.id)}>
                            <CardBody className="source-pipeline-count-font">
                                <div><b>{state.name}</b></div>
                                <div>{state.value}</div>
                            </CardBody>
                        </Card>
                    </Col>
                    ))}
                </Row>
                <Fade in={this.state.showProcessingCounts} mountOnEnter={true} unmountOnExit={true}>     
                    <Row className="margin-bottom-10">
                        <div className="scrolling-row">
                            {this.state.processingCounts.map((state,i)=>(
                                <Col xs="2" key={i} className="no-padding margin-right-10 height-100">
                                    <Card className={"height-100 source-pipeline-count " + state.active} onClick = {() => this.selectPipelineStatus(state.id)}>
                                        <CardBody className="source-pipeline-count-font">
                                            <div><b>{state.name}</b></div>
                                            <div>{state.value}</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </div>
                    </Row>
                </Fade>
                <Row className={this.state.pageResult}>
                    <Col xs="12" className="margin-bottom-10 padding-left-0">
                        <span>
                            <Pagination className="margin-top-0 margin-bottom-0">
                                <Card className={"source-pipeline-count "} onClick={()=>this.loadNextPageOfResults(-1)}>
                                    <div className="source-pipeline-count-font padding">{"<"}</div>
                                </Card>
                                {this.state.pageArray.map((page,i)=>(
                                    <Card key={i} className={"source-pipeline-count " + page.active} onClick={()=>this.loadNextPageOfResults(page.page)}>
                                        <div className="source-pipeline-count-font padding">{page.page}</div>
                                    </Card>
                                ))}
                                <Card className={"source-pipeline-count "} onClick={()=>this.loadNextPageOfResults(-2)}>
                                    <div className="source-pipeline-count-font padding">{">"}</div>
                                </Card>
                            </Pagination>
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col className="no-padding">
                        <DisplaySourceListSwtich pipelineList={this.state.pipelineList} loadState={this.state.loadState} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(ViewPipeline);