import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const InputText = (props) => {

    var label = <span></span>;
    if(props.showLabel){
        label = <Label for={props.name} className={props.labelClassName}>{props.title}</Label>;
    }

    var type = "text";
    if(props.type!=="text"||props.type!==undefined||props.type!==null){
        type = props.type;
    }

    return(
        <FormGroup>
            {label}
            <Input 
                className={props.className}
                type={type}
                name={props.name} 
                id={props.name} 
                value={props.value} 
                placeholder={props.placeholder}
                onChange={props.onChange}/>
        </FormGroup>
    )
}

export default InputText;