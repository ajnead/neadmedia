import React from 'react';

class NonInput extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: '',
            showCopyMessage: 'display-none'
        }

        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    componentDidMount(){
        this.setState({
            value: this.props.value
        })
    }

    componentDidUpdate(){
        if(this.props.value!==this.state.value){
            this.setState({
                value: this.props.value
            })
        }
    }

    copyToClipboard(){
        const temp = document.createElement('textarea');
        temp.value = this.state.value;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);

        this.setState({
            showCopyMessage: 'display-block'
        })

        setTimeout(()=>{
            this.setState({
                showCopyMessage: 'display-none'
            })
        },2000)
    }

    render(){
        var addCopyStyle = {}
        if(this.props.copyButton){
            addCopyStyle = {
                'width': 'calc(100% - 50px)',
                'float': 'left'
            };
        }

        const DisplayCopyButton = () => {
            return(
                <div className="copy-button float-right">
                    <div className="icon-copy" onClick={this.copyToClipboard}></div>
                    <div className={this.state.showCopyMessage + " copy-message font-size-8 font-color-active"}>Copied</div>
                </div>
            )
        }

        return(
            <div className="non-input-group width-100 height-65">
                <div className="label bold">{this.props.title}</div>
                <div>
                    <div style={addCopyStyle} className="input-text-line non-input overflow-hidden">{this.state.value}</div>    
                    {this.props.copyButton ? <DisplayCopyButton /> : <span></span>}
                </div>
            </div>
        )
    }
}

export default NonInput;