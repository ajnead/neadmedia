import React from 'react';
import {
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import NavRoutes from "./routes";
import { Link } from 'react-router-dom';

class SecondNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: { navName : "", path : "", children : [ { className : "" } ] },
            url: ""
        };

        this.current = this.current.bind(this);
    }

    componentDidMount() {
        this.current();
    }

    componentDidUpdate(){
        const url = this.props.location.pathname;
        if(url!==this.state.url){
            this.current();
        }
    }

    current(){
        var component = this;
        NavRoutes.map(function(r,index){
            //parse first of path to determine first nav
            var url = component.props.location.pathname;
            var pathName = url.substring(1,url.length);
            pathName = "/" + pathName.substring(0,pathName.indexOf("/"));
            //parse second part of path to determine second nav
            var secondPathName = url.substring(pathName.indexOf("/")+1,url.length);
            secondPathName = secondPathName.substring(secondPathName.indexOf("/")+1,secondPathName.length);
            if(secondPathName.indexOf("/")>0){
                secondPathName = secondPathName.substring(0,secondPathName.indexOf("/"));
            }
            secondPathName="/"+secondPathName;
            if(r.path===pathName){
                for(var i=0; i< r.children.length; i++){
                    var child = r.children[i];
                    var childPath = child.path;
                    child.className = "";
                    if(childPath===secondPathName){
                        child.className = "current";
                    }
                }

                component.setState({
                    data : r,
                    url : url
                });
            } 
            return null;
        });
    }

    render() { 
        return (
            <Nav pullright="true">
            {this.state.data.children.map((c) => 
                <NavItem key={this.state.data.path + c.path}>
                    <NavLink tag={Link} to={this.state.data.path + c.path + c.defaultPath} className={c.className}>{c.navName}</NavLink>
                </NavItem> 
            )}
            </Nav>
        )
    }
}

export default SecondNav;