// Runs inside the sandboxed iframe too (serialized with toString), so it must stay self-contained.
export function formatValue(value: unknown, seen = new WeakSet<object>()): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'function') return `ƒ ${value.name || 'anonymous'}()`;
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'symbol' || value === undefined || value === null || typeof value !== 'object') return String(value);
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (seen.has(value)) return '[Circular]';
  if (typeof Node !== 'undefined' && value instanceof Node) return `<${value.nodeName.toLowerCase()}>`;
  // `seen` holds only the current path, so the same object twice side by side is not a cycle.
  seen.add(value);
  const inner = (v: unknown) => (typeof v === 'string' ? JSON.stringify(v) : formatValue(v, seen));
  const name = value.constructor && value.constructor !== Object ? `${value.constructor.name} ` : '';
  const text = Array.isArray(value)
    ? `[${value.map(inner).join(', ')}]`
    : value instanceof Map
      ? `Map(${value.size}) {${[...value].map(([k, v]) => `${inner(k)} => ${inner(v)}`).join(', ')}}`
      : value instanceof Set
        ? `Set(${value.size}) {${[...value].map(inner).join(', ')}}`
        : `${name}{${Object.entries(value).map(([k, v]) => `${k}: ${inner(v)}`).join(', ')}}`;
  seen.delete(value);
  return text;
}

// Escape "</script" so note code cannot close the tag early, and "<!--" so it cannot open the escaped state that swallows our closing tag.
const safe = (s: string) => s.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');

/** HTML for a sandboxed iframe that runs `code` and posts each console line to the parent. */
export function runnerDoc(code: string, id: string): string {
  const boot = `const format = ${formatValue.toString()};
const send = (level, args) => parent.postMessage({ id: ${JSON.stringify(id)}, level, text: args.map(a => format(a)).join(' ') }, '*');
for (const level of ['log', 'info', 'warn', 'error', 'table', 'dir']) console[level] = (...args) => send(level === 'table' || level === 'dir' ? 'log' : level, args);
window.alert = window.prompt = window.confirm = (msg) => { send('info', ['[dialog] ' + (msg ?? '')]); return null; };
window.onerror = (message) => send('error', [String(message)]);
window.onunhandledrejection = (event) => send('error', ['Uncaught (in promise) ' + format(event.reason)]);`;
  return `<!doctype html><script>${safe(boot)}</script><script>${safe(code)}</script>`;
}
