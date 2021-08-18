// Door Lock Device
// doorLock1.js
// subscribe to faceRecog/notify/door1

var awsIot = require('aws-iot-device-sdk');

// aws IoT Core로부터 받아와야 하는 정보 
var doorLock = awsIot.device({
    keyPath: './credentials/doorLock/b6b5b6ab0a-private.pem.key',
    certPath: './credentials/doorLock/b6b5b6ab0a-certificate.pem.crt',
    caPath: './credentials/doorLock/CA.pem',
    clientId : 'doorLock',
    host: 'a39blyz7cty9yi-ats.iot.ap-northeast-2.amazonaws.com' // 서버 (Device Gate way)
});

doorLock.on('connect', function() {
    console.log('doorLock connected');
    // faceRecog/notify/door1 subscribe  (람다가 이 토픽에다가 publish)
    doorLock.subscribe('faceRecog/notify/door1', function(){
        console.log('subscribing to the topic faceRecog/notify/door1 !');
    });

    // message 도착 -> command가 unlock이면 열고 reject면 거부
    doorLock.on('message', function(topic, message){
        if(topic == 'faceRecog/notify/door1'){
            var noti = JSON.parse(message.toString()); 
            console.log(noti);
            if(noti.command == 'unlock') console.log(noti.image, ': unlock door1');
            else console.log(noti.image, ': unauthenticated person');
        } 
    })



});
