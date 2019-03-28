function HasValue(check){
    var hasValue = false;
    if(check!==undefined&&check!==null&&check!==""){
        hasValue = true;
    }
    return hasValue;
}

export default HasValue;