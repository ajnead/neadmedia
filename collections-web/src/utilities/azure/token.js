class Token {

    getToken(){
        return localStorage.getItem('adal.idtoken');
    }

    getBearerToken(){
        return "Bearer " + localStorage.getItem('adal.idtoken');
    }
} 

export default Token;
