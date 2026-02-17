import js from '@eslint/js'
import ts from 'typescript-eslint'
import globals from 'globals'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'package/', 'dist/']
	},
	{
		files: ['**/*.svelte'],
		rules: {
			'prettier/prettier': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/require-each-key': 'off'
		}
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ vars: 'all', args: 'after-used', ignoreRestSiblings: false }
			],
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'package/', '**/generated/']
	}
]
