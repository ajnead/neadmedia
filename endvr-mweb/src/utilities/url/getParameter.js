function GetParameter(parameter){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

export default GetParameter;