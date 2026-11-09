## Type Conversion and Coercion


- [Type Conversion](/learn/javascript/type-conversion-and-coercion#type-conversion) Changing type of the Data explicitly.
- [Type Coercion](/learn/javascript/type-conversion-and-coercion#type-coercion) Javascript changing type of the Data implicitly.

### Type Conversion

```js
const inputYear = '1991';
// number() for String to Number
console.log(Number(inputYear), inputYear); // 1991 '1991'
console.log(Number(inputYear) + 18); // 2009

console.log(Number('ChandraPrakash')); // NaN

// String() for Number to String
console.log(String(23)); // 23
```

#### Falsy values

[ 0 , "" , undefined , null , NaN , false ] are false if they are converted to Boolean

```js
console.log(Boolean(0)); // false
console.log(Boolean('')); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(false)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
```

#### Truely Value

All values are truely if it is not [ 0 , "" , undefined , null , NaN , false ]

### Type Coercion

```js
// 23 Automatically converted to String while logging the String.
// " + " convert number to String
console.log('I am ' + 23 + ' years old.'); // I am 23 years old.

// " - " , " / " , " * "  and also logical operators
// convert String to Number
console.log('23' - '10' - 3); // 10
console.log('23' > '10'); // true

// Example
let n = '1' + 1; // 11
n = n - 1; // 10
console.log(n);
```

