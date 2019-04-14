import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';

class CrawlerRoutes {
    
    constructor(){
        this._route = Configs.collectionApiUrl + '/crawler/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    } 

    getCrawler(crawlerInstanceId,callback){
        const url = this._route  + crawlerInstanceId + '/read?viewType=all&' + originTracer();
        const get = new Get('crawlerRoutes-getCrawler',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getAllCrawler(callback){
        const url = this._route  + 'all/read?' + originTracer();
        const get = new Get('crawlerRoutes-getAllCrawler',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getCrawlerHistory(crawlerInstanceId,callback){
        const url = this._route  + 'history/' + crawlerInstanceId + '/read?viewType=all&' + originTracer();
        const get = new Get('crawlerRoutes-getCrawlerHistory',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }
}

export default CrawlerRoutes;