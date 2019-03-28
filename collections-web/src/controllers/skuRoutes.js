import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';

class SkuRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/sku/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getSku(skuInstanceId,callback){
        var url = this._route + skuInstanceId + '/read?viewType=all&' + originTracer();
        const get = new Get('sku-details',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getSkuHistory(skuInstanceId,callback){
        var url = this._route + skuInstanceId + '/history/read?viewType=all&' + originTracer();
        const get = new Get('sku-history',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putSkuToIndex(skuInstanceId){
        var url = this._route + skuInstanceId + '/index?' + originTracer();
        const put = new Put('sku-index',url,null,null);
        put.setShowMessageModal(true);
        put.execute();
    }
}

export default SkuRoutes;