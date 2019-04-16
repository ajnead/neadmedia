import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const InputText = (props) => {
    return(
        <FormGroup>
            <Label for={props.name} className={props.labelClassName}>{props.title}</Label>
            <Input 
                className={props.className}
                type="text" 
                name={props.name} 
                id={props.name} 
                value={props.value} 
                onChange={props.onChange}/>
        </FormGroup>
    )
}

export default InputText;