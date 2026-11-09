## WHAT ARE PROMISES?


👉 Promise: An object that is used as a placeholder for the future result of an asynchronous operation.
👉 Promise: A container for an asynchronously delivered value.
👉 Promise: A container for a future value.
👉 We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results;
👉 Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell 🎉

`XMLHttpRequest()` requries a event Listener and callback to load a respomse

```js
const country = 'india';
const request = new XMLHttpRequest(); // Create a Request
request.open('GET', `https://restcountries.com/v2/name/${country}`); // Set the request server link
request.send(); // Sending the request

request.addEventListener('load', function () {
    // checking for request to load
    const response = JSON.parse(this.responseText);
    console.log(response);
});
```

Fetch API depends on promise

```js
const country = 'india';
// request for data
fetch(`https://restcountries.com/v2/name/${country}`)
    // after coming the request converted to json
    .then(response => response.json())
    // After converted to json then renderCountry our Function is executed
    .then(datts => renderCountry(datts));
```

### Fetch API

```js
const getJSON = (url, errorMsg = 'Something went Wrong') => {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // 3. if response is not ok then throw the error
        // that will catch by the catch function at the End
        return response.json(); // 4. for ok response it will convert to json and send it
    });
};

const getCountryData = country => {
    btn.style.opacity = 0;
    getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not Found') // 2. getJson fun() will fetch the data
        .then(datts => renderCountry(datts)) // 5. after getting the data renderCountry
        // will run that will pprocess the data and display the country data
        .catch(err => {
            // 6. If any error encountered will these
            // proceess it will display by the catch block
            // throw are also deplayed here only
            console.error(err, '🔥🔥🔥');
            // renderError just append the text to html
            renderError(`Something went wrong 🔥 🔥 ${err.message}. Try again`);
        })
        // 7. It will run no matter what status is ok or error
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener('click', () => getCountryData('usa'));
// 1. Data fetch gonna Start when btn is clicked
```

Above code is for fetching the country data abd display on Screen.

### THE PROMISE LIFECYCLE

1. Pending - **Before** the future value is available
2. Settled - **Asynchronous** task has **finished**
    - FULFILLED - **Success**! The value is now **available**
    - REJECTED - An **error** happened

### Building the Promise

Simple lottery Promsie

```js
// Promise is Object -> new keyword is used to create it
const lotteryPromise = new Promise(function (resolve, reject) {
    // resolve and reject are the function that gonna excuted on the conditionn
    console.log('Lootery draw is happening 🔮');
    setTimeout(() => {
        // condition for the Promise gonna resolve or not
        if (Math.random() >= 0.5) {
            // If condition is true then `You Win 💰` will be returned
            resolve('You W  in 💰');
        } else {
            // Error will ne throw if Promise is rejected
            reject(new Error('You Lost the Money 💩'));
        }
    }, 2000);
});

// Promise resolving
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
```

Creating a fulfilled or rejected Promise

```js
Promise.resolve('ABC').catch(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
```

### Async Await Function

```js
const whereAmI = async function (country) {
    // Method 1
    fetch(`https://restcountries.com/v2/name/${country}`).then(response =>
        console.log(response)
    );

    // ES2017 Alternative async await function
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    console.log(res);
};
whereAmI('India');
console.log('First');
/* 
First
 Response {type: 'cors', url: 'https://restcountries.com/v2/name/India', redirected: false ...
*/
```

### Promise Combinator

```js
const getJSON = async (url, errorMsg = 'Something went Wrong') => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return await response.json();
};

// Promise Combinator
const get3Countries = async (c1, c2, c3) => {
    try {
        // When you fetch the data many times and sequence don't
        // matter then you can use Promise.all to load in parellel
        // and save the time
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`),
            getJSON(`https://restcountries.com/v2/name/${c2}`),
            getJSON(`https://restcountries.com/v2/name/${c3}`),
        ]);
        console.log(data.map(d => d[0].name));
    } catch (error) {
        console.error(error);
    }
};
get3Countries('India', 'usa', 'Russia');
```

```js
///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
// Promise.race
(async function () {
    const res = await Promise.race([
        // the request that first fullfilled or rejected
        getJSON(`https://restcountries.com/v2/name/italy`),
        getJSON(`https://restcountries.com/v2/name/egypt`),
        getJSON(`https://restcountries.com/v2/name/mexico`),
    ]);
    console.log(res[0]);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'));
        }, sec * 1000);
    });
};

Promise.race([
    // Race between timer of 4 sec and country api..
    // If request take more then 4 sec it will be rejected
    getJSON(`https://restcountries.com/v2/name/tanzania`),
    timeout(4),
])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
    // When all Promise is settled either fullfilled or rejected
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
    // When all the request are fullfilled
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
    // the any first request that get fullfilled
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
    .then(res => console.log(res))
    .catch(err => console.error(err));
```

