import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';

class RelationshipRoutes {

    constructor(){
        this._routeParent = Configs.endvrApiUrl + 'relationship/parent/';
        this._routeCollection = Configs.endvrApiUrl + 'relationship/collection/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getParent(parentInstanceId,callback){
        const url = this._routeParent + parentInstanceId + '?' + originTracer();
        const get = new Get('relationshipRoutes-getParent',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();    
    }

    getCollection(collectionInstanceId,callback){
        const url = this._routeCollection + collectionInstanceId + '?' + originTracer();
        const get = new Get('relationshipRoutes-getCollection',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();    
    }
}

export default RelationshipRoutes;