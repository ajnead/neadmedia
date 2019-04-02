import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';

class RelationshipRoutes {

    constructor(){
        this._routeParent = Configs.collectionApiUrl + '/relationship/parent/';
        this._routeUI = Configs.collectionApiUrl + '/relationship/ui/';
        this._routeCollection = Configs.collectionApiUrl + '/relationship/collection/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    /**
     * methods to control the parent access model 
     */

    getParent(parentInstanceId,callback){
        var url = this._routeParent + parentInstanceId + '/index?viewType=all&' + originTracer();
        const get = new Get('parent-getParent',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putParentToIndex(parentInstanceId){
        var url = this._routeParent + parentInstanceId + '/index?' + originTracer();
        const put = new Put('parent-putParentToIndex',url,null,null);
        put.execute();
    }

    /**
     * methods to control the parent access model 
     */

    getCollection(collectionInstanceId,callback){
        var url = this._routeCollection + collectionInstanceId + '/index?viewType=all&' + originTracer();
        const get = new Get('collection-getCollection',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.setShowMessageModal(false);
        get.execute();
    }

    putCollectionToIndex(collectionInstanceId){
        var url = this._routeCollection + collectionInstanceId + '/index?' + originTracer();
        const put = new Put('collection-putCollectionToIndex',url,null,null);
        put.execute();
    }

    /**
     * methods that retrieve read only data required for the collection-ui 
     */

    getUiRelationshipsBySkuInstanceId(skuInstanceId,callback){
        var url = this._routeUI + 'relationshipsBySkuInstanceId/' + skuInstanceId + '/query?viewType=all&' + originTracer();
        const get = new Get('relationshipUI-getUiRelationshipsBySkuInstanceId',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.setShowMessageModal(false);
        get.execute();
    }

    getUiCollectionsByParentInstanceId(parentInstanceId,callback){
        var url = this._routeUI + 'collectionsByParentInstanceId/' + parentInstanceId + '/query?viewType=all&' + originTracer();
        const get = new Get('relationshipUI-getUiCollectionsByParentInstanceId',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }
}

export default RelationshipRoutes;