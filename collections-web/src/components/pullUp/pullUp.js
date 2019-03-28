import React, { Component } from 'react';

class PullUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            open : false,
            toggle: "display-none",
            headerColor: "pullup-edit"
        }

        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    static getDerivedStateFromProps(props){  
        return{
            open: props.open
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.open!==this.props.open){
            this.toggle();
            
            var pullUpType = "pullup-edit";
            if(this.props.pullUpType==="view"){
                pullUpType = "pullup-view";
            }

            this.setState({
                headerColor: pullUpType
            })
        }
    }

    toggle(){
        var toggleCss = "display-none";
        if(this.state.open){
            toggleCss = "display-block";
        }

        this.setState({
            toggle: toggleCss
        })
    }

    close(){
        this.props.close();
    }

    render(){
        return(
            <div className = {"pullup " + this.state.toggle} id = "pullup">
                <div className = {"pullup-header " + this.state.headerColor}></div>
                <div className = "pullup-exit" onClick = {this.close}></div>
                <div className = "pullup-display" id = "pullupDisplay">
                    {this.props.component}
                </div>
            </div>
        )
    }
}

export default PullUp;