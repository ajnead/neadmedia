import React from 'react';

class Modal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            open: 'close',
        }

        this.exit = this.exit.bind(this);
        this.open = this.open.bind(this);
    }

    open(){
        this.setState({
            open: 'open'
        })
    }

    exit(){
        this.setState({
            open: 'close'
        })
    }

    render(){
        return(
            <div class="e-modal-container">
                <div className = {"e-modal " + this.state.open}>
                    <div className = "e-modal-header">
                        <div className = "e-modal-exit float-right" onClick = {this.exit}></div>
                    </div>
                    <div className = "e-modal-display">
                        {'this.state.component'}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;