- [Type(타입)](#type타입)
  - [타입 추론](#타입-추론)
  - [튜플](#튜플)
  - [enum](#enum)
  - [유니언 타입](#유니언-타입)
  - [함수 타입](#함수-타입)
  - [unknown 타입](#unknown-타입)
  - [never 타입](#never-타입)

# Type(타입)

## 타입 추론

-   선언과 동시에 initialize를 하면 타입스크립트가 자동으로 타입 추론을 해줌.
-   선언만 하고 initialize를 안하면 타입 추론이 안되기 때문에(any로 되나?) 타입을 명시하라는 경고문이 뜸.

```tsx
let numb = 5;
numb = '3'; // number type 만 가능하다는 에러 뜸.

// 'numb' 변수는 암시적으로 'any' 형식이지만, 사용량에서 더 나은 형식을 유추할 수 있습니다.
let example;

// best case
let example: string;
example = 'hello';
```

## 튜플

-   자바스크립트에는 없는 타입
-   타입스크립트에 의해 추가 되었음.
-   fixed-length & fixed-type array

    ```tsx
    type Person = {
        name: string;
        age: number;
        hobbies: string[];
        role: [number, string];
    };

    const person: Person = {
        name: 'bawi',
        age: 26,
        hobbies: ['Sports', 'Cooking'],
        role: [2, 'student'],
    };

    // type error: 'number' 형식은 'string' 형식에 할당할 수 없다
    person.role[1] = 3;

    // person은 길이가 2인 튜플이어야 함.
    // BUT -> push 메소드 tuple에 대해 에러가 안난다.
    person.role.push('chief');

    // type error: '[]' 형식은 '[number, string]' 형식에 할당할 수 없다.
    person.role = [];
    // 통과
    person.role = [1, 'admin'];
    ```

## enum

-   javascript common case

    ```tsx
    const STUDENT = 0;
    const CHIEF = 1;
    const ADMIN = 2;

    const person = {
        name: 'bawi',
        age: 26,
        hobbies: ['Sports', 'Cooking'],
        role: STUDENT, // role의 타입은 number으로 추론됨.
    };

    if (person.role === 1) {
        // 1이 무엇을 의미하는지 찾아야 함
        console.log('student');
    }
    ```

-   enum 사용

    ```tsx
    enum Role {
        STUDENT,
        CHIEF,
        ADMIN,
    }

    const person = {
        name: 'bawi',
        age: 26,
        hobbies: ['Sports', 'Cooking'],
        role: Role.STUDENT, // role의 타입은 Role로 추론됨.
    };

    if (person.role === Role.STUDENT) {
        // 코드가 무엇을 의미하는지 훨씬 알아보기 편함.
        console.log('student');
    }
    ```

## 유니언 타입

-   OR
-   숫자가 들어오면 덧셈 연산, 문자열이 들어오면 문자열을 합쳐주는 연산을 위한 combine 함수를 만들고 싶음.

    ```tsx
    function combine(input1: number | string, input2: number | string) {
        let result = input1 + input2; // type error
        return result;
    }

    console.log(combine(3, 5));
    ```

    '+' 연산자를 'string | number' 타입에 적용할 수 없다.

    ```tsx
    function combine(input1: number | string, input2: number | string) {
        let result;
        if (typeof input1 === 'number' && typeof input2 === 'number') {
            result = input1 + input2;
        } else result = input1.toString() + input2.toString();

        return result;
    }

    console.log(combine(3, 5));
    ```

    둘 다 숫자인 경우만 덧셈 연산이 되도록 처리해주면 된다.

## 함수 타입

-   함수 타입은 function notation에 의해 생성된다. `() => ()`
-   어떤 param을 받고, 어떤 값을 반환할지 정의할 수 있게 해준다.

    ```tsx
    function add(n1: number, n2: number) {
        return n1 + n2;
    }

    function printResult(num: number): void {
        console.log('Result: ', num);
    }

    let combineValues: Function;
    combineValues = printResult;

    console.log(combineValues(8, 8));
    ```

    combineValues = add가 되어야 하는데, printResult 함수가 들어감. ⇒ combineValues의 타입으로 Function이 들어갔기 때문에 typescript는 이런 에러를 잡지 못한다.

    ```tsx
    let combineValues: (n1: number, n2: number) => number;
    combineValues = printResult;

    console.log(combineValues(8, 8)); // error
    ```

-   callback example

    ```tsx
    function add(n1: number, n2: number) {
        return n1 + n2;
    }

    function printResult(num: number): void {
        console.log('Result: ', num);
    }

    function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
        const result = n1 + n2;
        cb(result);
    }

    addAndHandle(3, 5, printResult);
    ```

## unknown 타입

-   any 보다 제한적인 타입이다.

    ```tsx
    let userInput: unknown;

    userInput = 4;
    userInput = '4';
    ```

    ```tsx
    let userInput: unknown;
    let userName: string;

    userInput = 4;
    userInput = 'bawi';
    userName = userInput; // error -> 'unknown' 형식은 'string' 형식에 할당할 수 없다.
    ```

    userInput의 타입을 any로 바꾸면 에러가 안난다. → typescript는 any 타입을 사용할 경우 타입 체크를 disable 시키기 때문.

    ```tsx
    let userInput: any;
    let userName: string;

    userInput = 4;
    userInput = 'bawi';
    userName = userInput;
    ```

    unknown 타입을 쓰고 싶은 경우 쓰기 전 타입 체크를 해주면 된다.

    ```tsx
    let userInput: unknown;
    let userName: string;

    userInput = 4;
    userInput = 'bawi';

    if (typeof userInput === 'string') {
        userName = userInput;
    }
    ```

    특정 타입으로 고정되어있는 변수에 unknown 타입을 assign 시키고 싶은 경우에는 assign 전에 타입 체크를 해주면 된다.

-   어떤 타입을 저장할지 모를 때는 any 보다 unknown을 쓰는 것이 더욱 안전하다. (unknown도 쓰지 않는 것이 good)

## never 타입

```tsx
function generateError(message: string, code: number): never {
    throw {
        message,
        errorCode: code,
    };
}

const result = generateError('An error occured!!', 500);
console.log(result);
```
