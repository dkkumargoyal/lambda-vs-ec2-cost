var AWS = require('aws-sdk');

// dependencies
var async = require('async');
var path = require('path');
var AWS = require('aws-sdk');
var gm = require('gm').subClass({
    imageMagick: true
});
var util = require('util');


var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

var s3Config = require("./config.js");

exports.handler = function (event, context, callback) {

    var records = event.Records;

    save(records[0]);

    callback(null, 'Done');
};


// get reference to S3 client
var s3 = new AWS.S3();

function save(record) {

    var srcBucket = s3Config.source;
    var dstBucket = s3Config.destination;
    var fileName = s3Config.fileKey;

    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey = decodeURIComponent(fileName.replace(
        /\+/g, " "));

    // Sanity check: validate that source and destination are different buckets.
    if (srcBucket == dstBucket) {
        console.error("Destination bucket must not match source bucket.");
        return;
    }

    var _45px = {
        width: 45,
        dstnKey: srcKey,
        destinationPath: "thumbnail"
    };
    var _sizesArray = [_45px];

    var len = _sizesArray.length;
    // Infer the image type.
    var typeMatch = srcKey.match(/\.([^.]*)$/);
    var fileName = path.basename(srcKey);
    if (!typeMatch) {
        console.error('unable to infer image type for key ' + srcKey);
        return;
    }
    var imageType = typeMatch[1].toLowerCase();
    if (imageType != "jpg" && imageType != "gif" && imageType != "png" &&
        imageType != "eps") {
        console.log('skipping non-image ' + srcKey);
        return;
    }
    // Transform, and upload to same S3 bucket but to a different S3 bucket.
    async.forEachOf(_sizesArray, function (value, key, callback) {
        async.waterfall([

            function download(next) {
                // Download the image from S3 into a buffer.
                // sadly it downloads the image several times, but we couldn't place it outside
                // the variable was not recognized
                s3.getObject({
                    Bucket: srcBucket,
                    Key: srcKey
                }, next);
            },
            function convert(response, next) {
                // convert eps images to png
                gm(response.Body).antialias(true).density(
                    300).toBuffer('JPG', function (err,
                    buffer) {
                    if (err) {
                        //next(err);
                        next(err);
                    } else {
                        next(null, buffer);
                        //next(null, 'done');
                    }
                });
            },
            function process(response, next) {
                // Transform the image buffer in memory.
                //gm(response.Body).size(function(err, size) {
                gm(response).size(function (err, size) {
                    var scalingFactor = Math.min(
                        _sizesArray[key].width /
                        size.width, _sizesArray[
                            key].width / size.height
                    );
                    var width = scalingFactor *
                        size.width;
                    var height = scalingFactor *
                        size.height;
                    var index = key;
                    //this.resize({width: width, height: height, format: 'jpg',})
                    this.resize(width, height).toBuffer(
                        'JPG',
                        function (err,
                            buffer) {
                            if (err) {
                                //next(err);
                                next(err);
                            } else {
                                next(null,
                                    buffer,
                                    key);
                                //next(null, 'done');
                            }
                        });
                });
            },
            function upload(data, index, next) {

                // Stream the transformed image to a different folder.
                s3.putObject({
                    Bucket: dstBucket,
                    Key: "images/" + record.Subject + "/" + record.Message + "/" + _sizesArray[
                            index].destinationPath +
                        "/" + fileName.slice(0, -4) +
                        ".jpg",
                    Body: data,
                    ContentType: 'JPG'
                }, next);
            }
        ], function (err, result) {
            if (err) {
                console.error(err);
            }
            // result now equals 'done'
            console.log("End of step " + key);
            callback();
        });
    }, function (err) {
        if (err) {
            console.error('---->Unable to resize ' + srcBucket +
                '/' + srcKey + ' and upload to ' + dstBucket +
                '/images' + ' due to an error: ' + err);
        } else {
            console.log('---->Successfully resized ' + srcBucket +
                ' and uploaded to' + dstBucket + "/images");
        }
        //context.done();
    });
};
