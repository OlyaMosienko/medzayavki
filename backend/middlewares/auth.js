import jwt from 'jsonwebtoken';

const JWT_SECRET = 'test';

export const auth = (req, res, next) => {
	const token = req.cookies.token;

	if (token) {
		const verifyResult = jwt.verify(token, JWT_SECRET);

		req.admin = {
			email: verifyResult.email,
		};
	}

	next();
};
