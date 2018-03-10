var algorithms = require('./sorting_algorithms');
var sort = new algorithms();

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.handler = function (event, context) {
    var arr = []; //4, 5, 2, 7, 10, 1, 3, 6, 9, 8];

    for (var i = 0; i < 10000; i++) {
        arr[i] = randomIntInc(1, 100);
    }

    var tmpArr = arr.slice();

    console.time('bubble_sort');
    sort.bubble_sort(tmpArr);
    console.timeEnd('bubble_sort');

    context.done();
};
