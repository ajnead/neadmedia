import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';

class FeedRoutes {

    constructor(){
        this._route = Configs.endvrApiUrl + 'feed/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getFeed(start,stop,type,feedId,callback){
        const url = this._route + start + '/' + stop + '/' + type + '/' + feedId + '?' + originTracer();
        const get = new Get('feedRoutes-getFeed',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();    
    }
}

export default FeedRoutes;