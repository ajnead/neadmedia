import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import Routes from '../components/navigation/routes';
import RelationshipRoutes from '../routes/relationshipRoutes';
import ParentSearchResult from '../models/discovery/parentSearchResult';

class DiscoveryContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            query: '',
            queryResults: []
        }

        this.changeValue = this.changeValue.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.getSearch = this.getSearch.bind(this);
    }

    componentDidMount(){
        this.getCollection("col-1-1");
    }

    changeValue(event,id){
        this.setState({
            [id]: event.target.value
        })
    }

    checkEnter(event){
        if(event.keyCode===13){
            this.getSearch();
        }
    }

    getSearch(){
        const protocolPrefix = "endvr/";
        const query = this.state.query;
        const endvrProtocolCheck = query.substring(0,protocolPrefix.length).toLowerCase();
        
        if(protocolPrefix===endvrProtocolCheck){
            const request = query.substring(protocolPrefix.length);
            this.endvrProtocol(request);
        }else{
            //normal search goes here
        }
    }

    endvrProtocol(request){
        var url = null;
        
        for(var route of Routes){
            const path = (route.path).substring(1).toLowerCase();
            if(path===request){
                url = route.path;
            }
        }

        if(url!==null){
            this.props.history.push(url);
        }
    }

    getCollection(collectionInstanceId){
        const relationshipRoutes = new RelationshipRoutes();
        relationshipRoutes.getCollection(collectionInstanceId,()=>{
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
            
            for(var k = min; k < max; k++){
                childArr.push(arr[k]);
            }
            
            newArr.push(
                <Row key={row} className="padding-0 margin-left-0 margin-right-0">
                    {childArr.map((r,i)=>(
                        <Col key={i} className="padding-0">
                            <ParentSearchResult parentInstanceId={r.childTypeInstanceId} />
                        </Col>
                    ))}
                </Row>
            );
        }

        this.setState({
            queryResults: newArr,
        })
    }

    render(){
        return(
            <div className="discovery-container">
                <div className="discovery-query">
                    <Input 
                        placeholder="Search" 
                        value={this.state.query} 
                        onChange={event=>this.changeValue(event,'query')}
                        onKeyDown={this.checkEnter} />
                </div>
                <div className="discovery-list">
                    {this.state.queryResults}
                </div>
            </div>
        )
    }
}

export default DiscoveryContainer;