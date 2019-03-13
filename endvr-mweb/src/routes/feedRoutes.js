import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';

class FeedRoutes {

    constructor(){
        this._route = Configs.endvrApiUrl + 'discovery/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getFeed(start,stop,pageSize,callback){
        const url = this._route + start + '/' + stop + '/' + pageSize + '?' + originTracer();
        const get = new Get('feedRoutes-getDiscoveryHomd',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();    
    }
}

export default FeedRoutes;