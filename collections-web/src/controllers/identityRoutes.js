import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';
import Post from '../utilities/api/post';

class IdentityRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/identity/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    /**
     * Method to refresh the identity to search index
     * @param {*} identityInstanceId 
     * @param {*} callback 
     */

    putIdentityToIndex(identityInstanceId,callback){
        const url = this._route + identityInstanceId + '/index?' + originTracer();
        const put = new Put('identityRoutes-putIdentityToIndex',url,{},()=>{
            this.returnParam = put;
            callback();
        });
        put.execute();
    }

    /**
     * Method to search for identities based on identityInstanceId, identityClassId, and primaryEmail
     * @param {*} json 
     * @param {*} callback 
     */

    postSearchIdentity(json,callback){
        const url = this._route + 'ui/query/list?viewType=all&' + originTracer();
        const post = new Post('identityRoutes-postSearchIdentity',url,json,()=>{
            this.returnParam = post;
            callback();
        });
        post.setShowMessageModal(false);
        post.execute();
    }

    /**
     * get the history for an identity
     * @param {*} identityInstanceId 
     * @param {*} callback 
     */

    getIdentityHistory(identityInstanceId,callback){
        const url = this._route + 'history/' + identityInstanceId + '/read?viewType=all&' + originTracer();
        const get = new Get('identityRoutes-getIdentityHistory',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }
}

export default IdentityRoutes;