import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import config from './config';
import { signUp, signIn, protect } from './utils/auth';
import { connect } from './utils/db';
import userRouter from './resources/user/user.router';
import libraryBookRouter from './resources/library-book/library-book.router';
import bookRouter from './resources/book/book.router';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', signUp);
app.post('/login', signIn);

app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/library', libraryBookRouter);
app.use('/api/book', bookRouter);

const swaggerDoc = YAML.load('./src/swagger/api.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export const start = async () => {
	try {
		await connect();
		app.listen(config.port, () => {
			console.log(`REST API on http://localhost:${config.port}/api`);
		});
	} catch (e) {
		console.error(e);
	}
};
