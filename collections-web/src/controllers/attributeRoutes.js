import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';

class AttributeRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/attribute/';
        this._attributeListCacheKey = "attributeListCacheKey";
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }    

    get attributeListCacheKey(){
        return this._attributeListCacheKey;
    }

    getUiAttributeNames(versionName,callback){
        const url = this._route + 'ui/attributeNames/' + versionName + '?' + originTracer();
        const get = new Get('attribute-uiAttributeNames',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getAttributeHistory(attributeId,callback){
        const url = this._route + 'history/' + attributeId + '/read?' + originTracer();
        const get = new Get('attribute-history',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getUiAttributeNamesFromCache(versionName,callback){
        const checkStorage = localStorage.getItem(this._attributeListCacheKey + '-' + versionName);
        var executeCall = true;
        if(checkStorage!==null){
            this.returnParam = checkStorage;
            callback();
            executeCall = false;
        }
        
        if(executeCall){
            this.getUiAttributeNames(versionName,()=>{
                localStorage.setItem(this._attributeListCacheKey + '-' + versionName,JSON.stringify(this.returnParam),()=>{
                    this.returnParam = localStorage.getItem(this._attributeListCacheKey + '-' + versionName);
                    callback();
                });
            })
        }
    }

    putAttribute(attributeId,payload,callback){
        const url = this._route + attributeId + '/write?' + originTracer();
        const put = new Put('attribute-putAttribute',url,payload,()=>{
            this._returnParam = put;
            callback();
        })
        put.execute();
    }
}

export default AttributeRoutes;