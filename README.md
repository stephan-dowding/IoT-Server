# IoT-Server

## Installation

1. git clone https://github.com/stephan-dowding/IoT-Server.git 
2. cd IoT-Server 
3. npm install 
4. create a .env file in the root of the project.  It should contain the following:
```
AWS_IOT_KEY_PATH=[path to your key file]
AWS_IOT_CERT_PATH=[path to your cert file]
AWS_IOT_CA_PATH=[path to your root ca file]
AWS_IOT_CLIENT_ID=[your iot client id]
AWS_REGION=[your AWS region]
```
for example
```
AWS_IOT_KEY_PATH=/users/me/.symphony/private.pem.key
AWS_IOT_CERT_PATH=/users/me/.symphony/certificate.pem.crt
AWS_IOT_CA_PATH=/users/me/.symphony/root-CA.pem
AWS_IOT_CLIENT_ID=symphony-mac
AWS_REGION=ap-southeast-1
```

## Usage - Run Server

1. npm start 
2. Launch browser and go to localhost:3000

## Usage - Run Client

1. Launch browser and go to localhost:3000/countdown/5 to start a countdown timer of 5 minutes
