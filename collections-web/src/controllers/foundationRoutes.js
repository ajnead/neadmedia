import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';

class FoundationRoutes {
    
    constructor(){
        this._route = Configs.collectionApiUrl + '/foundation/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }       

    getFoundation(foundationId,versionName,callback){
        var url = this._route + foundationId + '/read?viewType=all&version=' + versionName + '&' + originTracer();
        const get = new Get('foundation-foundation',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }
}

export default FoundationRoutes;