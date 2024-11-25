import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/eslint.config.mjs', '**/.prettierrc.js', 'dist/**'],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
    rules: {
      "prettier/prettier": ["error"],
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-use-before-define": ["off"],
      "@typescript-eslint/no-empty-interface": [
        "error",
        {
          "allowSingleExtends": true
        }
      ],
      "@typescript-eslint/no-inferrable-types": "off",
      "semi": [2, "never"],
      "object-shorthand": ["error", "always"],
      "quotes": ["error", "single", {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }],
      "no-unused-vars": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "computed-property-spacing": ["error", "never"],
      "space-before-function-paren": [
        "error",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
        }
      ],
      "no-multi-spaces": ["error"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "key-spacing": [
        "error",
        {
          "mode": "strict",
          "afterColon": true,
          "beforeColon": false
        }
      ],
      "indent": [
        "error",
        2,
        {
          "FunctionDeclaration": { "parameters": "first" },
          "ImportDeclaration": 1,
          "SwitchCase": 1,
          "ignoredNodes": ["PropertyDefinition"]
        }
      ],
      "no-nested-ternary": 2,
      "no-var": 2,
      "no-use-before-define": "off",
      "eol-last": ["error", "always"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "space-infix-ops": "error",
      "semi-spacing": ["error", { "before": false, "after": true }],
      "comma-dangle": ["error", "never"],
      "padded-blocks": ["error", "never"]
    },
  },
  eslintPluginPrettierRecommended
]