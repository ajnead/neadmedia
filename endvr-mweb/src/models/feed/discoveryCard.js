import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Configs from '../../configs/configs';
import ImageSlider from '../../components/images/imageSlider';

class DiscoveryCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            discovery: [
                {
                    "header" : "Made for AJ",
                    "subHeader": "Curated recommendations that update the more you shop",
                    "lists": [
                        {
                            "title": 'Running Shoes',
                            "link": "",
                            "asset": "icon-footware-running-1419787.svg"
                        },
                        {
                            "title": 'Smart Watches',
                            "link": "",
                            "asset": "icon-electronics-smart-watch-1249190.svg"
                        },
                        {
                            "title": 'Oxfords',
                            "link": "",
                            "asset": "icon-footware-oxford-1419795.svg"
                        }
                    ]
                },
                {
                    "header" : "For the Avid Runner",
                    "subHeader": "All the equipement and gear Runners love",
                    "lists": [
                        {
                            "title": 'Finish Line Gear',
                            "link": "",
                            "asset": "collection-cross-the-line-3509217.svg"
                        },
                        {
                            "title": 'Measuring Results',
                            "link": "",
                            "asset": "collection-measuring-results-3509233.svg"
                        },
                        {
                            "title": 'Storing Your Gear',
                            "link": "",
                            "asset": "collection-all-the-gear-3509228.svg"
                        }
                    ]
                }
            ]
        }
    }

    render(){
        return(
              <div className="card-holder">
                <Card className="border-0">
                    {this.state.discovery.map((lines,i)=>(
                        <div key={i}>
                            <CardBody>
                                <CardTitle className="font-weight-600 margin-bottom-0">{lines.header}</CardTitle>
                                <CardText className="font-h7 text-grey">{lines.subHeader}</CardText>
                            </CardBody>
                            <CardBody className="padding-top-0">
                                <ImageSlider imageClass={'icon-discovery-list'} assetUrl={Configs.iconAssetsUrl} images={lines.lists} fieldName={'asset'} />
                            </CardBody>
                        </div>
                    ))}
                </Card>
            </div>
        )
    }

}

export default DiscoveryCard;