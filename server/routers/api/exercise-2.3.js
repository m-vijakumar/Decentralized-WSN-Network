// Require readline for input from the console
const readline = require('readline');

// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');

// Load the endpoint from file
const { connect } = require('http2');

// Fetch the deviceName from the current folder name
const deviceName = "car1";

// Set the destinationDeviceName depending on this deviceName
var destinationDeviceName = 'car1';
if (deviceName === 'car1') {
    destinationDeviceName = 'car2';
}

// Build constants
const subTopic = 'lab/messaging/' + deviceName;
const pubTopic = 'lab/messaging/' + destinationDeviceName;
const keyPath = '../../aws/private.pem.key'
const certPath = '../../aws/certificate.pem.crt'
const caPath = '../../aws/root-CA.crt'
const clientId = deviceName;
const host = "a238smiq377l1a-ats.iot.us-east-2.amazonaws.com";

// Interface for console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Recursive function reading console input
function readConsoleInput() {
    rl.question('Enter a message on the next line to send to ' + pubTopic + ':\r\n', function (message) {


        // set restrictioons
        // call funtion request connection

        // Calling function to publish to IoT Topic
        publishToIoTTopic(pubTopic, message);

        readConsoleInput();
    });
}



// TODO 1: Use the awsIoT library to create device object using the  
//         constants created before

const device = awsIoT.device({
    keyPath: keyPath,
    caPath: caPath,
    certPath: certPath,
    clientId: clientId,
    host: host
})


// TODO 2: When the connection to AWS IoT is established, subscribe to the 
//         subTopic IoT Topic and start reading from the console for a message to
//         send using the readConsoleInput() function.

device.on("connect", () => {
    device.subscribe(subTopic);

    readConsoleInput();
})


// TODO 3: When a new message is received on the subscribed topic, output its 
//         content in the console.

device.on("message", (topic, message) => {

    console.log("Message received on topic " + topic + ": " + message)
})

// Function to publish payload to IoT topic
function publishToIoTTopic(topic, payload) {
    // TODO 4: Publish to specified IoT topic using device object
    //         that you created

    device.publish(topic, payload);

}