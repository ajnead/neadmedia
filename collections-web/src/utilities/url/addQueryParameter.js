function addQueryParameter(parameter,value){
    const url = new URL(window.location.href);
    url.searchParams.set(parameter, value);
    window.history.pushState({}, null, url.href);
}

export default addQueryParameter;
