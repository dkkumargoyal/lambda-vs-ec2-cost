var algorithms = require('./sorting_algorithms');
var sort = new algorithms();
const port = 80;

function save(record) {

    var arr = [];

    for (var i = 0; i < 10000; i++) {
        arr[i] = randomIntInc(1, 100);
    }

    var tmpArr = arr.slice();

    console.time('bubble_sort');
    sort.bubble_sort(tmpArr);
    console.timeEnd('bubble_sort');
};


var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    if (req.method == 'POST') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            save(JSON.parse(jsonString));
        });
    }

    res.end();
}).listen(port);
