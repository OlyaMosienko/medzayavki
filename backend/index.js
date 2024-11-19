import express from 'express';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { getMedNotes, addMedNote } from './controllers/mednotes.controller.js'
import { auth } from './middlewares/auth.js';
import cookieParser from 'cookie-parser';
import { login } from './controllers/admin.controller.js'
import { PORT } from './constants/constants.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(auth);

app.post('/api/login', async (req, res) => {
	try {
		const token = await login(req.body.email, req.body.password);

		res.cookie('token', token);

		res.json({ ok: true });
	} catch (error) {
		res.json({ ok: false });

		console.log(error);
	}
});

app.post('/api/mednote', async (req, res) => {
	await addMedNote(req.body);

	res.json({ ok: true });
});

app.get('/api/mednotes', async (req, res) => {
	if (req.admin) {
		const medNotes = await getMedNotes();

		res.json({ ok: true, data: medNotes });
	} else {
		res.json({ ok: false });
	}
});

mongoose
	.connect(
		'mongodb+srv://dbUser:dbUser123@cluster0.lombc.mongodb.net/mednotes?retryWrites=true&w=majority&appName=Cluster0',
	)
	.then(() => {
			app.listen(PORT, () => {
			console.log(chalk.green(`Server has been started on port ${PORT}...`));
		});
	});
