var AWS = require('aws-sdk');
var snsARN = require("./config.js");

AWS.config.update({
    region: 'us-east-1'
});

var sns = new AWS.SNS();

var cnd = true;
var totaltime = 10 * 60 * 1000; // ms
var maxmessages = 1000;
var delay = totaltime / maxmessages;

for (var cnt = 0; cnt < maxmessages; cnt++) {
    setTimeout(function (cnt) {
        console.log(cnt + "-----");
        var params = {
            Message: 'EC2-Run2',
            Subject: 'Subject-' + new Date().getTime().toString(),
            TopicArn: snsARN.ec2
        };

        sns.publish(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });
    }, delay * cnt, cnt);
}
