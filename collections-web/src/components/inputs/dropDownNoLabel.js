import React from 'react';
import {FormGroup, Input} from 'reactstrap';

const DropDownNoLabel = (props) => {
    return(
        <FormGroup>
            <Input className={props.className} type="select" name="select" id={props.name} value={props.value} onChange={props.onChange}>
                {props.options.map((m,i) => (
                    <option key={i} value={m.id}> {m.value}</option>
                ))}
            </Input>
        </FormGroup>
    )
}

export default DropDownNoLabel;