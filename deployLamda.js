
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var lambda = new AWS.Lambda({       // Lambda 객체 생성
    "apiVersion": '2015-03-31',
    "accessKeyId": 'AKIAYSWL4FGPHABRWJI3',
    "secretAccessKey" : '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'
});

var params = {      /*중요*/ //Lambda 함수 만들기 위한 params, 미리 알고 있어야 함
    
    FunctionName : 'faceRecog', // Lambda의 이름
    Handler : 'index.handler',      // handler
    Role : 'arn:aws:iam::589911828894:role/service-role/faceRecog', 
    Runtime : 'nodejs12.x',     //언어
    Description : ''
};

lambda.createFunction (params, function (err, data) {       // 맨 위의 lambda 객체에 param 입력 --> Lambda 함수 생성됨
    if (err) console.log(err);
    else console.log(data);
});