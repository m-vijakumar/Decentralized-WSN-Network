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

app.get("/", async (req, res) => {




    // try {
    //     const result = await instance.methods.Request_of_Connection("bs1", "ch1", "car3", "car2").call();
    //     console.log(result)

    // } catch (error) {
    //     console.log("error on me")
    //     console.log(error)
    // }


    return res.render("home");

})

// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');

// Require crypto for random numbers generation
const crypto = require('crypto');

// Fetch the deviceName from the folder name
const deviceName = "car1";

const init = async () => {

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await BaseStationContract.networks[networkId];
    const instance = await new web3.eth.Contract(

        BaseStationContract.abi,
        deployedNetwork && deployedNetwork.address
    );

    console.log(deployedNetwork)

    // Create the thingShadow object with argument data
    const device = awsIoT.device({
        keyPath: '../../aws/private.pem.key',
        certPath: '../../aws/certificate.pem.crt',
        caPath: '../../aws/root-CA.crt',
        clientId: deviceName,
        host: "a238smiq377l1a-ats.iot.us-east-2.amazonaws.com"
    });

    // Function that gets executed when the connection to IoT is established
    device.on('connect', function () {
        console.log('Connected to AWS IoT');

        // Start the publish loop
        infiniteLoopPublish();
    });

    // Function sending car telemetry data every 5 seconds
    function infiniteLoopPublish() {
        console.log('Sending car telemetry data to AWS IoT for ' + deviceName);
        // Publish car data to lab/telemetry topic with getCarData
        device.publish("lab/telemetry", JSON.stringify(getCarData(deviceName)));

        // Start Infinite Loop of Publish every 5 seconds
        setTimeout(infiniteLoopPublish, 5000);
    }

    // Function to create a random float between minValue and maxValue
    function randomFloatBetween(minValue, maxValue) {
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue));
    }

    // Generate random car data based on the deviceName
    function getCarData(deviceName) {
        let message = {
            'trip_id': crypto.randomBytes(15).toString('hex'),
            'engine_speed_mean': randomFloatBetween(700.55555, 3000.55555),
            'fuel_level': randomFloatBetween(0, 100),
            'high_acceleration_event': randomFloatBetween(0, 12),
            'high_breaking_event': randomFloatBetween(0, 4),
            'odometer': randomFloatBetween(0.374318249, 8.142630049),
            'oil_temp_mean': randomFloatBetween(12.7100589, 205.3165256)
        };

        const device_data = {
            'car1': {
                'vin': 'I5Z45ZSGBRZFU4YRM',
                'latitude': 39.122229,
                'longitude': -77.133578
            },
            'car2': {
                'vin': 'ETWUASOOGRZOPQRTR',
                'latitude': 40.8173411,
                'longitude': -73.94332990000001
            }
        };

        message['vin'] = device_data[deviceName].vin;
        message['latitude'] = device_data[deviceName].latitude;
        message['longitude'] = device_data[deviceName].longitude;
        message['device'] = deviceName;
        message['datetime'] = new Date().toISOString().replace(/\..+/, '');

        return message;
    }

}


app.listen(5000, init())