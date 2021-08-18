// faceRecog lambda service

// invoke by iot rule -> invoke aws rekognition -> publish to feceRecog/notify/door1

// 람다로 만들때는 따로 모듈 설치할필요없음
var AWS = require('aws-sdk')
var iotdata = new AWS.IotData({
    endpoint: 'a39blyz7cty9yi-ats.iot.ap-northeast-2.amazonaws.com',
    // apiVersion : '2015-05-28'
    //accessKeyId : 'AKIAYSWL4FGPHABRWJI3',
    //secretAccessKey: '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'
});

var bucket = '2021cloudiot-sj'
var client = new AWS.Rekognition();


exports.handler = async function (event, context) {
    // rule에서 sql select clause를 통해 processing해서 보낸 json object
    // event를 processing하고 iotdata.publish로 토픽에 퍼블리시

    console.log(event.image);

    var registeredImage = ['hodong', 'jongmin', 'seunggi', 'sugeun'];

    var id = (id == 0) ? 'reject' : 'unlock';

    // 현재 방문자의 facial image에 해당하는 S3객체의 아이디 !!
    var id = registeredImage.indexOf(event.image);
    var photo_target = event.image + '.jpg'; // currUser
    var similarity;


    for (var i = 0; i < registeredImage.length; i++) {

        // for loop으로 비교대상을 바꿔줌
        const params = {
            SourceImage: {
                S3Object: {
                    Bucket: bucket,
                    Name: registeredImage[i] + '.jpg'
                },
            },
            TargetImage: {
                S3Object: {
                    Bucket: bucket,
                    Name: photo_target
                },
            },
            SimilarityThreshold: 70
        }

        await client.compareFaces(params, function (err, response) {

            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {
                response.FaceMatches.forEach(data => {
                    var position = data.Face.BoundingBox
                    similarity = data.Similarity

                    console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
                }) // for response.faceDetails
            } // if
        }).promise();

        if (similarity > 80) {
            break
        }
    }

    var command;
    if (similarity > 80) {
        command = 'unlock'
    } else {
        command = 'reject'
    }

    // 토픽, 퍼블리시할 데이터, 0 : 페일나도 인정함 (신뢰성은 보장x)
    var params_topic = {
        topic: event.notify,
        payload: JSON.stringify({ 'image': event.image, 'command': command, 'similarity': similarity }),
        qos: 0
    };

    // 프로미스 : 프로미스 오브젝트가 리턴됨 -> 
    var res = await iotdata.publish(params_topic).promise();
    return { 'statusCode': 200, 'result': res };
}