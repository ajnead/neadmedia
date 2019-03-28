import React from 'react';
import PopUp from '../../components/display/popup';

class AddBrandCollextion extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    toggle(){
        this.refs.popup.toggle();
    } 

    render(){
        return(
            <PopUp ref="popup" title={'Add Brand Collection'} />
        )
    }
}

export default AddBrandCollextion;