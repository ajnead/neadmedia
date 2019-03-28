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

    sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}

export default ArrayHelpers;