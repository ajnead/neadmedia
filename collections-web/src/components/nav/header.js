import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import NavRoutes from './routes';
import Search from './search';
import SecondNav from './secondNav';
import NotificationPanel from '../notification/notificationPanel';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            routes : NavRoutes,
            url: "",
            notificationPanelOpen: false
        };

        this.current = this.current.bind(this);
        this.toggleNotificationPanel = this.toggleNotificationPanel.bind(this);
    }

    componentDidMount(){
        this.current();
        this.keyboardShortcuts();
    }

    componentDidUpdate(){
        var url = window.location.href;
        if(url!=this.state.url){
            this.current();
        }
    }

    toggleNotificationPanel(){
        this.setState({
            notificationPanelOpen: !this.state.notificationPanelOpen
        });
    }

    current(){
        var fullUrl = window.location.href;
        var url = fullUrl.substring(8,fullUrl.length);
        url = url.substring(url.indexOf("/")+1,url.length);
        var pathName = "/" + url.substring(0,url.indexOf("/"));
        var routes = this.state.routes;
        for(var i=0; i<routes.length; i++){
            var route = routes[i];
            var routePath = route.path;
            route.className="";
            if(pathName===routePath){
                route.className="current-main";
            }
        }

        this.setState({
            routes : routes,
            url: fullUrl
        })
    }

    keyboardShortcuts(){
        var Mousetrap = require('mousetrap');
        Mousetrap.bind('command p o',()=>{
            this.toggleNotificationPanel();
        
        });
    }

    render() {
        return (
            <header className="header">
                <Navbar light expand="md" className="nav-shadow" >
                    <Collapse isOpen={true} navbar>
                        <Nav pullright="true">
                        {this.state.routes.map((r) => 
                            <NavItem key={r.path + r.defaultPath} className="color-white">
                                <NavLink tag={Link} to={r.path + r.defaultPath} className={r.className}>{r.navName}</NavLink>
                            </NavItem>
                        )}
                        </Nav>
                    </Collapse>
                    <Search />
                </Navbar> 
                <Navbar expand="md" className="nav-shadow nav-second">
                    <Collapse isOpen={true} navbar>
                        <Route path="/*" component={SecondNav} />
                    </Collapse>
                    <div className="notification-toggle">
                        <div className = "notification-burger" onClick={this.toggleNotificationPanel}></div>
                    </div>
                </Navbar>
                <NotificationPanel isOpen={this.state.notificationPanelOpen} />
            </header>
        )
    }
}

export default Header