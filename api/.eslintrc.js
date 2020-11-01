module.exports = {
	parserOptions: {
		sourceType: 'module'
	},
	parser: 'babel-eslint',
	env: {
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'plugin:jest/recommended'],
	plugins: ['jest'],
	rules: {
		'no-console': 'off',
		'object-curly-spacing': ['error', 'always'],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: [2, 'always'],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always'
			}
		]
	}
};
