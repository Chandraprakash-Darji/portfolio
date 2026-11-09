import { expect, test } from 'vitest';
import { formatValue, runnerDoc } from '../src/components/learn/code-runner';

test('formats values the way a console would', () => {
  const cyclic: Record<string, unknown> = { a: 1 };
  cyclic.self = cyclic;
  expect(formatValue('hi')).toBe('hi');
  expect(formatValue([1, 'a', null])).toBe('[1, "a", null]');
  expect(formatValue(new Map([['k', 2]]))).toBe('Map(1) {"k" => 2}');
  expect(formatValue(new Set([1]))).toBe('Set(1) {1}');
  expect(formatValue(cyclic)).toBe('{a: 1, self: [Circular]}');
  expect(formatValue(function add() {})).toBe('ƒ add()');
  expect(formatValue(new TypeError('x'))).toBe('TypeError: x');
});

test('serialized formatter runs standalone and code cannot close the script tag', () => {
  const doc = runnerDoc('console.log("</script><b>")', 'id');
  expect(doc).not.toContain('</script><b>');
  const boot = doc.slice(doc.indexOf('<script>') + 8, doc.indexOf('</script>'));
  const format = new Function(`${boot.slice(0, boot.indexOf('const send'))}; return format;`)();
  expect(format({ n: [1, 2] })).toBe('{n: [1, 2]}');
});
