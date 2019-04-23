import PubSub from 'pubsub-js';
import PubSubMapper from '../mappers/pubSubMapper';

class Put {

    constructor(eventType,url,body,callback){
        this.url = url;
        this.eventType = eventType;
        this.callback = callback;
        this.body = body;
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

    set body(val){
        this._body = val;
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
            method: "PUT",
            headers: {
                'Authorization': 'discover',
                'Content-Type': 'application/json'
            }
        }

        const msg = new PubSubMapper(this._eventType,this._url);
        msg.setHttpRequestMethod("PUT");
        msg.setShowMessageModal(false);
        if(this._body!==undefined && this._body!==null) { 
            request.body = JSON.stringify(this._body)
            msg.setRequestBody(this._body);
        }


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

export default Put;