import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';
import Post from '../utilities/api/post';

class OfferRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/offer/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    putOfferToIndex(offerInstanceId,callback){
        const url = this._route + offerInstanceId + '/index?' + originTracer();
        const put = new Put('offerRoutes-putOfferToIndex',url,{},()=>{
            this.returnParam = put;
            callback();
        });
        put.execute();
    }

    postSearchOffers(json,callback){
        const url = this._route + 'ui/query?viewType=all&' + originTracer();
        const post = new Post('offerRoutes-postSearchOffers',url,json,()=>{
            this.returnParam = post;
            callback();
        });
        post.setShowMessageModal(false);
        post.execute();
    }
}

export default OfferRoutes;