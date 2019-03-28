import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

const DropDown = (props) => {
    return(
        <FormGroup>
            <Label for={props.name} className={props.labelClassName}>{props.title}</Label>
            <Input className={props.className} type="select" name="select" id={props.name} value={props.value} onChange={props.onChange}>
                {props.options.map((m,i) => (
                    <option key={i} value={m.id}> {m.value}</option>
                ))}
            </Input>
        </FormGroup>
    )
}

export default DropDown;