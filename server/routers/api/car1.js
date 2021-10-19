const Web3 = require('web3');
const path = require("path")
const express = require('express');
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
app.set("view engine", 'ejs');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const BaseStationContract = require("../../../client/src/contracts/BaseStation.json")

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

app.get("/", (req, res) => {

    res.json({ message: "good" }).status(200)

})

// Fetch the deviceName from the current folder name
const deviceName = "car1";

// Set the destinationDeviceName depending on this deviceName
var destinationDeviceName = 'car2';


const requestConnection = async () => {

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await BaseStationContract.networks[networkId];
    const instance = await new web3.eth.Contract(

        BaseStationContract.abi,
        deployedNetwork && deployedNetwork.address
    );

    console.log(deployedNetwork)


    try {
        const result = await instance.methods.Request_of_Connection("bs1", "ch1", deviceName, destinationDeviceName).call()
        console.log(result)

        return result;

    } catch (error) {
        console.log("error on me")

        return false;
        // console.log(error)
    }

}


// Require readline for input from the console
const readline = require('readline');

// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');

// Load the endpoint from file
const { connect } = require('http2');



// Interface for console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Build constants
const subTopic = 'lab/messaging/' + deviceName;
const pubTopic = 'lab/messaging/' + destinationDeviceName;
const keyPath = '../../aws/private.pem.key'
const certPath = '../../aws/certificate.pem.crt'
const caPath = '../../aws/root-CA.crt'
const clientId = deviceName;
const host = "a238smiq377l1a-ats.iot.us-east-2.amazonaws.com";



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



const device = awsIoT.device({
    keyPath: keyPath,
    caPath: caPath,
    certPath: certPath,
    clientId: clientId,
    host: host
})



device.on("connect", async () => {

    const r = await requestConnection();
    console.log("in connect ", r);
    if (r == true) {
        device.subscribe(subTopic);


        readConsoleInput();
    } else {
        console.log("invalid connection")
    }

})



device.on("message", (topic, message) => {

    console.log("Message received on topic " + topic + ": " + message)
})

// Function to publish payload to IoT topic
function publishToIoTTopic(topic, payload) {


    device.publish(topic, payload);

}

app.listen(5000, () => console.log('Example app listening on port 5000!'))
