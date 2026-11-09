import { readFileSync, readdirSync } from 'node:fs';
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

test('notes still have runnable examples', async () => {
  const dir = 'src/data/javascript-notes';
  const blocks = readdirSync(dir).flatMap((file) => codeBlocks(readFileSync(`${dir}/${file}`, 'utf8')));
  const runnable = (await Promise.all(blocks.map(logsCleanly))).filter(Boolean).length;
  expect(runnable).toBeGreaterThan(30);
});
