var sort = function () {}

sort.prototype.bubble_sort = function (arr) {
    for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }

    return arr;
};

function swap(arr, index1, index2) {
    var tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
}

sort.prototype.mergeSort = function (arr) {
    if (arr.length < 2) {
        return arr;
    }

    var left = arr.slice(0, arr.length / 2);
    var rigth = arr.slice(left.length, arr.length);

    return merge(this.mergeSort(left), this.mergeSort(rigth)); //One way of calling all together recursively

    //var tmpl = this.mergeSort(left); //Calling this way (step by step) I need to create two temp array
    //var tmpr = this.mergeSort(rigth);
    //return(merge(tmpl, tmpr));
};

function merge(left, rigth) {
    //console.log("Merge");
    var result = [];
    var il = 0;
    var ir = 0;

    while (il < left.length && ir < rigth.length) {
        if (left[il] <= rigth[ir]) {
            result.push(left[il]);
            il++;
        } else {
            result.push(rigth[ir]);
            ir++;
        }
    }

    //console.log(result.concat(left.slice(il)).concat(rigth.slice(ir)))
    return result.concat(left.slice(il)).concat(rigth.slice(ir));
}

//Iterative BinarySearch
sort.prototype.binarySearch = function (array, val) {
    var middle,
        left = 0,
        rigth = array.length - 1;

    while (left <= rigth) {
        middle = Math.floor((left + rigth) / 2);
        if (array[middle] === val)
            return middle;
        else if (array[middle] < val) {
            left = middle + 1;
        } else {
            rigth = middle - 1;
        }
    }

    return -1;
};

module.exports = sort;
