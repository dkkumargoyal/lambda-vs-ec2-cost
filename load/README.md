# lambda-vs-ec2-cost usecase1 - process sns message and save to dynamodb

# SETUP

Each script is designed to run for 10 min to publish specified messages to sns.

1. Launch a t2.micro instance with IAM role "ec2-sns"
2. Configure node on the instance.
3. Copy code to instance
4. npm install
5. Chage SNS topic arn in config.js
6. Configure cornjob to run load scripts one by one with a interval of 15 min

e.g. 

00 12 * * * /path-to-node /path-to-files/ec2-load-run1.js
15 12 * * * /path-to-node /path-to-files/ec2-load-run2.js
30 12 * * * /path-to-node /path-to-files/ec2-load-run3.js
...


7. Use multiple instance if you want to test for more then 50000 sns message in 10 min
8. Do not run lambda and ec2 load togather on one instance. Run one by one or use multiple instances.


