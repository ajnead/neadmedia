import React, { Component } from 'react';

class ModalPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: "display-none",
            headerColor: "pullup-edit"
        }

        this.open = this.open.bind(this);
        this.exit = this.exit.bind(this);
    }

    open(){
        var pullUpType = "pullup-edit";
        if(this.props.pullUpType==="view"){
            pullUpType = "pullup-view";
        }

        this.setState({
            headerColor: pullUpType,
            open: 'display-block'
        })
    }

    exit(){
        this.setState({
            open: 'display-none'
        })
    }


    render(){
        return(
            <div className = {"pullup " + this.state.open}>
                <div className = {"pullup-header " + this.state.headerColor}></div>
                <div className = "pullup-exit" onClick = {this.exit}></div>
                <div className = "pullup-display" id = "pullupDisplay">
                    {this.props.component}
                </div>
            </div>
        )
    }
}

export default ModalPage;