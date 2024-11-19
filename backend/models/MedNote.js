import mongoose, { Schema } from 'mongoose';

const medNoteSchema = new Schema({
	name: String,
	phone: String,
	problem: String,
	date: { type: Date, default: Date.now },
});

export const MedNote = mongoose.model('MedNote', medNoteSchema);
