# 46 Generator와 asnyc/await

- [46 Generator와 asnyc/await](#46-generator와-asnycawait)
  - [46.1 제너레이터란?](#461-제너레이터란)
  - [46.2 제너레이터 함수의 정의](#462-제너레이터-함수의-정의)
  - [46.3 제너레이터 객체](#463-제너레이터-객체)
  - [46.4 제너레이터의 일시 중지와 재개](#464-제너레이터의-일시-중지와-재개)
  - [46.5 제너 레이터의 활용](#465-제너-레이터의-활용)
  - [async/await](#asyncawait)

## 46.1 제너레이터란?

ES6에서 도입된 것으로 코드 블록의 실행을 멈췄다가 필요한 시점에 다시 실행할 수 있는 함수이다.

제너레이터 vs 일반 함수

1. **제너레이터 함수는 함수 호출자에게 함수 실행의 제어권 양도 가능**
   - 일반 함수를 호출하면 제어권이 호출된 함수로 넘어가기 때문에 함수 호출자는 함수 실행을 제어할 수 없다. 
   - 제너레이터 함수는 함수 호출자가 함수 실행을 제어할 수 있다. -> 함수의 제어권을 함수가
      독점하는 것이 아니라 함수 호출자에게 양도 가능.
2. **제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.**
   - 일반 함수는 함수가 실행되고 있는 동안에는 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할  수 없다.
   - 제너레이터 함수는 함수 호출자와 양방향을 ㅗ함수의 상태를 주고받을 수 있다.
3. **제너레이터 함수를 호출하면 제너레이터 객체를 반환**
   - 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다. 
   - 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.

## 46.2 제너레이터 함수의 정의

제너레이터 함수는 `function*` 키워드로 선언하고, 하나 이상의 `yield` 표현식을 포함한다.

```javascript
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
}

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
}

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}
```
- `*`는 `function` 키워드와 함수 이름 사이에만 넣어주면 된다.

- 제너레이터 함수는 화살표 함수로 정의할 수 없다.
  ```javascript
  const genArrowFunc = *() => { // SyntaxError
    yield 1;
  }; 
  ```
- 제너레이터 함수는 `new` 연산자와 함께 생성자 함수로 호출할 수 없다.
```javascript
function* genFunc() {
  yield 1;
}

new genFunc(); // TypeError
```
## 46.3 제너레이터 객체

제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 제너레이터 함수가 반환한 제너레이터 객체는 이터러블이면서 이터레이터다.

제너레이터 객체

- `Symbol.iterator` 메서드를 상속받는 이터러블 
- `value`, `done` 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 `next` 메서드를 소유하는 이터레이터
  - `next` 메서드를 가지는 이터레이터이므로 `Symbol.iterator` 메서드를 호출해서 별도로 이터레이터를 생성할 필요가 없다.

```javascript
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = genFunc(); // 제너레이터 객체 반환

// 이터러블 = Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체
// -> 제너레이터 객체는 이터러블 & 이터레이터
console.log(Symbol.iterator in generator); // true

// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true
```

제너레이터 객체는 `next` 메서드를 갖는 이터레이터지만 `return`, `throw` 메서드를 추가적으로 갖는다.
- `next` 메서드 호출: 제너레이터 함수의 `yield`까지 코드 블럭을 실행하고 `value = yield된 값, done = false`를 갖는 이터레이터 리절트 객체를 반환
- `return` 메서드 호출: `value = 인수로 전달받은 값, done = true`를 갖는 이터레이터 리절트 객체를 반환
- `throw` 메서드 호출: `value = undefined, done = true`를 갖는 이터레이터 리절트 객체를 반환

```javascript
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return('END')); // {value: 'END', done: true}
console.log(generator.throw('ERROR')); //
```

## 46.4 제너레이터의 일시 중지와 재개

제너레이터는 `yield` 키워드와 `next` 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다.

제너레이터 함수를 호출하면 제너레이터 함수가 실행되는 것이 아니라 **제너레이터 객체를 반환**한다. **제너레이터 객체의 `next` 메서드를 호출**하면 제너레이터 함수의 코드 블록을 실행한다. -> 한 번에 코드 블록의 모든 코드를 실행하는 것이 아니라 `yield` 표현식까지만 실행한다. 
- `next` 메서드는 value, done 프로퍼티를 갖는 객체를 반환한다.
- `next` 메서드에 전달한 인수는 제너레이터 첫수의 yield 표현식을 할당 받는 변수에 할당된다.
```javascript
function* genFunc() {
  const x = yield 1; // 두번째 next 메서드가 호출될 때 x에 값 할당
  const y = yield(x + 10);
  
  return;
}

const generator = genFunc();


/* 첫번째 yield 표현식까지 실행되고 중지된다.
   yield된 값 1은 next 메서드가 반환한 이터레이터 리절트 객체 value 프로퍼티에 할당됨. */
console.log(generator.next());

/* 두번째 yield 표현식까지 실행되고 중지된다. -> 변수 x에 next 메서드로 전달한 29이 할당됨.
   yield된 값 (x + 10)은 next 메서드가 반환한 이터레이터 리절트 객체 value 프로퍼티에 할당됨. */
console.log(generator.next(20));

/* 변수 y에 30이 할당되고 함수가 종료된다. */
console.log(generator.next(30));
```

`yield`: 제너레이터 함수의 실행을 일시 중지시키거나 `yield` 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환

## 46.5 제너레이터의 활용

## async/await
