import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { Admin } from '../models/Admin.js';
import { JWT_SECRET } from '../constants/constants.js';

export const login = async (email, password) => {
	const admin = await Admin.findOne({ email });

	if (!admin) {
		throw new Error('Admin is not found');
	}

	// const isPasswordCorrect = await bcrypt.compare(password, user.password);
	const isPasswordCorrect = password === admin.password;

	if (!isPasswordCorrect) {
		throw new Error('Wrong password');
	}

	console.log(chalk.bgGreen('Admin was login!'));

	return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
};
