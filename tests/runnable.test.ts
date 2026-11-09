import { expect, test } from 'vitest';
import { codeBlocks, logsCleanly } from '../src/components/learn/runnable';

test('only blocks that print without throwing are runnable', async () => {
  expect(await logsCleanly("console.log('hi')")).toBe(true);
  expect(await logsCleanly("setTimeout(() => console.log('later'), 5000)")).toBe(true);
  expect(await logsCleanly("let text = 'x';")).toBe(false); // prints nothing
  expect(await logsCleanly('console.log(restaurant.name)')).toBe(false); // depends on an earlier block
  expect(await logsCleanly("document.querySelector('h1')")).toBe(false);
  expect(await logsCleanly("Promise.reject(new Error('x')); console.log('a')")).toBe(false);
});

test('code comes from rendered JS blocks only, with markup and entities removed', () => {
  const html =
    '<pre data-language="js"><code><span class="line"><span>if (a &#x3C; b) console.log(&#x27;hi&#x27;) &amp;&amp; x</span></span>\n<span class="line">ok()</span></code></pre>' +
    '<pre><code>    ```js not a js block</code></pre>';
  expect(codeBlocks(html)).toEqual(["if (a < b) console.log('hi') && x\nok()"]);
});

test('a block that hangs inside a timer is not runnable and does not stall the build', async () => {
  expect(await logsCleanly("setTimeout(() => { for (;;) {} }); console.log('x')")).toBe(false);
});
