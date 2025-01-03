module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    'no-unused-vars': "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "off",
    'quotes': ['off', 'single'],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "semi": true,
        "useTabs": false,
        "tabWidth": 2,
        "trailingComma": "all",
        "printWidth": 100,
        "bracketSpacing": true,
        "endOfLine": "auto",
        "arrowParens": "avoid",
        "bracketSameLine": false,
        // "import/no-unresolved": false
      }
    ],
  }
};
