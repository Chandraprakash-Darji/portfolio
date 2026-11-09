## Arrays


```js
// Methoda 1 of declaring Arrays
const friends = ['Ankit', 'Dave', 'Jonas'];
console.log(friends);

// Method 2 of Declaring Arrays
const years = new Array(1991, 1992, 1993, 1994, 1995, 1996, 1997);
console.log(years);

// Access the Elements
console.log(friends[0], years[3]);

// length of Arrays
console.log(friends.length);

// Last item of Array
console.log(friends[friends.length - 1]);

// Changing Element
friends[1] = 'Jay';
console.log(friends);

// Diffrent type of Data
const chandraPrakash = [
    'ChandraPrakash',
    'Darji',
    2022 - 2002,
    'India',
    friends,
];
console.log(chandraPrakash);

// Pushing Element
const NewLength = friends.push('C2'); // Element is pushed and NewLenght is Returned
console.log(friends, NewLength);

// Push Element at index 0
friends.unshift('Raj');
console.log(friends);

// Remove Element
const popedValue = friends.pop();
console.log(friends, popedValue);

// Remove first Element
friends.shift();
console.log(friends);

// find Element
console.log(friends.indexOf('Jay')); // 1
console.log(friends.indexOf('Jay2')); // -1 means not Exist

// check if exist
console.log(friends.includes('Jay')); // true

// Distructuring( Unpacking ) the Array
const arr = [2, 3, 4];
const [x, y, z] = arr;
console.log(x, y, z); // 2 3 4

const categories = ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'];
const [main, , secondary] = categories; // mainn = "IOItalian" and secondary = "Vegetarian"
[secondary, main] = [main, secondary]; // main <-> secondary

const nested = [2, 3, [4, 5]];
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 4 5

const [p, q, r] = [2, 5]; // p = 2 ::: q = 5 ::: r = undefined
const [p = 1, q = 1, r = 1] = [2]; // p = 2 ::: q = 1 ::: r = 1

// 1. SLICE Method
let arr = ['a', 'b', 'c', 'd', 'f'];
console.log(arr.slice(2)); // element from 2 index to end :: ['c', 'd', 'f']]
console.log(arr.slice(2, 4)); // element from 2 index to 3 ['c', 'd']
console.log(arr.slice(-2)); // negative number means from end of the array :: ['d', 'f']
console.log(arr.slice(2, 4)); // element from 2 index to 3 ['c', 'd']
console.log(arr.slice(2, -2)); // ["c"]
console.log(arr.slice()); // full copy of orignal Array

// 2. SPLICE
console.log(arr.splice(2)); // [ "c", "d", "f" ]
console.log(arr); // [ "a", "b" ] // Extracted element is removed

// 3. REVERSE
arr = ['a', 'b', 'c', 'd', 'f'];
let arr2 = ['j', 'k', 'i', 'g'];

console.log(arr2.reverse()); // Reverse the original array and return it
console.log(arr2); //  [ "g", "i", "k", "j" ]

// 4. CONCAT
const letters = arr.concat(arr2); // Adding 2 array :: didn't change orrignal
console.log(letters); //  [ "a", "b", "c", "d", "f", "g", "i", "k", "j" ]​

// 5. JOIN
console.log(letters.join(' - ')); // a - b - c - d - f - g - i - k - j
// Join array items by any seprater
```

**Map method**

Map returns a new array containg the result of pplying operation on all original elements.

In Map method also like forEach callback function ::: first argument -> element ::: second -> index ::: third argument -> Array.

```js
// Map method :: Don't change Orignal Array
const eurToUsd = 1.1;
const moveUsd = movements.map(mov => mov * eurToUsd);

console.log(movements); //  [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(moveUsd); // [ 220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002 ]
```

**Filter Method**
Filter returns a new array contaning the array elements that passed a specified text condition

Returns the whole array matches the condition

```js
const deposit = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);

console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(deposit); // [ 200, 450, 3000, 70, 1300 ]
console.log(withdrawal); // [ -400, -650, -130 ]
```

**Find Method** Returns the element that matches the given Condition

```js
// FIND Method - returns only first element matchs the condition
let finded = movements.find(mov => mov < 0);
console.log(`First Withdrawal ${finded}`);
```

**FindIndex Method** Returns the element that matches the given Condition

```js
// FindIndex Method - returns only first index that matchs the condition
let index = movements.findIndex(mov => mov === 200);
console.log(`First 200 Withdrawal was you ${index} transaction`);
```

**Some Method** Returns the true/false that when any element matches the given Condition

```js
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
// Equality
console.log(movements.includes(-130)); // true

// Condition
console.log(movements.some(mov => mov > 1500)); // true
```

**Every Method** Returns the true/false when all element matches the given Condition

```js
// Every Method
console.log(movements.every(mov => mov > 1500)); // false
```

**Reduce Method**
Reduce boils("Reduces") all the array elements down to one single value (e.g. adding all the elements together)

```js
// REDUCE method
console.log(movements);
const balance = movements.reduce((acc, cur, i, arr) => {
    console.log(`Iteration ${i}: Accumulator is ${acc}`);
    // acc :: accumulator value saved in acc
    // cur :: current number
    // i :: index
    // arr :: actuall arr
    /* Output ::: Iteration 0: Accumulator is 0 
                Iteration 1: Accumulator is 200 
                ...
                Iteration 7: Accumulator is 2540
  */
    return acc + cur;
}, 0);
console.log(balance); // 3840

// Finding Max Number
console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
const maxMov = movements.reduce(
    (acc, cur) => (acc > cur ? acc : cur),
    movement[0]
);
console.log(maxMov); // 3000
```

**Flat Method** Remve Nesting from Array

```js
const arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const arrDeep = [
    [1, 2, 3],
    [4, 5, 6, [7, 8, 9, [0]]],
];
console.log(arrDeep.flat()); // [1, 2, 3, 4, 5, 6, Array(4)]
// Only flat till level 1
console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, Array(1)]
console.log(arrDeep.flat(10)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
```

**Flatmap Method** Map Every element of array and then flat at the same time. Flat map only flat till level 1.

```js
const accc = [
    {
        owner: 'Jonas Schmedtmann',
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    },
    {
        owner: 'Jessica Davis',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    },
    {
        owner: 'Steven Thomas Williams',
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
    },
    {
        owner: 'Sarah Smith',
        movements: [430, 1000, 700, 50, 90],
    },
];
const balance = accc
    .flatMap(acount => acount.movements)
    .reduce((acc, val) => acc + val, 0);
console.log(balance); // 17840
```

**Sorting the Array**

```js
const owners = ['Jonas', 'Zach', 'Chandraprakash', 'Charli'];
console.log(owners); // ['Jonas', 'Zach', 'Chandraprakash', 'Charli']

console.log(movements); //  [200, 450, -400, 3000, -650, -130, 70, 1300]

movements.sort();

console.log(movements); // [-130, -400, -650, 1300, 200, 3000, 450, 70]
// Sort the numbers as they are strings not as number

movements.sort((a, b) => (a > b ? 1 : -1));
// if a > b then it will return 1 => means swap the numbers
// vice-versa b > a then return -1 => means not swap
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]

// to change accending to decending just change the condition or the return value
// you can give any value in place of -1 or 1 value should be positive or negative

movements.sort((a, b) => b - a);
console.log(movements); //  [3000, 1300, 450, 200, 70, -130, -400, -650]
// Here b - a will be positive when b > a and positive value means swap the number and all will organize in decending order
```

**More Ways of creating and Filling Array**

```js
// Filling items in array
//Creating array manually
const x = new Array(7);
console.log(x); // Array(7) [ <7 empty slots> ]
// Empty Array with 7 slot

// On these array we can only use
x.fill(2);
console.log(x); // [ 2, 2, 2, 2, 2, 2, 2 ]

// FILL method can be use on any array
x.fill(1, 3, 6);
console.log(x); // [ 2, 2, 2, 1, 1, 1, 2 ]
// Mutate the orignal array 1st param: what to fill 2nd params: from where to fill 3rd params: till what :: it will fill till end - 1

// Araay.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); //  [ 1, 1, 1, 1, 1, 1, 1 ]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [ 1, 2, 3, 4, 5, 6, 7 ]

const movementUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementUI); // Array(8) [ div.movements__value, .... , div.movements__value ]

// MovementUI is Now array we can easily perform method like map or the reduce
console.log(movementUI.map(el => Number(el.textContent.replace('€', '')))); //[ 1300, 70, -130, -650, 3000, -400, 450, 200 ]

// Second Arrgument in Array.from is mapping call back that you no need to map sepratly
const movementUI2 = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
);
// directly got the array
console.log(movementUI2); // [ 1300, 70, -130, -650, 3000, -400, 450, 200 ]
```

**Which Method When to Use**

> What I Actually Want...

1. To Mutate original Array

    - Add to Original:
        > .push (end)
        > .unshift (start)
    - Remove from Original
        > .pop (end)
        > .shift (start)
        > .splice (any)
    - Others
        > .reverse
        > .sort
        > .fill

2. A new Array

    - Computed from Original
        > .map (loop)
    - Filteres using condition
        > .filter
    - Portion of Original
        > .slice
    - Adding original to other
        > .concat
    - Flattening the original
        > .flat
        > <br>
        > .flatMap

3. An Array index

    - Based on value:
        > .indexOf
    - Based on test condition:
        > .findIndex

4. An array Element
    - Based on test condition:
        > .find
5. Know if array includes

    - Based on value:
        > .includes
    - Based on test condition:
        > .some
        > <br>
        > .every

6. A new String

    - Based on separator string:
        > .join

7. To transform to value
    - Based on accumulator:
        > .reduce (Boil down array to single .filter .findIndex .some (loop) value of any type: number, string, boolean, or even new array or object)
8. To jusst loop array
    - Based on callback:
        > .forEach (Does not create a new array, just loops over it)

