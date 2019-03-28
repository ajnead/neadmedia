import React from 'react';
import ReactJson from 'react-json-view';

const PreviewJson = (props) => {
    return(
        <div className="view-json">
            <ReactJson src={props.json} displayDataTypes={false}/>
        </div>
    )
}

export default PreviewJson;