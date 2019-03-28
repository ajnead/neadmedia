import React from 'react';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import DropDown from '../../../components/inputs/dropDown';
import SourceRoutes from '../../../controllers/sourceRoutes';

class ProcessPipeline extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            sourceInstanceId: null,
            pipelineOptions: [
                {
                    value: "Initial Classification",
                    id: "initialClassification"
                },
                {
                    value: "Normalize",
                    id: "normalize"
                },
                {
                    value: "Extraction",
                    id: "extraction"
                },
                {
                    value: "Image Capture",
                    id: "imageCapture"
                },
                {
                    value: "Image Processing",
                    id: "imageProcess"
                },
                {
                    value: "Image Crop",
                    id: "imageCropForFeed"
                },
                {
                    value: "Image Thumbnail",
                    id: "imageThumbnail"
                },
                {
                    value: "Check Containers",
                    id: "containerCheck"
                },
                {
                    value: "Final Classification",
                    id: "finalClassification"
                },
                {
                    value: "Validate",
                    id: "validate"
                },
                {
                    value: "Match",
                    id: "match"
                },
                {
                    value: "Set Attribute Priority",
                    id: "setPriority"
                },
                {
                    value: "Synchronously Run Pipeline",
                    id: "syncRunPipeline"
                },
            ],
            pipelineSelection: "normalize",
            loadState: 'waitingQuery'
        }

        this.changeValue = this.changeValue.bind(this);
        this.processPipeline = this.processPipeline.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            sourceInstanceId: props.sourceInstanceId
        }
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    processPipeline(){
        this.setState({
            loadState: 'waitingResult'
        })

        const sourceRoutes = new SourceRoutes();
        sourceRoutes.getPipelineProcessSource(this.state.sourceInstanceId,this.state.pipelineSelection,()=>{
            var response = sourceRoutes.returnParam;
            var status = response.metadata.status;

            if(status==="success"){
                this.setState({
                    loadState: 'success'
                });   
            }else{
                this.setState({
                    loadState: 'error'
                });   
            }
        });
    }

    render(){
        const SubmitButton = (props) => {
            if(props.loadState==='waitingResult'){
                return(
                    <Button 
                        className="bg-color-disabled no-border margin-top-33" 
                        block
                        disabled
                        onClick={this.processPipeline}
                    >Reprocess Source</Button>
                )
            }else{
                return(
                    <Button 
                        className="bg-color-second no-border margin-top-33" 
                        block
                        onClick={this.processPipeline}
                    >Reprocess Source</Button>
                )
            }
        }

        const ProcessingMessage = (props) => {
            switch(props.loadState){
                case 'waitingResult' : return <div>Loading...</div>
                case 'success' : return <div>Completed Successfully</div>
                case 'error' : return <div>An error has occurred, please check action log for more information</div>
                default: return <div>To reprocess this source in the item pipeline select a pipeline service that the source should start at</div>
            }
        }

        return(
            <Row className="margin-top-20">
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                    <DropDown 
                                        title="Reprocess source in item pipeline"
                                        name="pipelineSelection" 
                                        value={this.state.pipelineSelection} 
                                        options={this.state.pipelineOptions} 
                                        onChange={event => this.changeValue(event,"pipelineSelection")} 
                                    />
                                </Col>    
                                <Col xs="3">
                                    <SubmitButton loadState={this.state.loadState} />
                                </Col>
                            </Row>   
                            <Row>
                                <Col>
                                    <ProcessingMessage loadState={this.state.loadState} />
                                </Col>
                            </Row> 
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ProcessPipeline;