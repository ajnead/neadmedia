import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';

class RelationshipRoutes {

    constructor(){
        this._routeParent = Configs.collectionApiUrl + '/relationship/parent/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getParent(parentInstanceId,callback){
        var url = this._routeParent + parentInstanceId + '/index?viewType=all&' + originTracer();
        const get = new Get('parent-details',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putParentToIndex(parentInstanceId){
        var url = this._routeParent + parentInstanceId + '/index?' + originTracer();
        const put = new Put('parent-index',url,null,null);
        put.execute();
    }
}

export default RelationshipRoutes;