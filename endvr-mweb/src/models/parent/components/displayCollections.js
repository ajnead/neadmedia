import React from 'react';
import { CardBody, CardText } from 'reactstrap';
import Pill from '../../../components/display/pill';

class DisplayCollections extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: true
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        const ArrowToShow = (props) => {
            var className = props.isOpen ? 'icon-arrow-down' : 'icon-arrow-right';
            return <div className={'sku-modal-variant-show-bttn float-right ' + className} onClick={props.toggle}></div>
        }

        return(
            <CardBody>
                <CardText tag="h5">
                    <span>Collections</span> 
                    <ArrowToShow toggle={this.toggle} isOpen={this.state.isOpen} />
                </CardText>
                <div className="divider secondary"></div>
                <div className="margin-top-10">
                    <div className={this.state.isOpen ? 'display-block' : 'display-none'}>
                        <Pill text={'Top Running Shoes'} isLink={true} to={'/collections?collectionInstanceId=col-1-2'}></Pill>
                        <Pill text={'Nike Top 100'} isLink={true} to={'/collections?collectionInstanceId=col-2-1'} ></Pill>
                        <Pill text={'Top 1000 Shoes'} isLink={true} to={'/collections?collectionInstanceId=col-1-5'} ></Pill>
                        <Pill text={'My Favorites'} isLink={true} to={'/collections?collectionInstanceId=col-1-2'} isSecondary={true}></Pill>
                    </div>
                </div>
            </CardBody>
        )
    }
}

export default DisplayCollections;