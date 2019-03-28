import React from 'react';
import { NavLink, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const ThirdNavLinks = (props) => {
    var pathName = window.location.pathname;
    var isActive="";
    if(pathName===props.item.to){
        isActive="active";
    }

    var parameter="";
    if(props.parameter!==undefined&&props.parameter!==null){
        parameter = props.parameter;
    }
    
    return (
        <NavItem>
            <NavLink tag={Link} to={props.item.to + parameter} className={isActive}>
                {props.item.name}
            </NavLink>
        </NavItem>
    );
};

export default ThirdNavLinks;