import React from 'react';
import { InputGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            focused: false
        };

        this.changeValue = this.changeValue.bind(this);
        this.inputSearch = this.inputSearch.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    componentDidMount(){
        this.keyboardShortcuts();
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode===13){
            this.inputSearch();
        }
    }

    inputSearch(){
        const search = this.state.searchValue;
        const autoLookupCheck = search.substring(0,4);
        
        var url = null;
        switch(autoLookupCheck){
           case 'trc-' : url = '/system/trace?traceId=' + search; break;
           case 'src-' : url = '/data/sources/data?sourceInstanceId=' + search; break;
           case 'rrp-' : url = '/data/relationships/parent?parentInstanceId=' + search; break;
        }

        const protocolPrefix = "page:";
        const protocolCheck = search.substring(0,protocolPrefix.length).toLowerCase();
        
        if(protocolPrefix===protocolCheck){
            const request = search.substring(protocolPrefix.length);
            this.props.history.push(request);
        }else{
            if(url!==null){
                this.props.history.push(url);
                this.setState({
                    searchValue: ""
                })
            }
        }
    }

    keyboardShortcuts(){
        var Mousetrap = require('mousetrap');
        Mousetrap.bind('command+e',()=>{
            this.searchInput.focus();
        });
    }

    render() {
        return(
            <div className="search d-xs-none d-sm-none d-md-none d-lg-block">
                <InputGroup>
                    <input 
                        className="form-control"
                        ref={input => { this.searchInput = input; }} 
                        onKeyDown={this.checkEnter}
                        onChange={event => this.changeValue(event,"searchValue")}
                        value={this.state.searchValue} 
                        placeholder="Search Identifier" />
                </InputGroup>
            </div>
        )
    }
}

export default withRouter(Search);