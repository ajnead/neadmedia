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
                'Authorization': 'discover',
                'Content-Type': 'application/json'
            }
        }

        fetch(this._url, request)
        .then(response => response.json())
        .then(response => {
            this.metadata = response.metadata;
            this.payload = response.payload;
            
            if(this._callback!==undefined&&this._callback!==null){
                this._callback();
            }
        });
    }
}

export default Get;