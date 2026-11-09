import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Playground({ kind = 'async' }: { kind?: string }) {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);
  const [copied, setCopied] = useState(false);
  const code = [
    "console.log('A');",
    "setTimeout(() => console.log('timer'), 0);",
    "Promise.resolve().then(() => console.log('promise'));",
    "console.log('B');",
  ];
  // Each step: highlighted line (-1 = none), what sits where, console so far, and why.
  const steps = [
    { line: -1, stack: [], micro: [], tasks: [], out: [], note: 'Guess the order the four logs will print, then press Next step.' },
    { line: 0, stack: ['main script'], micro: [], tasks: [], out: ['A'], note: "console.log('A') is ordinary code, so it runs immediately." },
    { line: 1, stack: ['main script'], micro: [], tasks: ['timer callback'], out: ['A'], note: 'setTimeout does not run its callback. It parks it in the task queue, even with a 0 ms delay.' },
    { line: 2, stack: ['main script'], micro: ['promise callback'], tasks: ['timer callback'], out: ['A'], note: '.then() parks its callback too, but in the microtask queue, which has priority.' },
    { line: 3, stack: ['main script'], micro: ['promise callback'], tasks: ['timer callback'], out: ['A', 'B'], note: "console.log('B') runs immediately. The script is now finished." },
    { line: 2, stack: ['promise callback'], micro: [], tasks: ['timer callback'], out: ['A', 'B', 'promise'], note: 'The call stack is empty, so JavaScript first empties the microtask queue: "promise" prints.' },
    { line: 1, stack: ['timer callback'], micro: [], tasks: [], out: ['A', 'B', 'promise', 'timer'], note: 'Only now does the event loop take the next task: "timer" prints last, even though it was scheduled first.' },
  ];
  const current = steps[step];
  return (
    <div className="js-demo">
      {kind === 'async' ? (
        <>
          <pre className="js-loop-code">
            {code.map((line, index) => (
              <code key={line} className={index === current.line ? 'js-loop-active' : undefined}>
                {line}
              </code>
            ))}
          </pre>
          <p className="js-loop-note" aria-live="polite">
            Step {step} of {steps.length - 1}: {current.note}
          </p>
          <div className="js-loop-boxes">
            {(
              [
                ['Call stack', 'running now', current.stack],
                ['Microtask queue', 'promises, runs first', current.micro],
                ['Task queue', 'timers, runs after', current.tasks],
              ] as const
            ).map(([title, hint, items]) => (
              <div key={title}>
                <strong>{title}</strong>
                <small>{hint}</small>
                {items.length ? items.map((item) => <span key={item}>{item}</span>) : <em>empty</em>}
              </div>
            ))}
          </div>
          <div className="js-loop-console">
            <strong>Console</strong>
            <ol>
              {current.out.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
          <button disabled={step === steps.length - 1} onClick={() => setStep(step + 1)}>
            Next step <ArrowRight size={14} aria-hidden="true" />
          </button>
          <button onClick={() => setStep(0)}>Reset</button>
        </>
      ) : kind === 'closures' ? (
        <>
          <p>Two calls to makeCounter(). Two independent environments.</p>
          <div className="js-queues" aria-live="polite">
            <span>Counter A: {count}</span>
            <span>Counter B: {second}</span>
          </div>
          <button onClick={() => setCount(count + 1)}>Call A</button>
          <button onClick={() => setSecond(second + 1)}>Call B</button>
          <button
            onClick={() => {
              setCount(0);
              setSecond(0);
            }}
          >
            Reset
          </button>
        </>
      ) : kind === 'references' ? (
        <>
          <p>
            {copied
              ? 'The outer object was copied. Its score can change independently.'
              : 'Both names point to the same object.'}
          </p>
          <div className="js-queues" aria-live="polite">
            <span>original.score = {copied ? 10 : 10 + count}</span>
            <span>
              {copied ? 'copy' : 'alias'}.score = {10 + count}
            </span>
          </div>
          <button onClick={() => setCount(count + 1)}>Increment score</button>
          <button
            onClick={() => {
              setCopied(!copied);
              setCount(0);
            }}
          >
            {copied ? 'Use an alias' : 'Use a spread copy'}
          </button>
        </>
      ) : kind === 'events' ? (
        <>
          <p>
            Click the inner button. Its event bubbles to the surrounding panel.
          </p>
          <div className="js-queues" onClick={() => setSecond(second + 1)}>
            <button onClick={() => setCount(count + 1)}>Inner button</button>
          </div>
          <output aria-live="polite">
            Button listener: {count} · Panel listener: {second}
          </output>
        </>
      ) : kind === 'prototypes' ? (
        <>
          <p>Property lookup checks the instance before the prototype.</p>
          <div className="js-queues" aria-live="polite">
            <span>instance.label: {copied ? '"own"' : 'missing'}</span>
            <span>prototype.label: "shared"</span>
            <span>Result: {copied ? '"own"' : '"shared"'}</span>
          </div>
          <button onClick={() => setCopied(!copied)}>
            {copied ? 'Delete own property' : 'Add own property'}
          </button>
        </>
      ) : (
        <>
          <p>
            previous was assigned score’s primitive value before the
            reassignment.
          </p>
          <label>
            Reassign score:{' '}
            <input
              type="range"
              min="0"
              max="100"
              value={count + 10}
              onChange={(event) => setCount(Number(event.target.value) - 10)}
            />
          </label>
          <div className="js-queues" aria-live="polite">
            <span>score = {count + 10}</span>
            <span>previous = 10</span>
          </div>
        </>
      )}
      <small>
        Illustrative model. The controls step through the behavior described
        above.
      </small>
    </div>
  );
}
