module.exports = [
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    files: ['src/**/*.{js,jsx,ts,tsx}']  },
];
