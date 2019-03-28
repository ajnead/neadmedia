import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';

class TraceRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/trace/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getTrace(traceId,callback){
        var url = this._route + traceId + '/index?viewType=all&' + originTracer();
        const get = new Get('trace-details',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }
}

export default TraceRoutes;