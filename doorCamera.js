// Door Camera Device
// doorCamera.js
// publish to faceRecod/request

var awsIot = require('aws-iot-device-sdk');

var fs = require('fs');     // import: 업로드할 .zip 파일을 읽어들이기 위해 filesystem import
var AWS = require('aws-sdk');   // import: 설치된 sdk파일 import
AWS.config.region = 'ap-northeast-2';   // region
AWS.config.apiVersions = {
    "s3" : '2006-03-01'
};

// aws IoT Core로부터 받아와야 하는 정보 
var doorCamera = awsIot.device({
    keyPath: './credentials/doorCamera/83357143e9-private.pem.key',
    certPath: './credentials/doorCamera/83357143e9-certificate.pem.crt',
    caPath: './credentials/doorCamera/CA.pem',
    clientId : 'doorCamera',
    host: 'a39blyz7cty9yi-ats.iot.ap-northeast-2.amazonaws.com' // 서버 (Device Gate way)
});
var keys = require("./credentials/credential-keys.js");

var s3 = new AWS.S3({
    "accessKeyId" : keys.access_key,
    "secretAccessKey" : keys.secret_key
});

var params = {
    Bucket : '2021cloudiot-sj', 
    Key : 'currUser.jpg',      // S3 object
    Body:  fs.createReadStream("./currUser_hodong.png")
}

function createObject(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {        
            if (err) reject(err);
            else resolve(data);
        })
    });
}

async function createDeploymentPackage (params) {       // 위의 createObjec()의 결과를 출력하기 위해서 async 함수 만듦 (s3 obj을 promise화)
    try { 
        var res = await createObject(params);       // synchornize
        console.log(res);          
    } catch (err) { console.log(err); }
}

// create S3 object of current visitor image
createDeploymentPackage(params);

// publish a recognition request to the Topc: ‘faceRecog/request’ with image current user
doorCamera.on('connect', function() {
    console.log('Door Camera connected');

    var message = {'notify' : 'faceRecog/notify/door1', 'image': 'currUser'};
    console.log('publish to faceRecog/request'+JSON.stringify(message));
    doorCamera.publish('faceRecog/request', JSON.stringify(message));


    // // ID of the S3 Objects in the imageDB
    // var imagesInStr = ['hodong', 'jongmin', 'seunggi', 'sugeun', 'hodong', 'jongmin', 'seunggi', 'sugeun', 'jaesuck', 'haha'];


    // // randomly select one of the ten images
    // var idx = Math.ceil(Math.random()*10); // 0~10 사이의 정수값 
    // // make messgae
    // var message = {'notify' : 'faceRecog/notify/door1', 'image': imagesInStr[idx]};
    // console.log('publish to faceRecog/request'+JSON.stringify(message));
    // // 위에서 만든 메세지를 아래 faceRecog/request라는 토픽에다가 publish
    // doorCamera.publish('faceRecog/request', JSON.stringify(message));


    // // Every 3 seconds, doorCamera send a request to face Recognition System
    // // 3초마다 function을 실행해라 
    // setInterval(function() {
    //     // randomly select one of the ten images
    //     var idx = Math.ceil(Math.random()*10); // 0~10 사이의 정수값 
    //     // make messgae
    //     var message = {'notify' : 'faceRecog/notify/door1', 'image': imagesInStr[idx]};
    //     console.log('publish to faceRecog/request'+JSON.stringify(message));
    //     // 위에서 만든 메세지를 아래 faceRecog/request라는 토픽에다가 publish
    //     doorCamera.publish('faceRecog/request', JSON.stringify(message));
    // }, 3000);
});