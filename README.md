# awsiot_faceRecog

## π μμΈλ΄μ©

ν΄λΌμ°λIoTλΌλ νλΆ μμμμ μ§νν νλ‘μ νΈμλλ€. AWSκΈ°μ μ νμ©νμ¬ ν΄λΌμ°λ κΈ°λ°μ μΌκ΅΄μΈμ μ€λ§νΈ λμ΄λ½ SWλ₯Ό κ°λ°νμμ΅λλ€. 

## π‘μμ€ν λμμΈ

<img width="919" alt="αα³αα³αα΅α«αα£αΊ 2021-08-19 αα©αα₯α« 2 25 56" src="https://user-images.githubusercontent.com/68773492/129944196-140e5794-65fd-4b03-9647-963db000c497.png">

## π‘ μμ€ν κ΅¬ν

## 1. image DB

<img width="544" alt="αα³αα³αα΅α«αα£αΊ 2021-08-19 αα©αα₯α« 2 25 26" src="https://user-images.githubusercontent.com/68773492/129944134-50034c60-8ce5-4c38-aa65-9817e560a0a7.png">

## 2. 2κ°μ Applications

### doorCamera.js :
1. νμ¬ λ¬Έμ μ΄κ³ μνλ μ¬λμ μΌκ΅΄μ¬μ§(ImageDB μ μλ μ¬μ§) μ S3 object λ‘ μλ‘λ
2. ν ν½ βfaceRecog/requestβλ‘ publish

### doorLock1.js :
1. ν ν½ βfaceRecog/notify/door1βμ subscribe
2. command μ λ΄κΈ΄ λ©μΈμ§μ λ°λΌ unlock λλ unauthentication μΆλ ₯

## 3. IoT Rule (SQL SELECT Clause)

## 4. Face Recognition Lambda Service

<img width="522" alt="αα³αα³αα΅α«αα£αΊ 2021-08-19 αα©αα₯α« 2 30 05" src="https://user-images.githubusercontent.com/68773492/129944767-9e411a27-edfb-4d09-b59d-475afa8dc082.png">

## 5. νμ€νΈμ€ν κ²°κ³Ό

### **TEST CASE 1 ) UNLOCK DOOR1 _ λ¬Έ μ΄μ΄λΌ**

<img width="615" alt="αα³αα³αα΅α«αα£αΊ 2021-08-19 αα©αα₯α« 2 28 57" src="https://user-images.githubusercontent.com/68773492/129944594-da66f0b5-a8a9-4769-aa9b-ac054c411471.png">

- λλΉ(S3)μ μ μ₯λμ΄μλ μ¬μ§λ€μ λͺ¨λ νμΈν κ²°κ³Ό **νμ¬μ¬μ§ (currUser_hodong.png) κ³Ό 99 νΌμΌνΈμ μ μ¬λλ₯Ό λ³΄μ΄λ μ¬μ§(hodong.png)μ΄ μμΌλ―λ‘ λλ€κ° unlock μ publish** νλ€.

### **TEST CASE 2 ) UNAUTHENTICATION _ λ¬Έ μ΄μ§λͺ»ν¨**

<img width="592" alt="αα³αα³αα΅α«αα£αΊ 2021-08-19 αα©αα₯α« 2 29 21" src="https://user-images.githubusercontent.com/68773492/129944669-1b2e2614-ce30-44bb-8fb5-97545005627a.png">

- λλΉμ μ μ₯λμ΄μλ μ¬μ§λ€μ λͺ¨λ νμΈν κ²°κ³Ό **νμ¬μ¬μ§ (currUser_jaeseok.png) κ³Ό 80 νΌμΌνΈ μ΄μμ μ μ¬λλ₯Ό λ³΄μ΄λ μ¬μ§μ΄ μμΌλ―λ‘ λλ€κ° reject μ publish** νλ€.

## π οΈ κΈ°μ μ€ν

- AWS S3
- AWS Lambda
- AWS Rule
- AWS IAM
- AWS IoT
- AWS DeviceGateway
- Node.js
- npm
