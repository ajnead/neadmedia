import React from 'react';
import { Link } from 'react-router-dom';

const OptionDisplayList = (props) => {
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

    var values = [];
    var key = 0;
    for(var val of props.values){
        var classVerticalBreaks = " vertical-breaks";
        if(props.values.length===(key+1)){
            classVerticalBreaks = "";
        }

        var display = <span key={key} className={classNameValue + classVerticalBreaks}>{val}</span>;
        if(props.isLink){
            display = <span key={key} className={classNameValue + classVerticalBreaks}><Link className="alt" to={props.href + val}>{val}</Link></span>;    
        }

        values.push(display);
        key++;
    }

    return(
        <div className={classNameDerived}><span className="option-key">{props.name}:</span> {values}</div>
    )
}

export default OptionDisplayList