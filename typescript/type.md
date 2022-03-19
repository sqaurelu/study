- [Type(타입)](#type타입)
  - [타입 추론](#타입-추론)
  - [튜플](#튜플)
  - [enum](#enum)

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
