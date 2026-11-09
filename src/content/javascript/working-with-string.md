## Working With String


```js
// Working With String
const airline = 'TAP Air Portugal';

// Accesing the character with indexing
console.log(airline[0]); // T
console.log(airline[1]); // A
console.log(airline[2]); // P

// to infd the lenght of String
console.log(airline.length); // 16

// To find the index of Character
console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('Portugal')); // 8

// to Slice the charater
console.log(airline.slice(4)); // one Argument = start
console.log(airline.slice(0, 4)); // two argument = start,end
console.log(airline.slice(-8)); // Counting from ending

// Sreing are also Objects that are converted to object when method is called
console.log(new String('Jonas'));
console.log(typeof new String('Jonas'));

console.log(airline.toLowerCase()); // Lower casw
console.log(airline.toUpperCase()); // Upper case

// Fixing Capitilaziation of name
const fixName = function (peopleName) {
    return peopleName.toUpperCase()[0] + peopleName.toLowerCase().slice(1);
};
console.log(fixName('ChaNDRAPrakASH'));

// To Comparing user email
const email = 'hello@chandraprakash.com';
const loginEmail = '    HeLLo@ChanDRApraKash.Com       \n';

const proccesedEmail = loginEmail.toLowerCase().trim();
console.log(proccesedEmail === email && 'Login Email is valid');
console.log(proccesedEmail);

// Replacing part of String
const priceGB = '288,56£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcment = 'All passenger come boarding door 23. Boarding door 23!';

console.log(announcment.replace('door', 'gate')); // Change only the first Occurence
// console.log(announcment.replaceAll('door', 'gate')); // Method gonna come in the Future
console.log(announcment.replace(/door/g, 'gate')); // Change with the Regular Expression to Change All Occurence

// Bollean
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); // true
console.log(plane.includes('blue')); // false
console.log(plane.startsWith('Air')); // true

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of NEW Airbus Family.🙂');
}

// Practise Exersise
const checkBaggage = function (items) {
    items = items.toLowerCase();
    if (items.includes('gun') || items.includes('knife')) {
        console.log('Your Not Allowed. 💥');
    } else {
        console.log('You can Board. 🙂');
    }
};
checkBaggage('I have a laptop, Some Food and a pocket Knife');
checkBaggage('Socks and Camera');
checkBaggage('Got some snacks and a gun for protection');

// Spliting the String
console.log('a+very+nice+string+by+made+with+plus+sign'.split('+')); // ['a', 'very', 'nice', 'string', 'by', 'made', 'with', 'plus', 'sign']

const [firstName, lastName] = 'Chandrprakash Darji'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); // Mr. Chandrprakash DARJI
console.log(newName);

const capitalizeName = function (name) {
    name = name.split(' ');
    name.forEach(nam => {
        // name[name.indexOf(nam)] = nam[0].toUpperCase() + nam.slice(1).toLowerCase(); // Make to Parts and Capitalized
        name[name.indexOf(nam)] = nam.replace(nam[0], nam[0].toUpperCase()); // replacing first Character ...
    });
    console.log(name.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('chandrprakash darji');

// padding String
const message = 'Go to Gate no. 23';
console.log(message.padStart(20, '+').padEnd(30, '+')); // +++Go to Gate no. 23++++++++++
console.log('ChandrPrakash'.padStart(20, '+').padEnd(30, '+')); // +++++++ChandrPrakash++++++++++

// Exapmle
const maskCreditCard = function (number) {
    const str = number + '';
    return str.slice(-4).padStart(str.length, '*');
};
console.log(maskCreditCard(6548736)); // ***8736
console.log(maskCreditCard(46557895613266)); // **********3266
console.log(maskCreditCard('4655789613264659876')); // ***************9876

const badWaeatherMsg = 'Bad weather... All Ddepartues Delayed... ';
console.log(badWaeatherMsg.repeat(5)); // Bad weather... All Ddepartues Delayed... Bad weather... All Ddepartues Delayed... Bad weather... All Ddepartues Delayed... Bad weather... All Ddepartues Delayed... Bad weather... All Ddepartues Delayed...

const planeInLine = function (n) {
    console.log(`There are ${n} planes in line... ${'✈️'.repeat(n)}`);
};
planeInLine(5); // There are 5 planes in line... ✈️✈️✈️✈️✈️
planeInLine(12); // There are 12 planes in line... ✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️
planeInLine(2); // There are 2 planes in line... ✈️✈️

// Practise Question to Understand String Methods
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

flights.split('+').forEach(flightEntrie => {
    let [status, fromPoint, toPoint, time] = flightEntrie.split(';');

    const outPut = `${
        status.startsWith('_Delayed') ? '🔴' : ''
    }${status.replaceAll('_', ' ')} from ${getCode(fromPoint)} to ${getCode(
        toPoint
    )} (${time.replace(':', 'h')})`.padStart(45);
    console.log(outPut);

    /*Output --->>  🔴 Delayed Departure from FAO to TXL (11h25)
                              Arrival from BRU to FAO (11h45)
                    🔴 Delayed Arrival from HEL to FAO (12h05)
                             Departure from FAO to LIS (12h30)
  */
});
```

