import PubSub from 'pubsub-js';
import PubSubMapper from '../mappers/pubSubMapper';

class Get {

    constructor(eventType,url,callback){
        this.url = url;
        this.eventType = eventType;
        this.callback = callback;
    }

    set url(val){
        this._url = val;
    }

    set eventType(val){
        this._eventType = val;
    }

    set callback(val){
        this._callback = val;
    }

    set metadata(val){
        this._metadata = val;
    }

    set payload(val){
        this._payload = val;
    }

    get metadata(){
        return this._metadata
    }

    get payload(){
        return this._payload
    }

    execute(){
        var request = {
            method: "GET",
            headers: {
                'Authorization': 'auth',
                'Content-Type': 'application/json'
            }
        }

        const msg = new PubSubMapper(this._eventType,this._url);
        msg.setHttpRequestMethod("GET");
        msg.setShowMessageModal(this._showMessageModal);

         fetch(this._url, request)
        .then(response => response.json())
        .then(response => {
            msg.setResponse(response);
            PubSub.publish('endvr-api-request-history', msg.mapper);
            this.metadata = response.metadata;
            this.payload = response.payload;
            
            if(this._callback!==undefined&&this._callback!==null){
                this._callback();
            }
        });
    }
}

export default Get;