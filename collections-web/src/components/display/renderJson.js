import React from 'react';
import ReactJson from 'react-json-view';

const RenderJson = (props) => {
    return(
        <div className="view-json">
            <ReactJson src={props.json} displayDataTypes={false}/>
        </div>
    )
}

export default RenderJson;