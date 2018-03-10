var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

const port = 80;
var tableName = "ec2-messages";

function save(record) {

    var newData = {};
    newData.subject = {
        'S': record.Subject
    };
    newData.message = {
        'S': record.Message
    };
    newData.date = {
        'S': new Date().getTime().toString()
    };
    newData.type = {
        'S': 'EC2'
    };
    console.log(newData);
    dynamodb.putItem({
        "TableName": tableName,
        "Item": newData
    }, function (err, data) {
        if (err) {
            console.log('error', 'putting item into dynamodb failed: ' + err);
        } else {
            console.log('great success: ' + JSON.stringify(data, null, '  '));
            //context.done('K THX BY');
        }
    });
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
