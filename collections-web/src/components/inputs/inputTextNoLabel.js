import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const InputTextNoLabel = (props) => {
    return(
        <FormGroup>
            <Input 
                className={props.className} 
                type="text" 
                placeholder={props.placeholder} 
                value={props.value} 
                onChange={props.onChange} />
        </FormGroup>
    )
}

export default InputTextNoLabel;