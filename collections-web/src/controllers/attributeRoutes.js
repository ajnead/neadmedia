import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';
import Post from '../utilities/api/post';
import Delete from '../utilities/api/delete';

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
        const get = new Get('attributeRoutes-getUiAttributeNames',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getAllAttributes(versionName,callback){
        const url = this._route + 'all/read?viewType=all&version=' + versionName + '&' + originTracer();
        const get = new Get('attributeRoutes-getAllAttributes',url,()=>{
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
        const put = new Put('attributeRoutes-putAttribute',url,payload,()=>{
            this._returnParam = put;
            callback();
        })
        put.execute();
    }

    /**
     * attribute history methods
     */

    getAttributeHistory(attributeId,callback){
        const url = this._route + 'history/' + attributeId + '/read?' + originTracer();
        const get = new Get('attributeRoutes-getAttributeHistory',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    /**
     * attribute version methods
     */

    getAttributeVersions(callback){
        const url = this._route + 'version/all/read?' + originTracer();
        const get = new Get('attributeRoutes-getAttributeVersions',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getAttributeVersion(version,callback){
        const url = this._route + 'version/' + version + '/read?viewType=all&' + originTracer();
        const get = new Get('attributeRoutes-getAttributeVersion',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putAttributeVersion(version,callback){
        const url = this._route + 'version/' + version + '/index?' + originTracer();
        const put = new Put('attributeRoutes-putAttributeVersion',url,null,()=>{
            this._returnParam = put;
            callback();
        })
        put.execute();
    }

    /**
     * attribute version methods
     */

    postAttributeSynonym(json,callback){
        const url = this._route + 'synonym/create?' + originTracer();
        const post = new Post('attributeRoutes-postAttributeSynonym',url,json,()=>{
            this._returnParam = post;
            callback();
        })
        post.execute();
    }

    deleteAttributeSynonym(attributeSynonymId,callback){
        const url = this._route + 'synonym/' + attributeSynonymId + '/delete?' + originTracer();
        const del = new Delete('attributeRoutes-deleteAttributeSynonym',url,null,()=>{
            this._returnParam = del;
            callback();
        })
        del.execute();
    }
}

export default AttributeRoutes;