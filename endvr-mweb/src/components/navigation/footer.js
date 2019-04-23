import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Routes from './routes';

const Footer = () => {
    var pathName = window.location.pathname;
    var showBottomNav = true;

    for(var route of Routes){
        route.isActive="";
        if(route.path===pathName){
            route.isActive="active";
            showBottomNav = route.showBottomNav;
        }
    }

    if(showBottomNav){
        return (
            <div className="footer bg-primary">
                <Nav justified>
                {Routes.map((r,i) => {
                    if(r.isShown){
                        return(
                            <NavItem key={i} className={"footer-item font-h7"}>                    
                                <NavLink tag={Link} to={r.path} className={r.isActive}>
                                    <div className = {"footer-icon " + r.iconName + " " + r.isActive}></div>
                                    {r.navName}
                                </NavLink>
                            </NavItem>
                        )
                    }
                })}
                </Nav>
            </div>
        )
    }else{
        return( 
            <span></span>
        )
    }
}

export default Footer;