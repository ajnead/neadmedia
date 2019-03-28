class PubSubMapper {

    constructor(eventType,requestUrl){
        this.eventType = eventType;
        this.pageUrl = window.location.href;
        this.requestUrl = requestUrl;
        this.showMessageModal = false;
    }

    setResponse(response){
        this.metadata = response.metadata;
        this.payload = response.payload;
        this.httpResponseCode = response.metadata.statusCode
    }

    setRequestBody(body){
        this.requestBody = body;
    }

    setHttpRequestMethod(method){
        this.httpRequestMethod = method;
    }

    setShowMessageModal(isActive){
        this._showMessageModal = isActive;
    } 

    set showMessageModal(val){
        this._showMessageModal = val;
    }

    set httpResponseCode(val){
        this._httpResponseCode = val;
    }

    set httpRequestMethod(val){
        this._httpRequestMethod = val;
    }

    set requestBody(val){
        this._requestBody = val;
    }

    set requestUrl(val){
        this._requestUrl = val;
    }

    set metadata(val){
        this._metadata = val;
    }

    set eventType(val){
        this._eventType = val;
    }

    set payload(val){
        this._payload = val;
    }

    set pageUrl(val){
        this._pageUrl = val;
    }

    get metadata() {
        return this.metadata;
    }

    get eventType() {
        return this.eventType;
    }

    get payload() {
        return this.payload;
    }

    get mapper(){
        return this.mapJson();
    }

    mapJson(){
        var json = {
            metadata: this._metadata,
            payload: this._payload,
            eventType: this._eventType,
            pageUrl: this._pageUrl,
            requestUrl: this._requestUrl,
            requestBody: this._requestBody,
            httpRequestMethod: this._httpRequestMethod,
            httpResponseCode: this._httpResponseCode,
            showMessageModal: this._showMessageModal
        }
        return json;
    }
}

export default PubSubMapper;