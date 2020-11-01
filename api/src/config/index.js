import { mergeWith } from 'lodash';
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
	env,
	isDev: env === 'development',
	isTest: env === 'testing',
	port: process.env.PORT,
	secrets: {
		jwt: process.env.JWT_SECRET,
		jwtExp: '5d'
	},
	dbUrl: process.env.DB_URL
};

let envConfig = {};

switch (env) {
case 'dev':
case 'development':
	envConfig = require('./dev').config;
	break;
case 'test':
case 'testing':
	envConfig = require('./testing').config;
	break;
default:
	envConfig = require('./dev').config;
}

export default mergeWith(
	{}, envConfig, baseConfig,
	(a, b) => b === null ? a : undefined
);
