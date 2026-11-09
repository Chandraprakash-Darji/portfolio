## SYNCHRONOUS CODE


```js
const p = document.querySelecter('.p');
p.textContent = 'My name is Jonas!';
alert('Text set!'); // Block the all code from running untill
// you close the popup
p.style.color = 'red';
```

- 👉 Most code is **synchronous**;
- 👉 Synchronous code is **executed line by line**;
- 👉 Each line of code **waits** for previous line to finish;
- 👎 _Long-running operations **block** code execution_.

