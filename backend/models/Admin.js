import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const adminSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Invalid email',
		},
	},
	password: {
		type: String,
		required: true,
	},
});

export const Admin = mongoose.model('Admin', adminSchema);
