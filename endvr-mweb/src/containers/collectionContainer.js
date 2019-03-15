import React from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import RelationshipRoutes from '../routes/relationshipRoutes';
import ParentSearchResult from '../models/discovery/parentSearchResult';
import GetParameter from '../utilities/url/getParameter';

class CollectionContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collectionInstanceId: '',
            queryResults: [],
            collectionOptions: [
                {
                    "collectionName": "Nike Flyknit",
                    "imageUrl": "",
                    "collectionInstanceId": "col-1-2"
                },
                {
                    "collectionName": "Nike React",
                    "imageUrl": "",
                    "collectionInstanceId": "col-2-1"
                },
                {
                    "collectionName": "Air Jordan",
                    "imageUrl": "",
                    "collectionInstanceId": "col-1-5"
                },
                {
                    "collectionName": "Nike Odessey",
                    "imageUrl": "",
                    "collectionInstanceId": "col-2-1"
                },
                {
                    "collectionName": "Air Max",
                    "imageUrl": "",
                    "collectionInstanceId": "col-1-2"
                }

            ]
        }

        this.changeCollection = this.changeCollection.bind(this);
    }

    componentDidMount(){
        setInterval(() => {
            var collectionInstanceId = GetParameter("collectionInstanceId");
            if(collectionInstanceId!==undefined&&collectionInstanceId!=null&&collectionInstanceId.length>3){
                if(this.state.collectionInstanceId!==collectionInstanceId){
                    this.setState({
                        collectionInstanceId: collectionInstanceId
                    },()=>{
                        this.getCollection();
                    })
                }
            }
        }, 100);
    }

    changeCollection(collectionInstanceId){
        const url = "?collectionInstanceId=" + collectionInstanceId;
        this.props.history.push(url);
    }

    getCollection(){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getCollection(this.state.collectionInstanceId,()=>{
            const response = relationshipRoutes.returnParam;
            const status = response.metadata.status;

            if(status==="success"){
                this.breakArrayIntoManyArrays(response.payload.collectionChildren,2);
                this.setState({
                    query: response.payload.collectionName
                })
            }
        });
    }

    breakArrayIntoManyArrays(arr,countObjPerChildArray){
        var rows = Math.ceil(arr.length / countObjPerChildArray);
        var newArr = [];
        for(var row = 0; row < rows; row++){
            var childArr = [];    
            var min = row * countObjPerChildArray;
            var max = (min + countObjPerChildArray);

            if(max>arr.length){
                max=arr.length;
            }
        
            for(var k = min; k < max; k++){
                childArr.push(arr[k]);
            }

            newArr.push(childArr);
        }

        this.setState({
            queryResults: newArr,
        })
    }

    render(){
        return(
            <div className="collection-container">
                <div className="collection-header-bg-image">
                    <img src = "/nike.svg" />
                </div>
                <div className="collection-other-options">
                    <div className="padding-left-15">
                        <span className="font-h9 font-weight-600">Similiar Collections</span>
                    </div>
                    <Row noGutters>
                        <div className="scrolling-wrapper">
                            {this.state.collectionOptions.map((opt,i)=>(
                                <Col key={i} className="padding-top-5  margin-bottom-5" onClick={()=>this.changeCollection(opt.collectionInstanceId)}>
                                    <div>
                                        <div className="collection-icon-scrolling">
                                            <img src = "/nike.svg" />
                                        </div>
                                    </div>
                                    <div className="width-100 text-align-center">
                                        <div className="font-h9">{opt.collectionName}</div>
                                    </div>
                                </Col>
                            ))}
                        </div>
                    </Row>
                </div>
                <div className="discovery-list">
                    {this.state.queryResults.map((childArr,row)=>(
                        <Row key={row} className="padding-0 margin-left-0 margin-right-0">
                            {childArr.map((r,i)=>(
                                <Col key={i} className="padding-0">
                                    <ParentSearchResult parentInstanceId={r.childTypeInstanceId} />
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
            </div>
        )
    }
}

export default withRouter(CollectionContainer);