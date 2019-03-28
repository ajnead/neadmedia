import React from 'react';
import { Row, Col } from 'reactstrap';
import OptionDisplay from '../../../components/cards/optionDisplay';

class ShowHideSourceInfo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collapsed: true,
            collapsedText: "expand",
            collapsedClassName: "display-none",
            data: {}
        }
        
        this.toggle = this.toggle.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            data: props.data
        }
    }

    toggle(){
        var collapsedText = "expand";
        var collapsedClassName = "display-none";
        if(this.state.collapsed){
            collapsedText = "collapse";
            collapsedClassName = "display-block";
        }

        this.setState({
            collapsed: !this.state.collapsed,
            collapsedClassName: collapsedClassName,
            collapsedText: collapsedText    
        })
    }

    render(){
        return(
            <div>
                <div><font className="underline">Source Info</font> [<a className="alt" href="#expand" onClick={this.toggle}>{this.state.collapsedText}</a>]</div>
                <div className={this.state.collapsedClassName}>
                    <Row>
                        <Col>
                            <OptionDisplay name={"Owner"} value={this.state.data.identityInstanceId} />         
                            <OptionDisplay name={"Create Date"} value={this.state.data.createDate} />         
                            <OptionDisplay name={"Source SKU"} value={this.state.data.sourceSku} />                                            
                        </Col>
                        <Col>
                            <OptionDisplay name={"Attribute Count"} value={this.state.data.attributeCount} />         
                            <OptionDisplay name={"Image Count"} value={this.state.data.imageCount} />         
                            <OptionDisplay name={"Container Count"} value={this.state.data.containerCount} />                                            
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ShowHideSourceInfo;