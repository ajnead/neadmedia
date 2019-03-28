import Configs from '../configs/configs';
import originTracer from '../utilities/api/originTracer';
import Get from '../utilities/api/get';
import Put from '../utilities/api/put';

class SourceRoutes {

    constructor(){
        this._route = Configs.collectionApiUrl + '/source/';
    }

    set returnParam(val){
        this._returnParam = val;
    }

    get returnParam(){
        return this._returnParam;
    }

    getSourceHistory(sourceInstanceId,callback){
        var url = this._route + sourceInstanceId + '/history/read?viewType=all&' + originTracer();
        const get = new Get('source-changeLog',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getPipelineHistory(sourceInstanceId,callback){
        var url = this._route + sourceInstanceId + '/pipeline/all?viewType=all&' + originTracer();
        const get = new Get('source-pipelinHistory',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    getSource(sourceInstanceId,callback){
        var url = this._route + sourceInstanceId + '/read?viewType=all&' + originTracer();
        const get = new Get('source-source',url,()=>{
            this.returnParam = get;
            callback();
        });
        get.execute();
    }

    putSourceToIndex(sourceInstanceId){
        var url = this._route + sourceInstanceId + '/index?' + originTracer();
        const put = new Put('source-index',url,null,null);
        put.execute();
    }

    getPipelineProcessSource(sourceInstanceId,pipelineSelection,callback){
        var url = this._route + sourceInstanceId + '/pipeline/' + pipelineSelection + '?&isPreview=false&' + originTracer();
        const get = new Get('source-processPipeline',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }

    getQueryPipelineCounts(callback){
        var url = this._route + 'query/pipelineCounts?' + originTracer();
        const get = new Get('source-queryPipelineCounts',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }

    getViewPipelineProcessingList(start,end,sourcePipelineStatusId,callback){
        var url = this._route + 'ui/viewPipeline/processingList/' + start+ '/' + end + '/' + sourcePipelineStatusId + '?' + originTracer();
        const get = new Get('source-uiViewPipelineList',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }

    getViewPipelineStateList(start,end,sourcePipelineState,callback){
        var url = this._route + 'ui/viewPipeline/stateList/' + start+ '/' + end + '/' + sourcePipelineState + '?' + originTracer();
        const get = new Get('source-uiViewPipelineList',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }
    
    getSourceMatching(sourceInstanceId,callback){
        var url = this._route + sourceInstanceId + '/matching/index?viewType=all&' + originTracer();
        const get = new Get('source-sourceMatching',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }

    getUiSourceAttributeStatuses(callback){
        var url = this._route + 'ui/sourceAttributeStatuses?' + originTracer();
        const get = new Get('source-uiSourceAttributeStatuses',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }

    getUiSourceAndSourceKey(sourceInstanceId,callback){
        var url = this._route + 'ui/' + sourceInstanceId + '/sourceAndSourceKey?viewType=all&' + originTracer();
        const get = new Get('source-uiSourceAndSourceKey',url,()=>{
            this.returnParam = get;
            callback();
        })
        get.execute();
    }
}

export default SourceRoutes;