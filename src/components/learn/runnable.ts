import { Worker } from 'node:worker_threads';

const entities: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };
const decode = (text: string) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (match, code: string) =>
    code[0] !== '#'
      ? (entities[code] ?? match)
      : String.fromCodePoint(code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : Number(code.slice(1))),
  );

/**
 * Source of each rendered JS code block, in page order. Read from the rendered HTML, not the
 * Markdown, so it always lines up with the <pre> elements that get Run buttons.
 */
export const codeBlocks = (html: string) =>
  [...html.matchAll(/<pre[^>]*data-language="(?:js|javascript)"[^>]*>([\s\S]*?)<\/pre>/g)].map((match) =>
    decode(match[1].replace(/<[^>]+>/g, '')),
  );

// Runs in its own thread so a block's stray promise rejections can't reach the build process.
// Timers fire immediately here, so the check stays fast.
const checker = `
const vm = require('node:vm');
const { parentPort, workerData } = require('node:worker_threads');
let logs = 0;
let failed = false;
process.on('unhandledRejection', () => { failed = true; });
const queued = [];
const log = () => { logs++; };
const schedule = (fn) => { if (typeof fn === 'function') queued.push(fn); return queued.length; };
const context = vm.createContext({
  console: { log, info: log, warn: log, error: log, table: log, dir: log },
  setTimeout: schedule, setInterval: schedule, clearTimeout() {}, clearInterval() {},
  navigator: { language: 'en-US' },
});
(async () => {
  try {
    vm.runInContext(workerData, context, { timeout: 500 });
    await new Promise((resolve) => setImmediate(resolve));
    for (const fn of queued.splice(0)) fn();
    await new Promise((resolve) => setTimeout(resolve, 10));
  } catch { failed = true; }
  parentPort.postMessage(logs > 0 && !failed);
})();
`;

/**
 * Build-time check: does this block print something without throwing?
 * Only those blocks get a Run button.
 * shortcut: network and dialogs count as failures, so fetch/prompt examples stay read-only; mock them if those should run.
 */
export function logsCleanly(code: string): Promise<boolean> {
  return new Promise((resolve) => {
    const worker = new Worker(checker, { eval: true, workerData: code });
    // The vm timeout doesn't cover timer callbacks, so cap the whole check; a hung block is not runnable.
    const timer = setTimeout(() => void worker.terminate(), 2000);
    const finish = (ok: boolean) => {
      clearTimeout(timer);
      resolve(ok);
      void worker.terminate();
    };
    worker.once('message', finish);
    worker.once('error', () => finish(false));
    worker.once('exit', () => finish(false));
  });
}
