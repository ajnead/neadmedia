import React from 'react';
import { Link } from 'react-router-dom';

const OptionDisplay = (props) => {
    var classNameDerived = ""
    var classNameValue = "";
    if(props.verticalBreaks){
        classNameDerived = classNameDerived + " vertical-breaks" 
    }

    if(props.floatLeft){
        classNameDerived = classNameDerived + " float-left"
    }

    if(props.isError){
        classNameValue = "text-danger"
    }

    var display =  <span className={classNameValue}>{props.value}</span>;
    if(props.isLink){
        display = <span className={classNameValue}><Link className="alt" to={props.href}>{props.value}</Link></span>;    
    }

    return(
        <div className={classNameDerived}><span className="option-key">{props.name}:</span> {display}</div>
    )
}

export default OptionDisplay