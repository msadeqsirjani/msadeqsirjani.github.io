import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      // Google TypeScript Style naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allowDouble',
          trailingUnderscore: 'allowDouble',
        },
        // Components are functions in PascalCase; render props may be PascalCase
        {selector: 'function', format: ['camelCase', 'PascalCase']},
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {selector: 'typeLike', format: ['PascalCase']},
        {selector: 'typeParameter', format: ['PascalCase']},
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {regex: '^I[A-Z]', match: false},
        },
        {selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE']},
        // HTML/ARIA attrs, data keys and external shapes vary — don't enforce
        {selector: ['property', 'typeProperty'], format: null},
        {selector: 'import', format: ['camelCase', 'PascalCase']},
      ],
    },
  },
]);
