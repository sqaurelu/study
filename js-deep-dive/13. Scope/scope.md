# Scope (스코프)

- [Scope (스코프)](#scope-스코프)
  - [13.1 스코프란?](#131-스코프란)
    - [스코프의 필요성](#스코프의-필요성)
    - [`var` vs `const`, `let`](#var-vs-const-let)
  - [13.2 스코프의 종류](#132-스코프의-종류)
  - [13.3 스코프 체인](#133-스코프-체인)
    - [13.3.1 스코프 체인에 의한 변수 검색](#1331-스코프-체인에-의한-변수-검색)
    - [13.3.2 스코프 체인에 의한 함수 검색](#1332-스코프-체인에-의한-함수-검색)
  - [13.4 함수 레벨 스코프](#134-함수-레벨-스코프)
  - [13.5 렉시컬 스코프](#135-렉시컬-스코프)

## 13.1 스코프란?

- 식별자(변수 이름, 함수 이름, 클래스 이름 등)가 유효한 범위
- 모든 식별자는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정된다.
- 식별자 결정: 자바스크립트 엔진이 스코프를 통해 어떤 변수를 참조해야 할 것인지 결정하는 것
  - 스코프는 자바스크립트 엔진이 식별자를 검색할 때 사용하는 규칙

```javascript
const x = 'global';

function foo() {
  const x = 'local';
  console.log(x); // local
}

foo();

console.log(x); // global
```

`x` 변수는 식별자 이름이 동일하지만 자신이 유효한 범위(스코프)가 다른 별개의 변수이다.

>**🥸 스코프란 무엇인가요?** 스코프는 식별자가 참조될 수 있는 유효한 범위를 의미합니다.
함수, 변수, 클래스 들을 참조할 때는 참조 하려는 식별자(함수, 변수, 클래스)가 선언된 위치에 따라 참조 가능 여부가 결정되기 때문에 이때 필요한 것이 스코프입니다.
<br/>+ 스코프는 계층적인 구조를 가지기 때문에 하위 스코프에서 상위 스코프만 접근할 수 있습니다.

### 스코프의 필요성

### `var` vs `const`, `let`

```javascript
function foo() {
  var x = 1;
  var x = 2;

  console.log(x); // 2
}
```

`var` 키워드로 변수를 선언하면 같은 스코프 내에서도 똑같은 식별자를 이용해서 다시 선언할 수 있다. -> 의도치 않게 변수 값이 재할당되어 변경되는 부작용을 발생시킬 수 있다.

```javascript
function foo() {
  let x = 1;
  let x = 2;

  console.log(x);
}
```

`const`, `let` 키워드를 사용하면 같은 스코프 내에서 중복된 식별자를 사용할 수 없다.

## 13.2 스코프의 종류

변수는 자신이 선언된 위치에 의해 자신이 유효한 범위인 스코프가 결정된다.

- 전역 스코프: 코드 전체를 스코프로 가진다. 전역 변수는 코드 전체의 스코프를 가진다. -> 전역 변수는 어디서든 참조할 수 있다.
- 지역 스코프: 함수의 코드 블럭 내부를 스코프로 가진다. 지역 변수는 자신이 선언된 함수 내부에서 스코프를 가진다.

```javascript
function outer() {
  const outerVal = 1;
  const hello = 'hello';

  function inner() {
    const innerVal = 2;
    const hello = 'bye';

    console.log(outerVal, hello); // 1 bye
  }

  console.log(innerVal); // 참조 불가
}
```

- `outer()` 에 선언된 지역 변수 `outerVal`은 `inner()`에서 참조할 수 있다. 하지만, 지역 변수 `innerVal`은 `inner()`의 외부에서 참조할 수 없다. -> 지역 변수는 자신의
  지역 스코프와 하위 지역 스코프에서만 유효하다.
- `hello` 변수는 `outer()`, `inner()` 모두에서 선언되었다.
  - `inner()` 에서 `hello` 변수를 호출하면 `bye`가 출력된다. -> 자바스크립트 엔진이 스코프 체인을 통해 참조할 변수를 검색했기 때문

## 13.3 스코프 체인

스코프가 계층적으로 연결된 것을 스포크 체인이라고 한다. 모든 스코프는 하나의 계층적 구조로 연결되고, 모든 지역 스코프의 최상위 스코프는 전역 스코프이다.

- 함수는 중첩될 수 있다. -> 함수의 지역 스코프도 중첩될 수 있다.
- 스코프가 함수의 중첩에 의해 계층적 구조를 갖는다.
  - 중첩 함수의 지역 스코프는 중첩 함수를 포함하는 외부 함수의 지역 스코프와 계층적 구조를 갖는다. (ex. `outer()`의 지역 스코프는 `inner()`의 지역 스코프의 상위 스코프이다.)

### 13.3.1 스코프 체인에 의한 변수 검색

변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작해서 상위 스코프 방향으로 이동하며 선언된 변수를 검색한다. 이 때문에 상위 스코프에서 선언된 변수를 하위 스코프에서
참조할 수 있다.

```javascript
const x = 0;

function outer() {
  function inner() {
    console.log(x); // 0
  }
}
```

`x`는 전역 스코프에 선언되어 있다. `inner()`에서 변수 `x`를 참조하고 있는데, `x`를 참조하는 코드의 스코프인 `inner()`의 지역 스코프에서 선언되었는지 검색 -> `inner()`의 상위
스코프인 `outer()`에서 선언되었는지 검색 -> 최상위 스코프인 전역 스코프에서 선언되었는지 확인한다. 검색하는 과정에서 참조하는 변수의 선언을 찾으면 검색을 종료한다.

하위 -> 상위 스코프로 스코프 체인을 통해 변수 검색을 하는 이유는 하위에 선언된 변수는 상위에서 참조할 수 없다는 것을 의미한다.

### 13.3.2 스코프 체인에 의한 함수 검색

```javascript
function foo() {
  console.log('global function foo');
}

function bar() {
  function foo() {
    console.log('local function foo');
  }

  foo();
}

foo(); // global function foo
bar(); // local function foo
```

함수는 식별자에 함수 객체가 할당된 것 외에는 일반 변수와 다른 것이 없다. 따라서 스코프는 "식별자를 검색할 때 사용하는 규칙"이라고 생각하면 된다.

## 13.4 함수 레벨 스코프

- 블록 레벨 스코프: `if`, `while`, `for`, `try/catch` 등 함수 뿐만 아니라 중괄호로 만들어진 범위에 의해서 지역 스코프가 생성된다.
- 함수 레벨 스코프: 함수의 코드 블록에 해당하는 범위만을 지역 스코프라 한다.
  - `var` 키워드로 선언된 변수는 함수 레벨 스코프를 갖는다.
  - `const`, `let` 키워드로 선언된 변수는 블록 레벨 스코프를 갖는다.

```javascript
var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // 5 -> 의도치 않게 변수의 값이 변경됨.
```

`var` 키워드는 함수 레벨 스코프를 갖기 때문에 변수 `i`는 전역 변수고, 중복으로 선언되었다. 위 예제처럼 의도치 않게 값이 변경되었고, 이를 막기 위해 ES6에서는 `let`, `const` 키워드를 통해
블록 레벨 스코프를 갖는 변수를 사용할 수 있게 했다.

## 13.5 렉시컬 스코프