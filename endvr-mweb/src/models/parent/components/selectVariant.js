import React from 'react';
import { Row, Col, Card, CardBody, CardText, CardImg } from 'reactstrap';
import Configs from '../../../configs/configs';

class SelectVariant extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            selected: '',
            variant: {}, 
            attributeId: 0,
            variantsPerRow: 4,
            variantRowsForDisplay: null,
            variantsOpen: true,
            selectedValueForDisplay: 'Choose an option'
        }

        this.toggle = this.toggle.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
    }

    toggle(){
        this.setState({
            variantsOpen: !this.state.variantsOpen
        })
    }

    changeSelected(selected){
        this.setState({
            selected: selected
        },()=>{
            this.loadVariant();
        })
    }

    componentDidMount(){
        this.setState({
            variant: this.props.variant,
            attributeId: this.props.attributeId,
            preferences: this.props.preferences
        },()=>{
            this.loadVariant();
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.preferences!==this.props.preferences){
            this.setState({
                preferences: nextProps.preferences
            },()=>{
                if(this.state.attributeId>0){
                    this.loadVariant();
                }   
            })
        }
    }

    loadVariant(){
        const variantsValues = this.state.variant.parentAttributeValues;
        
        var variantRowsForDisplay = [];
        if(variantsValues!==null&&variantsValues!==undefined){
            const numOfValues = variantsValues.length;  
            var valuesPerRow = this.state.variantsPerRow;
            const numOfRows = Math.ceil(numOfValues / valuesPerRow);
            const colGrid = Math.floor(12 / valuesPerRow);

            //preferences lookup to set default variant selected
            //TODO: the selection of preferences need to be confirm will work accross units
            //TODO: refactor this to make this more precise to preferences
            var selected = this.state.selected;
            for(var value of variantsValues){
                const preferences = this.state.preferences;
                if(preferences!==null){
                    for(const preference of preferences){
                        if(this.state.attributeId===preference.attributeId){
                            if(preference.imageHash===value.imageHash||preference.attributeValue===value.attributeValue){
                                selected = value.parentAttributeValueId;
                                
                                this.setState({
                                    preferences: null,
                                    selected: value.parentAttributeValueId
                                });
                            }
                        }
                    }
                }

                if(selected===value.parentAttributeValueId){
                    this.setState({
                        selectedValueForDisplay: value.attributeValue
                    })
                }
            }

            //builld the variant display
            var variantRowsForDisplay = [];
            for(var r = 0; r < numOfRows; r++){
                var variantsForThisRow = [];
                var min = r * valuesPerRow;
                var max = (min + valuesPerRow);

                if(max>numOfValues){
                    max=numOfValues;
                }
            
                for(var l = min; l < max; l++){                    
                    variantsValues[l].active = '';
                    if(selected===variantsValues[l].parentAttributeValueId){
                        variantsValues[l].active = 'active';
                        
                        if(this.state.variant.requiresPageReload){
                            this.props.onVariantChange(null,variantsValues[l].imageHash,variantsValues[l].formatType);
                        }
                    }

                    variantsForThisRow.push(variantsValues[l]);
                }

                variantRowsForDisplay.push(
                    <Row key={r} className="margin-top-10 padding-0 margin-left-0 margin-right-0">
                        {variantsForThisRow.map((val,i)=>(
                            <Col key={i} xs={colGrid} className="padding-left-0">
                                <Card className={"card-button " + val.active}>
                                    {this.state.variant.loadSwatch || this.state.variant.loadThumbnail ? 
                                        (
                                            <CardBody className={'card-button-font'} onClick={()=>this.changeSelected(val.parentAttributeValueId)}>
                                                <CardImg top width="100%" src={Configs.collectionsImagesUrl + val.imageHash + ".150." + val.formatType} alt="No image" />
                                            </CardBody>
                                        ) 
                                        :(
                                            <CardBody className="card-button-font" onClick={()=>this.changeSelected(val.parentAttributeValueId)}>
                                                {val.attributeValue}
                                            </CardBody>
                                        )
                                    }                                
                                </Card>
                            </Col>
                        ))}
                    </Row>
                );
            }
        }

        this.setState({
            variantRowsForDisplay: variantRowsForDisplay
        })
    }

    getVariantSelected(){
        return this.state.selected;
    }

    render(){
        const ArrowToShow = (props) => {
            var className = props.variantsOpen ? 'icon-arrow-down' : 'icon-arrow-right';
            return <div className={'sku-modal-variant-show-bttn float-right ' + className} onClick={props.toggle}></div>
        }

        return(
            <CardBody>
                <CardText tag="h5">{this.state.variant.attributeName} <ArrowToShow toggle={this.toggle} variantsOpen={this.state.variantsOpen} /></CardText>
                <div className="divider secondary"></div>
                <div className={this.state.variantsOpen ? 'display-block' : 'display-none'}>
                    {this.state.variantRowsForDisplay!==null ? this.state.variantRowsForDisplay  : <CardText className="margin-top-10 font-h7">Loading...</CardText>}
                </div>
                <div className={!this.state.variantsOpen ? 'display-block' : 'display-none'}>
                    <CardText className="margin-top-10 font-h7">{this.state.selectedValueForDisplay}</CardText>
                </div>
            </CardBody>
        )
    }
}

export default SelectVariant;