import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';
import Post from '../utilities/api/post';

class MicroserviceRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/microservice/';
        this._routeServices = Configs.collectionApiUrl + '/microservice/control/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getMsQuery(dataType,serviceKey,callback){
        var url = this._routeServices + dataType + '/' + serviceKey + '/query?' + originTracer();
        const get = new Get('microservice-queryRunning',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    postActiveMicroservices(callback){
        var url = this._routeServices + 'all?' + originTracer();
        const post = new Post('microservices-allRunning',url,{},()=>{
            this.returnParam = post;
            callback();
        });
        post.setShowMessageModal(false);
        post.execute();
    }

    postGroupMicroservices(groupFilters,callback){
        var url = this._routeServices + 'groups/all?' + originTracer();
        const post = new Post('microservices-groupsAll',url,groupFilters,()=>{
            this.returnParam = post;
            callback();
        });
        post.setShowMessageModal(false);
        post.execute();
    }

    getGroupMicroservicesStart(groupName,callback){
        var url = this._routeServices + 'groups/' + groupName + '/start?' + originTracer();
        const get = new Get('microservices-groupStart',url,()=>{
            callback();
        });
        get.setShowMessageModal(true);
        get.execute();
    }

    getGroupMicroservicesStop(groupName,callback){
        var url = this._routeServices + 'groups/' + groupName + '/stop?' + originTracer();
        const get = new Get('microservices-groupStop',url,()=>{
            callback();
        });
        get.setShowMessageModal(true);
        get.execute();
    }

    getStartStopMicroservice(action,dataType,serviceKey,callback){
        var url = this._routeServices + dataType + '/' + serviceKey + '/' + action + '?' + originTracer();
        const get = new Get('microservice-' + action,url,()=>{
            this.returnParam = get;
            callback();
        });
        get.setShowMessageModal(true);
        get.execute();
    }

    getMicroserviceConfigurations(callback){
        var url = this._route + 'all/read?' + originTracer();
        const get = new Get('microservice-all',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getMicroserviceConfigurationHistory(microserviceId,callback){
        var url = this._route + microserviceId + '/history/read?' + originTracer();
        const get = new Get('microservice-configHistory',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    postMicroserviceConfigurations(query,callback){
        var url = this._route + 'all/read?' + originTracer();
        const post = new Post('microservice-all',url,query,()=>{
            this.returnParam = post;
            callback();
        });
        post.setShowMessageModal(false);
        post.execute();
    }

    getMicroserviceDetails(microserviceId,callback){
        var url = this._route + microserviceId + '/read?' + originTracer();
        const get = new Get('microservice-config',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putMicroservice(microserviceId,body,callback){
        var url = this._route + microserviceId + '/write?' + originTracer()
        const put = new Put('microservice-edit',url,body,()=>{
            this.returnParam = put;
            if(callback!==undefined&&callback!==null){
                callback();
            }
        });
        put.execute();
    }

    getMicroserviceFilterMicroserviceGroup(callback){
        var url = this._route + 'filter/microserviceGroup?' + originTracer();
        const get = new Get('microservice-filterMicroserviceGroup',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getMicroserviceFilterName(callback){
        var url = this._route + 'filter/name?' + originTracer();
        const get = new Get('microservice-filterName',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getMicroserviceFilterServiceClass(callback){
        var url = this._route + 'filter/serviceClass?' + originTracer();
        const get = new Get('microservice-filterServiceClass',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }


}

export default MicroserviceRoutes;