## Data Strucutres


### List of data Strucures

- [Arrays](/learn/javascript/arrays#arrays)
- [Objects](/learn/javascript/objects#objects)
- [Sets](/learn/javascript/sets#sets)
- [Maps](/learn/javascript/maps#maps)

### Sources of Data

1. **From the Program itself:** Data written directly in source code (e.g. status messages)
2. **From the UI:** Data input from user or the data written in DOM (e.g. tasks in todo app)
3. **From external sources:** Data fetched for example from web API (e.g. recipe objects)

**->** Collection of data **->** Data Structures **->** 1. Simple List [ ARRAYS or SETS] && 2. Key/Value Pairs [OBJECTS or MAPS] (keys allow us to decribe values )

### Usess of Arrays

- ```js
    const task = ['eat', 'code', 'sleep', 'repeat'];
    ```

- Use when you need ordered list of values (might contain duplicates)
- Use when you need to manipulate data

### Usess of Sets

- ```js
    const = new Set(['eat', 'code', 'sleep', 'repeat']);
    ```

- Use when you need to work with unique values
- Use when high-performance is really important
- Use to remove duplicates from arrays

### Usess of Object

- ```js
    const task = {
        task: 'code',
        date: 'today',
        repeat: true,
    };
    ```

- More “traditional” key/value store (“abused” objects)
- Easier to write and access values with . and []
- Use when you simply need to map key to values
- Use when you need keys that are not strings
- Use when you need to include functions (methods)
- Use when working with JSON (can convert to map)

### Usess of Maps

- ```js
    const task = new Map([
        ['task', 'Code'],
        ['date', 'today'],
        [false, 'Start Coding'],
    ]);
    ```

- Better performance
- Keys can have any data type
- Easy to iterate
- Easy to compute size
- Use when you simply need to map key to values
- Use when you need keys that are not strings

### Basic Data Structures

#### Numbers

```js
console.log(23 === 23.0); // true
// Real life Numbers are Base 10 // 0-9
// Js - Binary Base 2  // 0-1

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// String to Number
console.log(Number('23'));
console.log(+'23');

// Parsing => Remove any Alpha But should start from number
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('e30px')); // NaN

console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5

// Number is Global No need to Wright Number
console.log(parseInt('3rem')); // 3

// Check if Value is Not a number => Value can be anything but NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN('20X')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(20 / 0)); // false

// Check if value is Number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite('20X')); // false
console.log(Number.isFinite(20 / 0)); // false

//Check if Number is intergger or Not
console.log(Number.isInteger(20)); // true
console.log(Number.isInteger(20.0)); // true
console.log(Number.isInteger(20 / 0)); // false

console.log(Math.sqrt(25)); // 5 Square Root
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2

// Max and Min Value
console.log(Math.max(3, 4, 12, 47, 54, 2, 23, 43, 55, 35, 45)); // 55
console.log(Math.max(3, 4, 12, 47, '54', 2, 23, 43, 55, 35, 45)); // 55
console.log(Math.max(3, 4, 12, 47, '54px', 2, 23, 43, 55, 35, 45)); // NaN
console.log(Math.min(3, 4, 12, 47, 54, 2, 23, 43, 55, 35, 45)); // 2

console.log(Math.PI); // 3.141592653589793

console.log(Math.trunc(Math.random() * 6) + 1); // any Number from 1 to 6

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min; // generalized Function for random Number

console.log(Math.trunc(34.343267)); // 34 removes value after deciaml point

console.log(Math.round(25.3)); // 25 // round the Number
console.log(Math.round(25.9)); // 26

console.log(Math.ceil(25.3)); // 26 // Round to UpSide
console.log(Math.ceil(25.9)); // 26

console.log(Math.floor(25.3)); // 25 // Round to DownSide
console.log(Math.floor(25.9)); // 25

console.log(Math.trunc(-25.9)); // -25 // removed after Point
console.log(Math.floor(-25.9)); // -26 // properly rounded

// Rounding decimals ".toFixed" returns String not Number
console.log((2.7).toFixed(0)); // "3"
console.log((2.7).toFixed(3)); // "2.700"
console.log((2.734).toFixed(4)); // "2.7340"
console.log(+(2.743).toFixed(2)); // 2.74

// Remainder
console.log(5 % 2); // 1
console.log(5 / 2); // 2 * 2 = 4 + 1 = 5

// Check for Even=Odd
console.log(5 % 2 === 0); // false
console.log(4 % 2 === 0); // true
```

#### BigInt

```js
// Largest Number In JS
// Total 64 bits are used to store number
// from 64 53 are used to store number other are used to store sign and decimal point of number
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994
console.log(2 ** 53 + 3); // 9007199254740996
console.log(2 ** 53 + 4); // 9007199254740996 => Not Proper Result
// To create BigInt In JS for Larger Number => Just Put "n" beside it. You good to Go...
console.log(73657836895436789405789054864637665436728n);
console.log(BigInt(43234324)); // Function to create number

// Operation
console.log(2000n + 1234n); // 3234n
console.log(3124235542353452345n * 43768342656784435n); // 136742611758230662608192758710250075n

const huge = 1783124987173656782350871n;
const num = 29;
// console.log(huge * num); Not Posible :: You can't add normal and BigInt Number
console.log(huge * BigInt(num)); // 51710624628036046688175259n

// Exception
// Math.sqrt(16n); :: No Math fun Can applicable
console.log(20n > 10); // true
console.log(20n > 30); // false
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
console.log(20n === '20'); // false

console.log(huge + ' is REALLY BIG !!!'); // 1783124987173656782350871 is REALLY BIG !!! script.js:400:9

// Division
console.log(11n / 3n); // 3n => Removes number after decimal
console.log(11 / 3); // 3.6666666666666665
```

#### Date

```js
// Create a Date
const now = new Date();
console.log(now); // Date Fri Feb 25 2022 19:16:01 GMT+0530 (India Standard Time)

console.log(new Date('Fri Feb 25 2022 19:15:50')); // Date Fri Feb 25 2022 19:15:50 GMT+0530 (India Standard Time)
console.log(new Date('DEcember 24, 2015')); // Date Thu Dec 24 2015 00:00:00 GMT+0530 (India Standard Time)

console.log(new Date(account1.movementsDates[0])); // Date Fri Nov 01 2019 18:45:33 GMT+0530 (India Standard Time)

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Date Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)
console.log(new Date(2037, 10, 33)); // Date Tue Nov 19 2019 03:01:17 GMT+0530 (India Standard Time)
console.log(new Date(0)); // Unix Time // Date Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after unix time // Date Sun Jan 04 1970 05:30:00 GMT+0530 (India Standard Time)

const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Date Thu Nov 19 2037 15:23:00 GMT+0530 (India Standard Time)
console.log(future.getFullYear()); // 2037 -> full year
console.log(future.getMonth()); // 10 -> Month 0 based -> Jan - 0
console.log(future.getDate()); // 19 -> Date
console.log(future.getDay()); // 4 -> Day of the week
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0

console.log(future.toISOString()); // -> 2037-11-19T09:53:00.000Z -> Universal time string
console.log(future.getTime()); // 2142237180000 -> milisecond passed till now

console.log(new Date(2142237180000)); // milisecond to know the time

console.log(Date.now()); // current time

future.setFullYear(2040); // Set the new year
future.setMonth(12);
future.setDate(11);
future.setHours(2);
future.setMinutes(45);
future.setSeconds(0);

console.log(future); // Fri Jan 11 2041 02:45:00 GMT+0530 (India Standard Time)

// Operation On date
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); // 2142237180000 -> Total milisecond

const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 10, 14), new Date(2037, 10, 20));
console.log(days1); // 6
```

#### Intl NameSpace

Internationalization API - To convert your Data international like Dates, NUmbers, Plural Rules,etc Full read [MDN - Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

```js
const now = new Date();
const locale = navigator.language; // "en-US" // Your Browser Language
console.log(
    new Intl.DateTimeFormat(locale, {
        timeStyle: 'short',
        dateStyle: 'short',
    }).format(now)
); // 2/27/22, 2:47 PM
console.log(
    new Intl.DateTimeFormat(locale, {
        timeStyle: 'long',
        dateStyle: 'long',
    }).format(now)
); // February 27, 2022 at 2:47:28 PM GMT+5:30

const number = 123456.789;
console.log(
    new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(number)
);
// expected output: "123.456,79 €"

// the Japanese yen doesn't use a minor unit
console.log(
    new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
    }).format(number)
);
// expected output: "￥123,457"

// limit to three significant digits
console.log(
    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
        number
    )
);
// expected output: "1,23,000"

let amount = 3500;
new Intl.NumberFormat('en-US', { style: 'decimal' }).format(amount);
// → '3,500'
new Intl.NumberFormat('en-US', { style: 'percent' }).format(amount);
// → '350,000%'
```

