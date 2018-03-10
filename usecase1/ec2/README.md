# lambda-vs-ec2-cost usecase1 - process sns message and save to dynamodb

# SETUP

1. Launch a t2.micro instance with IAM role "ec2-dynamodb"
2. Enable detailed monitoring of the server
3. Configure node on the instance.
4. Copy code to instance
5. Change the constants "port" and "dynamoTable" as appropriate.
6. npm install
7. Run "node index.js" and keep it running for duration of load test
8. Subscribe the http://<PUBLICIP> with the sns topic "ec2-billing"
9. Capture all the CPU utilization matrix from cloudwatch.
10. Terminate instance after the test

