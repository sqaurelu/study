# let, const 키워드와 블록 레벨 스코프

- [15. let, const 키워드와 블록 레벨 스코프](#let-const-키워드와-블록-레벨-스코프)
  - [15.1 var 키워드로 선언한 변수의 문제점](#151-var-키워드로-선언한-변수의-문제점)
    - [15.1.1 변수 중복 선언 허용](#1511-변수-중복-선언-허용)
    - [15.1.2 함수 레벨 스코프](#1512-함수-레벨-스코프)
    - [15.1.3 변수 호이스팅](#1513-변수-호이스팅)
  - [15.2 let 키워드](#152-let-키워드)
    - [15.2.1 변수 중복 선언 금지](#1521-변수-중복-선언-금지)
    - [15.2.2 블록 레벨 스코프](#1522-블록-레벨-스코프)
    - [15.2.3 변수 호이스팅](#1523-변수-호이스팅)
    - [15.2.4 전역 객체와 let](#1524-전역-객체와-let)
  - [15.3 const 키워드](#153-const-키워드)
    - [15.3.1 선언과 초기화](#1531-선언과-초기화)
    - [15.3.2 재할당 금지](#1532-재할당-금지)
    - [15.3.3 상수](#1533-상수)
    - [15.3.4 const 키워드와 객체](#1534-const-키워드와-객체)
  - [15.4 var vs. let vs. const](#154-var-vs-let-vs-const)


## 15.1 var 키워드로 선언한 변수의 문제점

### 15.1.1 변수 중복 선언 허용

```javascript
var x = 1;
var y = 1;

// var로 선언된 변수는 같은 스코프 내에서 중복 선언 허용
// (중복 선언일 때)초기화문이 있는 변수 선언문은 js 엔진에 의해 var 키워드가 없는 것처럼 동작
var x = 100;
// 초기화문이 없는 변수 선언문은 무시됨.
var y;

console.log(x, y); // 100, 1
```

- 중복 선언 가능

### 15.1.2 함수 레벨 스코프

- `var`로 선언된 변수는 함수 레벨 스코프

```javascript
var x = 1;

if (true) {
  // x는 전역 변수 -> 이미 선언되어 있음.
  var x = 10; // 중복 선언 => 의도치 않은 값 변경 => 부작용
}
```

- 함수, for, if, while, try/catch 문 -> 블록 스코프를 가짐.

```javascript
var i = 10;

for (var i = 0; i < 5; i++) { // i 중복 선언, for 문 안에서 선언해도 전역 변수
  console.log(i); // 0, 1, 2, 3, 4
}

console.log(5); // 의도치 않은 값 변경
```

### 15.1.3 변수 호이스팅
```javascript
// 코드 평가 -> 코드 실행(런타임)

// 런타임이 시작된 후 이 시점에서는 foo 변수 호이스팅에 의해 이미 선언됨 -> 1. 선언 단계
// foo 변수는 undefined로 초기화됨 -> 2. 초기화 단계
console.log(foo);

// 변수에 값 할당 -> 3. 할당 단계
foo = 123;

console.log(foo); // 123

var foo; // 변수 선언 -> JS 엔진에 의해 코드 평가 단계에서 실행됨.
```

## 15.2 let 키워드
- ES6부터 등장

### 15.2.1 변수 중복 선언 금지

```javascript
let bar =  1;
let bar = 2; // SnytaxError -> 중복 선언 금지
```

### 15.2.2 블록 레벨 스코프
- 모든 코드 블록(함수, if, for, while try/catch 문)을 지역 스코프로 인정

```javascript
let foo = 1;
{
  let foo = 2; // 지역 변수
  let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError
```

### 15.2.3 변수 호이스팅
- `let` 키워드로 선언한 변수는 호이스팅이 발생하지 않는 것처럼 동작

```javascript
console.log(foo);
let foo = 1; // ReferenceError
```

<img width="697" alt="var vs let" src="https://user-images.githubusercontent.com/55270881/147895273-a5343eaf-a96c-46df-bf5a-5347ab8cfe23.png">

```javascript
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```
- `var`로 선언된 변수는 코드 평가 단계에서 선언 + 초기화가 함께 진행됨.

```javascript
console.log(foo); // ReferenceError -> TDZ

let foo; // 변수 선언문에서 초기화 단계 시작
console.log(foo); // undefined

foo = 1; // 할당
console.log(foo); // 1
```

- `let`로 선언된 변수는 선언(코드 평가 단계), 초기화(코드 실행 단계)가 분리되어 진행됨.
- 스코프 시작 지점 ~ 초기화 시작 지점(변수 선언문)까지 변수 참조 불가 -> 일시적 사각지대(TDZ)

### 15.2.4 전역 객체와 let
- `var`로 선언된 전역 변수, 함수 선언문으로 정의한 전역 함수는 모두 전역 객체(window)의 property가 된다.
  ```javascript
  var x = 1;
  y = 2; /// 암묵적 전역
  function foo() {}
  
  console.log(window.x, window.y, window.foo); // 1 2 ƒ foo() {}
  ```
- `let`으로 선언된 전역변수는 전역 객체의 property가 아님
  ```javascript
  let x = 1;
  console.log(window.x); // undefined
  ```

## 15.3 const 키워드
- 상수를 선언하기 위해 사용하는 변수
- 블록 레벨 스코프를 가짐
- 호이스팅이 발생하지 않는 것처럼 동작

### 15.3.1 선언과 초기화
- `const`는 선언과 동시에 초기화를 해주어야 한다.
  ```javascript
  const x = 1;
  const y; // SyntaxError
  ```

### 15.3.2 재할당 금지
- `var`, `let`는 재할당 가능
- `const`는 재할당 불가능
  ```javascript
  const foo = 1;
  foo = 2; // TypeError
  ```

### 15.3.3 상수
- 상수 = **재할당이 금지된 변수**
- 원시 값(변경 불가능한 값)을 할당한 경우 값 변경 불가
  - 재할당 없이 값 변경할 방법이 없기 때문
- 상태 유지 & 가독성, 유지보수를 위해 적극적으로 사용해야 함

### 15.3.4 const 키워드와 객체
- `const`로 선언된 변수에 객체를 할당한 경우 값 변경 가능
  - property 동적 생성, 삭제, 값 변경 가능 => 객체가 변경 되더라도 변수에 할당된 참조 값은 변경x
- `const`는 재할당 금지, **'불변'** 을 의미하진 않음.

```javascript
const person = { name: 'lee' };
person.age = 30;

console.log(person); // {name: 'lee', age: 30}

person = { name: 'kim' }; // TypeError: Assignment to constant variable.
// person 변수에는 이미 {name: 'lee', age: 30}의 메모리 주소 값이 저장되어 있기 때문에
// 새로운 { name: 'kim' }의 메모리 주소 값 할당 불가능
```

## 15.4 var vs. let vs. const
- 기본적으로 `const`를 사용
- 재할당이 필요한 경우에 `let`을 사용하는 것이 good
  - 변수의 스코프를 최대한 좁게 만들기
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체는 `const`를 사용하기 