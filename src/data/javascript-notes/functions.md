## Functions


```js
// Function Declaration // Pros we can call Before Declaration
function addNumbers(a, b) {
    return a + b;
}
x = addNumbers(1, 2);
console.log(x); // 3

// Function Expression  // Can't call before Declration
const birthYear = 2002;
const calcAge = function (birthYear) {
    return 2022 - birthYear;
};
console.log(calcAge(birthYear)); // 20

// Arow function
const calcAge2 = birthYear => 2022 - birthYear;

// Arrow functions with more than one Variablea
const yearsUntilRetirment = (birthYear, firstName) => {
    const age = 2022 - birthYear;
    const retirment = 65 - age;
    return `${firstName} retires in ${retirment} years`;
};
console.log(yearsUntilRetirment(2002, 'Chandraprakash'));
```

### Default Arguments

```js
const bookings = [];
const createBooking = function (
    flightNum,
    numPassenger = 1, // default Variables
    price = 199 * numPassenger // Using Expression on alredy defined variable
) {
    const booking = {
        flightNum, // Direct object declaration
        numPassenger,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};
createBooking('LH123'); // Passing only one arrgument
createBooking('LH123', 2, 800);
createBooking('LH123', 2); // Calculating price value depending upon passneger
createBooking('LH123', 5);
createBooking('LH123', undefined, 50); // set any value to undefined to skip that value and make it default
console.log(bookings); // Loging all the booking
```

### How passing argument Works :: value vs. Refrence

```js
const flight = 'LH123';
const jonas = {
    name: 'Jonas Schmendtmann',
    passport: 646513132,
};

const checkIn = function (flightNum, passneger) {
    flightNum = 'LH999';
    passneger.name = 'Mr.' + passneger.name;

    if (passneger.passport === 646513132) {
        // alert('CheckIn');
    } else {
        // alert('Wrong Passport');
    }
};
checkIn(flight, jonas);
console.log(flight, jonas); // LH123 {name: 'Mr.Jonas Schmendtmann', passport: 646513132}

// When we pass any primitive data type the copy of data is passed
// But When we pass Object in Function the Refrence is passed not the copy with that :::
// when we change in the function it change the refrence and Orignal One Becuse  it is Saved in memorry Heap
```

### First Class and Higher Order Function

- First Class Function => JavaScript treats function as first-class Citizen =>
- This means that functions are simply values =>
- Functions are just another Object
- Just a concept that a Programming Language as or not :::

#### Some Properties of First-Class Functions

- **Store Functions in Variables or Properties**

    ```js
    const add = (a, b) => a + b;
    ```

    ```js
    const conuter = {
        value: 23,
        inc: function () {
            this.value++;
        },
    };
    ```

- **Pass functions as Argumnets to OTHER functions**

    ```js
    const greet = () => console.log('hey Chandr Prakash');
    btnClose.addEventListener('click', greet);
    ```

- **Return Functon from Function**
- **Call methods on functions:**

    ```js
    counter.inc.bind(someOtherObject);
    ```

### Higher Order Functions

- A function that **receives** another function as an argument, that **return** a new function, or **both**
- Is in practise when lang => Supports the **First class Function**

#### Some Properties of Higher-Order Functions

##### Function that recevies another function

    ```js
    const greet = () => console.log("Hey ChandrPrakash);
    btnClose.addEventListener('click', greet)
    // addEventListener is a Higher-order function
    // greet is CallBack Function
    ```

##### Function that returns a new function

```js
function count() {
    // ⇑ Higher Order Function
    let counter = 0;
    return function () {
        // ⇑ Returned Function
        counter++;
    };
}
```

#### Implimentation

##### Function Accepting CallBacks

```js
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
    const [first, ...other] = str.split(' ');
    return [first.toUpperCase(), ...other].join(' ');
};

// Higher Order Functions
const transformer = function (str, fn) {
    // fn is callback function
    // Higher order Function does not consist of Main logic
    // It depend Upon the lower order function
    // Higher Order function doesn't know what to do
    console.log(`Orignal String: ${str}`);
    console.log(`Transformed String: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the Best', upperFirstWord);
// Orignal String: JavaScript is the Best
// Transformed String: JAVASCRIPT is the Best
// Transformed by: upperFirstWord
transformer('JavaScript is the Best', oneWord);
// Orignal String: JavaScript is the Best
// Transformed String: javascriptisthebest
// Transformed by: oneWord

// Js uses callbacks all the Time
const high5 = function () {
    console.log('👋');
};

document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
```

##### Function Returninng the Function

```js
// Function Expression
const greetExp = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};
const greetHey = greetExp('Hey');
greetHey('Jonas');
greetHey('Chandraprakash');

greetExp('Hello')('Chandra Prakash');

// Arrow Function ( confusing )
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Chandra Prakash');
```

##### Call Method

```js
const luthansa = {
    airline: 'luthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name,
        });
    },
};
luthansa.book(234, 'Jonas Schmendtmann');

const eurowing = {
    name: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = luthansa.book;

// book(23, 'Sarah Williams'); // Here this keyword in book function will be undefined so it will bring Error
// Book is Just a normal function not and method

// Call Method
book.call(eurowing, 543, 'Chandraprakash'); // Here we are settings that `this` keyword should point to eurowing

book.call(luthansa, 654, 'ChandrPrakash');
```

##### Apply Method

Takes two argument 1. this keyword Point 2. array of argument should pass to book fun.

```js
const bookingData = [332, 'Mary Will'];
book.apply(luthansa, bookingData); // Not Used More in Mordern JS
console.log(luthansa);

// apply alt.
book.call(eurowing, ...bookingData); // Spread Opertaor Convert array to comma Sperated Values
console.log(eurowing);
```

##### Bind Method

```js

// bind method creates new function ::: that functions ""this"" keyword points to the object that is binded
const bookEW = book.bind(eurowing);
bookEW(23, 'Stewen');

// Giving the default argument to the returned function
const bookEW23 = book.bind(eurowing, 23);
bookEW23('Chandraprakash');

// Practical Use
luthansa.planes = 300;
luthansa.buyPlane = function () {
console.log(this);

this.planes++;
console.log(this.planes);
};

// in Event handler the function passed in always point to the element we are giving event
document.querySelector('.buy').addEventListener('click', luthansa.buyPlane); // <button class="buy">Buy new plane 🛩</button> NaN

// We need to give the this keyword manualy
document
.querySelector('.buy')
.addEventListener('click', luthansa.buyPlane.bind(luthansa));
// {airline: 'luthansa', iataCode: 'LH', bookings: Array(3), planes: 300, book: ƒ, …}
// 301

// Partial Application
const addtax = (rate, value) => value + value \* rate;
console.log(addtax(0.1, 100));

const addVAT = addtax.bind(null, 0.23);
// addVAT = value => value + value \* .23

console.log(addVAT(100));
console.log(addVAT(23));

const addtaxNoBind = function (rate) {
return function (value) {
return value + value \* rate;
};
};

const rate23 = addtaxNoBind(0.23);
console.log(rate23(100));
console.log(rate23(23));

```

### Imediately Invoked Functions

```js
(function () {
    console.log('This Only Run Once');
})();

(() => {
    console.log('Arrow only once');
    const isPrivate = 23; // Scoped Variable Cant't Accese from Outside
})();

{
    const isPrivte = 40; // Private blovked Scoped
    var notPrivate = 46; // Not Privte Functional Scope
}
```

