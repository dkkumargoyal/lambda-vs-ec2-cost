# lambda-vs-ec2-cost

Code in this repository is used for comparing cost of lambda and ec2 cost. The study is described in this post [lambda vs ec2 cost](http://www.theabcofcloud.com/lambda-vs-ec2-cost/)

1. Create dynamodb tables with a write capecity of 500
1.1 ec2-messages
1.2 lambda-messages

2. Create 2 SNS topics
2.1 lambda-billing
2.2 ec2-billing

3. Create following IAM roles
2.1 ec2-dynamodb with permissions to write dynamo db
2.2 ec2-sns with permissions to publis to sns
2.3 ec2-s3 with permissions to read and write to s3
2.4 lambda-dynamdb with permissions to write dynamo db and standard lambda permission of cloudwatch
2.5 lambda-s3 with permissions to read and write to s3 and standard lambda permission of cloudwatch
2.6 lambda-basic with standard lambda permission of cloudwatch

4. Create following buckets
4.1 ec2-source
4.2 ec2-destination
4.3 lambda-source
4.4 lambda-destination
4.5 uplaod an image file to ec2-source and lambda-source buckets e.g. convertthis.jpg

5. setup ec2 and lambdas as per usecase readme

6. setup load ec2 as per load readme.

