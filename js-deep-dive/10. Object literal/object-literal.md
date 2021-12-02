# Object Literal (객체 리터럴)

- [Object Literal (객체 리터럴)](#object-literal-객체-리터럴)
  - [10.1 객체란?](#101-객체란)
  - [10.2 객체 리터럴에 의한 객체 생성](#102-객체-리터럴에-의한-객체-생성)
  - [10.3 프로퍼티](#103-프로퍼티)
  - [10.4 메서드](#104-메서드)
  - [10.5 프로퍼티 접근](#105-프로퍼티-접근)
  - [10.6 프로퍼티 값 계산](#106-프로퍼티-값-계산)
  - [10.7 프로퍼티 동적 생성](#107-프로퍼티-동적-생성)
  - [10.8 프로퍼티 삭제](#108-프로퍼티-삭제)
  - [10.9 ES6에서 추가된 객체 리터럴의 확장 기능](#109-es6에서-추가된-객체-리터럴의-확장-기능)
    - [10.9.1 프로퍼티 축약 표현](#1091-프로퍼티-축약-표현)
    - [10.9.2 계산된 프로퍼티 이름](#1092-계산된-프로퍼티-이름)
    - [10.9.3 메서드 축약 표현](#1093-메서드-축약-표현)

## 10.1 객체란?

다양한 타입의 값을 하나의 단위로 구성한 자료구조

-   JS는 객체 기반의 프로그래밍 언어 -> JS를 구성하는 거의 모든 것이 객체
-   원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체
-   원시 값: 변경 불가능한 값, 객체 타입의 값: 변경 가는한 값

```javascript
var person = {
    name: 'Lee', // 프로퍼티
    age: 20, // 프로퍼티
};
```

객체는 0개 이상의 프로퍼티(객체의 상태를 나타내는 값, 키 + 값)로 구성된 집합이다.

JS에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. -> 함수 가능. 프로퍼티 값으로 쓰인 함수는 메소드라 부른다.

```javascript
var counter = {
    num: 0, // 프로퍼티
    increase() {
        // 메소드
        this.num++;
    },
};
```

이처럼 객체는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 메서드를 모두 포함할 수 있다.

## 10.2 객체 리터럴에 의한 객체 생성

JS에서의 객체 생성 방법

1. 객체 리터럴
2. Object 생성자 함수
3. 생성자 함수
4. Object.create 메서드
5. 클래스 in ES6

이중 객체 리터럴이 가장 일반적으로 사용하는 방법이다.

-   리터럴: 사람이 이해할 수 있는 문자, 약속된 기호를 사용하여 값을 생성하는 표기법(소스 코드의 고정된 값을 대표하는 용어)

```javascript
let a = 10; // a: 변수, 10: 숫자 리터럴
const b = 'string'; //b: 상수, 'string': 문자열 리터럴
```

-   객체 리터럴: 객체를 생성하기 위한 표기법, 중괄호를 이용해 나타낸다.

```javascript
var person = {
    name: 'Lee',
    age: 20,
};
```

`person` -> 변수

```javascript
{
    name: 'Lee',
    age: 20,
}
```

-> 객체 리터럴

객체 리터럴의 중괄호는 코드 블럭을 의미하지 않는다. 값이다. 객체 리터럴로 객체를 생성한 후 동적으로 프로퍼티를 할당할 수 도 있다.

## 10.3 프로퍼티

객체를 구성하고 있는 것이다. 프로퍼티를 나열할 때는 쉼표로 구분한다.

-   프로퍼티 키: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값. 일반적으로 문자열을 사용한다. 식별자 역할을 하며 식별자 네이밍 규칙을 따르지 않는 키는 따옴표를 사용해야 한다.
-   프로퍼티 값: JS에서 사용할 수 있는 모든 값

```javascript
var person = {
    firstName: 'wlalala', // 식별자 네이밍 규칙 따름 -> 따옴표 안써도 됨.
    'last-name': 'Lee', // 식별자 네이밍 규칙 따르지 않음 -> 따옴표 써야함.
};
```

프로퍼티 키를 동적으로 생성할 수 있다. 이때 대괄호를 사용하여 프로퍼티 키로 사용할 표현식을 묶어준다.

```javascript
var obj = {};
var key = 'hello';

obj[key] = 'world';
obj['key'] = 'value';
```

프로퍼티 키에 문자열이나 심벌 값 이외의 값을 사용하면 암묵적 타입 변환을 통해 내부적으로는 문자열이 된다.

```javascript
vart foo = {
  1: 2
}

console.log(foo); // { 1: 2 }
console.log(foo['1']); // 2
console.log(foo[1]); // 2
```

이미 존재하는 프로퍼티 키를 중복 선언하면 덮어쓴다.

## 10.4 메서드

JS의 함수는 객체(일급 객체)이기 때문에 값이다. -> 프로퍼티 값으로 사용할 수 있다.

```javascript
var circle = {
    radius: 5, // 프로퍼티
    getDiameter() {
        // 메서드
        return 2 * this.radius;
    },
};

console.log(circle.getDiameter()); // 10
```

```javascript
var circle = {
    radius: 5, // 프로퍼티
    getDiameter() {
        // 메서드
        return 2 * this.radius;
    },
};

console.log(circle.getDiameter()); // 10

const a = (cb) => cb();
console.log(a(circle.getDiameter)); // -> NaN(this가 circle 객체(자기 자신)를 가리키지 않음.)
```

## 10.5 프로퍼티 접근

-   마침표를 이용해서 프로퍼티 접근: `circle.radius` 프로퍼티 키가 숫자인 경우 마침표를 이용해 접근 불가
-   대괄호를 이용해서 프로퍼티 접근: `circle['radius']` 프로퍼티 키로 변수, 상수를 사용하지 않고 직접 넣을 경우 반드시 따옴표를 넣어주어야 한다. (숫자가 프로퍼티 키인 경우에는 따옴표 생략 가능)

객체에 존재하지 않는 프로퍼티에 접근하면 ReferenceError가 발생하지 않고, undefined를 반환한다.

## 10.6 프로퍼티 값 계산

존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

```javascript
var person = { name: 'Lee' };
person.name = 'Kim';

console.log(person); // { name: 'Kim' }
```

## 10.7 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```javascript
var person = { name: 'Lee' };
person.age = 20;
person['gender'] = 'man';

console.log(person); // { name: 'Lee', age: 20, gender: 'man' }
```

## 10.8 프로퍼티 삭제

`delete` 연산자를 이용해 객체의 프로퍼티를 삭제할 수 있다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시된다.

```javascript
var person = { name: 'Lee' };

delete person.age; // 무시됨.
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능

### 10.9.1 프로퍼티 축약 표현

```javascript
var x = 1,
    y = 2;

var obj = {
    x: x, // ES5
    y, // ES6 -> ES6부터는 프로퍼티 값으로 변수를 사용할 때 프로퍼티 키와 동일한 이름일 때 축약하여 쓸 수 있다.
};

console.log(obj); // { x:1, y: 2 }
```

### 10.9.2 계산된 프로퍼티 이름

대괄호를 이용해서 동적으로 프로퍼티를 생성할 때 프로퍼티 키를 동적으로 생성할 수 있다.

ES5에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호 표기법을 이용해야 한다.

```javascript
var = perfix = 'prop';
var i = 0;

var obj = {};
obj[preifx + '-' + ++i] = i; // ES5
```

```javascript
var = perfix = 'prop';
var i = 0;

var obj = {
  [`${prefix}-${++i}`]: i // ES6
};
```

### 10.9.3 메서드 축약 표현

ES5에서 메소드를 정의할 땐 프로퍼티 값으로 함수를 할당했지만, ES6에서는 function 키워드를 생략한 축약 표현 사용 가능하다.

```javascript
var obj = {
    // ES5
    name: 'Lee',
    sayHi: function () {
        console.log('hi ' + this.name);
    },
};

var obj2 = {
    // ES6
    name: 'Lee',
    sayHi() {
        console.log('hi ' + this.name);
    },
};
```

> 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다. -> 26.2 메소드 참고
