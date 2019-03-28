function getParameters(){
    var url = window.location.href;
    var urlParams = url.substring((url.indexOf("#")+1),url.length);
    var urlParamsArr = urlParams.split("&");
    var urlParamJson = [];
    
    for(var i = 0; i<urlParamsArr.length; i++){
        var exp = urlParamsArr[i];
        var keyValuePt = exp.indexOf("=");
        var key = exp.substring(0,keyValuePt);
        var value = exp.substring(keyValuePt + 1,url.length);
        urlParamJson[i] = {
            key : key,
            value : value
        }
    }
      
    return urlParamJson
}

export default getParameters;