// Door Camera Device
// awsiot-camera.js

var awsIot = require('aws-iot-device-sdk');

// aws IoT Core로부터 받아와야 하는 정보 
var faceRecogSys = awsIot.device({
    keyPath: './credentials/fireManagementSystem/d1f79fb2d2-private.pem.key',
    certPath: './credentials/fireManagementSystem/d1f79fb2d2-certificate.pem.crt',
    caPath: './credentials/fireManagementSystem/CA.pem',
    clientId : 'fireManagementSystem',
    host: 'a39blyz7cty9yi-ats.iot.ap-northeast-2.amazonaws.com' // 서버 (Device Gate way)
});

faceRecogSys.on('connect', function() {
    console.log('faceRecogSys connected');
    // faceRecog/request구독 
    faceRecogSys.subscribe('faceRecog/request', function(){
        console.log('subscribing to the topic faceRecog/request !');
    });

    var registeredImage = ['gildong', 'simcheong', 'heungboo', 'nolboo', 'ggachi'];
    faceRecogSys.on('message', function(topic, message){
        console.log('Request:', message.toString);
        if(topic != 'faceRecog/request') return;
        var req = JSON.parse(message.toString());
        var id = registeredImage.indexOf(req.image);
        if(id != -1){
            faceRecogSys.publish(req.notify, JSON.stringify({'image': req.image, 'command': 'unlock'}))
        } else {
            faceRecogSys.publish(req.notify, JSON.stringify({'image': req.image, 'command': 'reject'}))
        }

    })

});