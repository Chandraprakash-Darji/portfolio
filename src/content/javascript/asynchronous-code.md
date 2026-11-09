## ASYNCHRONOUS CODE


```js
const p = document.querySelecter('.p');
setTimeout(() => {
    // ASYNCHRONOUS code NON-Blocking
    p.textContent = 'My name is Jonas!';
}, 5000);
p.style.color = 'red';
```

- 👉 Asynchronous code is executed **after a task that runs in the _“background”_ finishes**;
- 👍 Asynchronous code is **non-blocking**;
- 👉 Execution doesn’t wait for an **asynchronous** task to finish its work;
- 👉 Callback functions alone do **NOT** make code asynchronous!

