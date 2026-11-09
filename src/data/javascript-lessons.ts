/** The book: chapters group the imported note sections (src/data/javascript-notes/<slug>.md). */
export const chapters = [
  {
    slug: 'fundamentals',
    title: 'Fundamentals',
    summary: 'Values, operators, conversions and control flow: the pieces every program is built from.',
    sections: [
      { slug: 'basis-of-js', title: 'Basis of JS' },
      { slug: 'the-7-primitive-data-types', title: 'The 7 primitive data types' },
      { slug: 'operators-in-js', title: 'Operators' },
      { slug: 'template-literals-template-strings', title: 'Template literals' },
      { slug: 'type-conversion-and-coercion', title: 'Type conversion and coercion' },
      { slug: 'conditional-statment--if-else-', title: 'Conditional statements (if / else)' },
      { slug: 'switch-statment', title: 'Switch statement' },
      { slug: 'short-circuiting', title: 'Short circuiting' },
      { slug: 'nullish-coalescing-operator', title: 'Nullish coalescing operator' },
      { slug: 'loops', title: 'Loops' },
    ],
  },
  {
    slug: 'functions',
    title: 'Functions',
    summary: 'Declarations, expressions, arrows, closures, and scheduling work with timers.',
    sections: [
      { slug: 'functions', title: 'Functions' },
      { slug: 'timers', title: 'Timers' },
    ],
  },
  {
    slug: 'data-structures',
    title: 'Data structures',
    summary: 'Arrays, objects, sets, maps and strings, and when to reach for each.',
    sections: [
      { slug: 'data-strucutres', title: 'Choosing a data structure' },
      { slug: 'arrays', title: 'Arrays' },
      { slug: 'objects', title: 'Objects' },
      { slug: 'sets', title: 'Sets' },
      { slug: 'maps', title: 'Maps' },
      { slug: 'working-with-string', title: 'Working with strings' },
    ],
  },
  {
    slug: 'dom',
    title: 'The DOM',
    summary: 'Selecting, creating and changing elements, and reacting to events.',
    sections: [{ slug: 'dom-manipulation', title: 'DOM manipulation' }],
  },
  {
    slug: 'oop',
    title: 'Object-oriented JavaScript',
    summary: 'Classes, constructor functions, prototypes and inheritance.',
    sections: [{ slug: 'oops', title: 'Object-oriented programming' }],
  },
  {
    slug: 'async',
    title: 'Asynchronous JavaScript',
    summary: 'How JavaScript waits: the web, APIs, AJAX and promises.',
    sections: [
      { slug: 'synchronous-code', title: 'Synchronous code' },
      { slug: 'asynchronous-code', title: 'Asynchronous code' },
      { slug: 'what-are-ajax-calls', title: 'What are AJAX calls?' },
      { slug: 'what-is-an-api', title: 'What is an API?' },
      { slug: 'what-happens-when-we-access-a-web-server', title: 'What happens when we access a web server' },
      { slug: 'what-are-promises', title: 'Promises and fetch' },
    ],
  },
  {
    slug: 'modern-js',
    title: 'Modern JavaScript and practice',
    summary: 'Modules, tooling, and the habits that make you a better developer.',
    sections: [
      { slug: 'an-overview-of-modules', title: 'An overview of modules' },
      { slug: 'developer-skills', title: 'Developer skills' },
    ],
  },
];

/** Every section in reading order, with its chapter and a "2.1"-style number. */
export const lessons = chapters.flatMap((chapter, c) =>
  chapter.sections.map((section, s) => ({ ...section, chapter, chapterNumber: c + 1, position: s + 1, number: `${c + 1}.${s + 1}` })),
);

/** Terms explained inline in chapters (first mention gets a popover) and listed on the guide page. */
export const glossary = [
  { term: 'Closure', definition: 'A function together with access to the variables of the scope it was created in.' },
  { term: 'Prototype', definition: 'An object consulted when a property is missing on another object.' },
  { term: 'Hoisting', definition: 'Declarations are set up before code runs, so some can be used above the line that declares them.' },
  { term: 'Coercion', definition: 'JavaScript converting a value to another type implicitly, as in "5" * 2.' },
  { term: 'Callback', definition: 'A function passed to another function, to be called later.' },
  { term: 'Promise', definition: 'An object standing in for a value that will be available later, or an error.' },
  { term: 'Microtask', definition: 'Work, such as a promise reaction, processed after the current stack empties and before the next task.' },
  { term: 'Scope', definition: 'The region of code where a variable can be accessed.' },
  { term: 'Primitive', definition: 'An immutable value that is not an object: string, number, bigint, boolean, undefined, symbol or null.' },
  { term: 'Event Loop', definition: 'The mechanism that takes queued tasks and runs them once the call stack is empty.' },
  { term: 'Destructuring', definition: 'Unpacking values from arrays or properties from objects into separate variables.' },
];
