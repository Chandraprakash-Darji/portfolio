/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,

  importOrder: [
    '^server-only|client-only$',
    '^react$',
    '^next(/.*)?$',
    '<THIRD_PARTY_MODULES>',
    '^@repo/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    'prettier-plugin-tailwindcss',
  ],

  tailwindAttributes: ['cn', 'cva'],
};
