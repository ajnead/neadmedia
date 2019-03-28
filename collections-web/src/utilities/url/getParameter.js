function getParameter(jsonArr, key){
    var value = undefined;
    for(var j = 0; j<jsonArr.length; j++){
        var params = jsonArr[j];
        if(params.key==key){
            value = params.value;
            break
        }
    }
    return value;
}

export default getParameter;