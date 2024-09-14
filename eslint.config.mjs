import antfu from '@antfu/eslint-config'
import command from 'eslint-plugin-command/config'

export default antfu(
  {
    formatters: true,
    react: true,
    typescript: true,
  },
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
    rules: {
      'prefer-object-has-own': 'error',
      'logical-assignment-operators': [
        'error',
        'always',
        { enforceForIfStatements: true },
      ],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'prefer-destructuring': [
        'error',
        { VariableDeclarator: { object: true } },
      ],
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/order': [
        'warn',
        {
          'groups': [
            'object',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'error',
      'no-negated-condition': 'off',
      'unicorn/no-negated-condition': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'object-shorthand': ['error', 'always'],
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'ts/prefer-for-of': 'error',
      'ts/no-explicit-any': 'off',
      'ts/no-non-null-assertion': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unused-vars': 'error',
      'ts/no-var-requires': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/consistent-type-imports': 'error',
      'ts/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],
      'jsonc/sort-keys': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'off',
      'style/comma-dangle': 'error',
      'style/quotes': 'error',
      'style/max-statements-per-line': 'error',
      'style/jsx-curly-newline': 'error',
      'style/jsx-function-call-newline': 'error',
      'style/indent-binary-ops': 'error',
      'style/type-generic-spacing': 'error',
      'style/type-named-tuple-spacing': 'error',
      'node/prefer-global/process': 'off',
      'node/prefer-global/buffer': 'off',
      'command/command': 'error',
      'perfectionist/sort-imports': 'off',
      'react-dom/no-dangerously-set-innerhtml': 'off',
      'react/no-duplicate-key': 'error',
      'react/no-array-index-key': 'error',
      'no-dupe-keys': 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'CallExpression[callee.name=useMemo][arguments.1.type=ArrayExpression][arguments.1.elements.length=0]',
          message:
            '`useMemo` with an empty dependency array can\'t provide a stable reference, use `useRef` instead.',
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-var': 'off',
    },
  },
  command(),
)
