# lambda-vs-ec2-cost usecase1 - process sns message and save to dynamodb

# SETUP

1. Create a lambda function "lambda-usecase1" using code in index.js
2. Set lambda role to "lambda-dynamdb"
3. Subscribe the lambda function event with the sns topic "lambda-billing"
4. Capture all the matrix from cloudwatch during load test.

