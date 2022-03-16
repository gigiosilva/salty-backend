module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'security',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base/legacy',
    'plugin:import/recommended',
    'plugin:security/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'ormconfig.js', '*/migration/*.ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'quote-props': [
      'error',
      'consistent-as-needed'
    ],
    'radix': 'error',
    'some-rule': 'off',
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'asyncArrow': 'always',
        'named': 'never'
      }
    ],
    'use-isnan': 'error',
    'valid-typeof': 'off',
    'quotes': [
      'error',
      'single'
    ],
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'newline-before-return': 'error',
    'max-len': [
      'error',
      140
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'max-classes-per-file': 'off',
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-empty-functions': 'off',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1
      }
    ],
    'no-new-wrappers': 'error',
    'no-return-await': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'off',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': 'off',
    'prefer-const': 'error',
    'spaced-comment': [
      'error',
      'always'
    ],
    'import/no-unresolved': ['error', { commonjs: true, amd: true }],
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/export': 'error',
    'import/no-dynamic-require': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ],
    'linebreak-style': 'off',
    'prettier/prettier': 'off',
    'camelcase': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'security/detect-object-injection': 'off',
    'consistent-return': 'off',
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    },
  },
};
