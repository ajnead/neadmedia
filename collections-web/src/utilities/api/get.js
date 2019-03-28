import PubSub from 'pubsub-js';
import PubSubMapper from '../mappers/pubSubMapper';
import Token  from '../azure/token';

class Get {

    constructor(eventType,url,callback){
        this.url = url;
        this.eventType = eventType;
        this.callback = callback;
        this.showMessageModal = false;
    }

    setShowMessageModal(isActive){
        this.showMessageModal = isActive;
    }

    set showMessageModal(val){
        this._showMessageModal = val;
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
        const token = new Token();

        const request = {
            method: "GET",
            headers: {
                'Authorization': token.getBearerToken(),
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
            PubSub.publish('notification-badge', msg.mapper);
            this.metadata = response.metadata;
            this.payload = response.payload;
            
            if(this._callback!==undefined&&this._callback!==null){
                this._callback();
            }
        });
    }
}

export default Get;