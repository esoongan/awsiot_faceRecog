# awsiot_faceRecog

## 📖 상세내용

클라우드IoT라는 학부 수업에서 진행한 프로젝트입니다. AWS기술을 활용하여 클라우드 기반의 얼굴인식 스마트 도어락 SW를 개발하였습니다. 

## 💡시스템 디자인

<img width="919" alt="스크린샷 2021-08-19 오전 2 25 56" src="https://user-images.githubusercontent.com/68773492/129944196-140e5794-65fd-4b03-9647-963db000c497.png">

## 💡 시스템 구현

## 1. image DB

<img width="544" alt="스크린샷 2021-08-19 오전 2 25 26" src="https://user-images.githubusercontent.com/68773492/129944134-50034c60-8ce5-4c38-aa65-9817e560a0a7.png">

## 2. 2개의 Applications

### doorCamera.js :
1. 현재 문을 열고자하는 사람의 얼굴사진(ImageDB 에 없는 사진) 을 S3 object 로 업로드
2. 토픽 ‘faceRecog/request’로 publish

### doorLock1.js :
1. 토픽 ‘faceRecog/notify/door1’을 subscribe
2. command 에 담긴 메세지에 따라 unlock 또는 unauthentication 출력

## 3. IoT Rule (SQL SELECT Clause)

## 4. Face Recognition Lambda Service

<img width="522" alt="스크린샷 2021-08-19 오전 2 30 05" src="https://user-images.githubusercontent.com/68773492/129944767-9e411a27-edfb-4d09-b59d-475afa8dc082.png">

## 5. 테스트실행 결과

### **TEST CASE 1 ) UNLOCK DOOR1 _ 문 열어라**

<img width="615" alt="스크린샷 2021-08-19 오전 2 28 57" src="https://user-images.githubusercontent.com/68773492/129944594-da66f0b5-a8a9-4769-aa9b-ac054c411471.png">

- 디비(S3)에 저장되어있던 사진들을 모두 확인한 결과 **현재사진 (currUser_hodong.png) 과 99 퍼센트의 유사도를 보이는 사진(hodong.png)이 있으므로 람다가 unlock 을 publish** 한다.

### **TEST CASE 2 ) UNAUTHENTICATION _ 문 열지못함**

<img width="592" alt="스크린샷 2021-08-19 오전 2 29 21" src="https://user-images.githubusercontent.com/68773492/129944669-1b2e2614-ce30-44bb-8fb5-97545005627a.png">

- 디비에 저장되어있던 사진들을 모두 확인한 결과 **현재사진 (currUser_jaeseok.png) 과 80 퍼센트 이상의 유사도를 보이는 사진이 없으므로 람다가 reject 을 publish** 한다.

## 🛠️ 기술스택

- AWS S3
- AWS Lambda
- AWS Rule
- AWS IAM
- AWS IoT
- AWS DeviceGateway
- Node.js
- npm
