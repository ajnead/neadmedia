class ArrayHelpers {

    reversed(arr){
        var len = arr.length;
        var reversed = [];
        for(var l=(len -1); l>0; l--){
            var obj = arr[l];
            reversed.push(obj);
        }
        return reversed;
    }
}
export default ArrayHelpers;