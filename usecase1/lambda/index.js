console.log('Loading event');

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

exports.handler = function (event, context, callback) {

    var tableName = "lambda-messages";
    var records = event.Records;

    for (var i = 0; i < records.length; i++) {
        var newData = {};
        newData.subject = {
            'S': records[i].Sns.Subject
        };
        newData.message = {
            'S': records[i].Sns.Message
        };
        newData.date = {
            'S': records[i].Sns.Subject
        };
        newData.type = {
            'S': 'Lambda'
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
    }

    callback(null, 'Done');
};
