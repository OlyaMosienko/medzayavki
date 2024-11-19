import chalk from 'chalk';
import { MedNote } from '../models/MedNote.js'

export const getMedNotes = async () => {
	const medNotes = await MedNote.find();

	return medNotes;
};

export const addMedNote = async (data) => {
	const medNote = await MedNote.create(data);

	console.log(chalk.bgGreen('Med note was added!'));

	return medNote;
};
