## Timers


### SetTimeout

```js
const ingredient = ['olives', 'spinach'];
//  1st argument 1 callback // 2nd time // 3rd argument for call back Fun()
const pizzaTower = setTimeout(
    (ing1, ing2) => {
        console.log(`Here is Pizza with ${ing1} and ${ing2} 🍕`);
    },
    3000,
    ...ingredient
);
console.log('Waiting...');
// Clear the timeout at specific condition
if (ingredient.includes('spinach')) clearTimeout(pizzaTower);
```

### setInterval

```js
// Runs the call back fun() every given time
setInterval(() => {
    console.log(
        new Intl.DateTimeFormat('hi-IN', { timeStyle: 'long' }).format(
            new Date()
        )
    );
}, 1000);
```

