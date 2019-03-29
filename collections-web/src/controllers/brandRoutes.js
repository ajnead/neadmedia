import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';
import Delete from '../utilities/api/delete';

class BrandRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/brand/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }    

    getAllBrands(callback){
        const url = this._route + 'all/read?' + originTracer();
        const get = new Get('brandRoutes-getAllBrands',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getBrand(brandId,callback){
        const url = this._route + brandId + '/read?viewType=all&' + originTracer();
        const get = new Get('brandRoutes-getBrand',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getBrandHistories(brandId,callback){
        const url = this._route + 'history/' + brandId + '/read?viewType=all&' + originTracer();
        const get = new Get('brandRoutes-getBrandHistories',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putBrandToIndex(brandId){
        const url = this._route + brandId + '/index?' + originTracer();
        const put = new Put('brandRoutes-putBrandToIndex',url,null,null);
        put.execute();
    }

    putCaptureAndResizeLogo(brandId,callback){
        const url = this._route + 'run/' + brandId + '/captureAndResize?' + originTracer();
        const put = new Put('brandRoutes-putCaptureAndResizeLogo',url,null,()=>{
            this.returnParam = put;
            callback();
        });
        put.execute();
    }

    putBrandSynonym(synonym,brandId,callback){
        const url = this._route + 'synonym/' + brandId + '/' + synonym + '/insert?' + originTracer();
        const put = new Put('brandRoutes-putBrandSynonym',url,null,()=>{
            this.returnParam = put;
            callback();
        });
        put.execute();
    }

    deleteBrandSynonym(brandSynonymId,brandId,callback){
        const url = this._route + 'synonym/' + brandId + '/' + brandSynonymId + '/delete?' + originTracer();
        const del = new Delete('brandRoutes-deleteBrandSynonym',url,null,()=>{
            this.returnParam = del;
            callback();
        });
        del.execute();
    }

    putBrandCollectionNew(collectionJson,brandId,callback){
        const url = this._route + 'collection/' + brandId + '/0/write?' + originTracer();
        const put = new Put('brandRoutes-putBrandCollectionNew',url,collectionJson,()=>{
            this.returnParam = put;
            callback();
        });
        put.execute();
    }
}

export default BrandRoutes;