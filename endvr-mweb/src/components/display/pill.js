import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Pill = (props) => {
    var isPrimary = '';
    if(props.isSecondary){
        isPrimary = ' secondary';
    }

    var text = props.text;
    if(props.isLink){
        text = <Link to={props.to}>{text}</Link>;
    }

    var className = '';
    if(props.className!==null){
        className = ' ' + props.className;
    }

    return(
        <div className = {'e-pill' + isPrimary + className}>
            {text}
        </div>
    )
}

export default withRouter(Pill);