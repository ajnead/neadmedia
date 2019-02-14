class ManageStorage {

    constructor(storageKey){
        this.storageKey = storageKey;
        this.maxHistory = 50
    }

    set storageKey(val){
        this._storageKey = val;
    }

    set maxHistory(val){
        this._maxHistory = val;
    }

    get storageKey(){
        return this._storageKey;
    }

    get maxHistory(){
        return this._maxHistory;
    }

    updateStorage(obj){
        var arr = this.getStorage();
        arr.push(obj);
        localStorage.setItem(this._storageKey, JSON.stringify(arr));
    }

    getStorage(){
        var arr = localStorage.getItem(this._storageKey);
        arr = JSON.parse(arr);
        if(arr===undefined||arr===null){ arr=[]; }

        if(arr.length===this._maxHistory){
            arr.splice(0,1);
        }

        return arr;
    }
}

export default ManageStorage;