import { Worker } from 'node:worker_threads';

/** JS/JavaScript fenced blocks in a note, in the order the page renders them. */
export const codeBlocks = (markdown: string) =>
  [...markdown.matchAll(/^```(?:js|javascript)\n([\s\S]*?)^```/gm)].map((match) => match[1]);

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
    worker.once('message', (ok: boolean) => {
      resolve(ok);
      void worker.terminate();
    });
    worker.once('error', () => resolve(false));
  });
}
