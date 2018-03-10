var AWS = require('aws-sdk');
var snsARN = require("./config.js");

AWS.config.update({
    region: 'us-east-1'
});

var sns = new AWS.SNS();

var cnd = true;
var totaltime = 10 * 60 * 1000; // ms
var maxmessages = 2000;
var delay = totaltime / maxmessages;

for (var cnt = 0; cnt < maxmessages; cnt++) {
    setTimeout(function (cnt) {
        console.log(cnt + "-----");
        var params = {
            Message: 'Lambda-Run3',
            Subject: 'Subject-' + new Date().getTime().toString(),
            TopicArn: snsARN.lambda
        };

        sns.publish(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });
    }, delay * cnt, cnt);
}
