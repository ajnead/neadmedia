import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Post from '../utilities/api/post';

class IdentityRoutes {

    constructor(){
        this._route = Configs.endvrApiUrl + 'customer/identity';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    createIdentity(json,callback){
        const url = this._route + '/create?' + originTracer();
        const post = new Post('identityRoutes-createIdentity',url,json,()=>{
            this.returnParam = post;
            callback();
        });
        post.execute();    
    }
}

export default IdentityRoutes;