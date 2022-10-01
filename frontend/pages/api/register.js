import connectDB from '../../helper/connectDB';
import User from '../../model/user';
import bcrypt from 'bcrypt';

// TODO - IMPLEMENT VALIDATION LIBRARY
const validateEmail = (email) => {
	const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return regEx.test(email);
};

const validateForm = async (firstName, lastName, email, password) => {
	// TODO - CURRENTLY NOT VALIDATING FOR CHARACTERS OTHER THAN LETTERS IN NAME
	if (firstName.trim().length < 1 || lastName.trim().length < 1) {
		return { error: 'Please fill in your First name and Last name' };
	}

	if (!validateEmail(email)) {
		return { error: 'Email is invalid' };
	}

	await connectDB();
	const emailUser = await User.findOne({ email: email });

	if (emailUser) {
		return { error: 'Email already exists' };
	}

	if (password.length < 5) {
		return { error: 'Password must have 5 or more characters' };
	}

	return null;
};

export default async function handler(req, res) {
	// validate if it is a POST

	console.log(req.body);
	if (req.method !== 'POST') {
		return res
			.status(200)
			.json({ error: 'This API call only accepts POST methods' });
	}

	// get and validate body variables
	const { firstName, lastName, email, password } = req.body;

	const errorMessage = await validateForm(firstName, lastName, email, password);
	if (errorMessage) {
		return res.status(400).json(errorMessage);
	}

	// hash password
	const hashedPassword = await bcrypt.hash(password, 12);

	// create new User on MongoDB
	const newUser = new User({
		firstName,
		lastName,
		email,
		password: hashedPassword,
	});

	newUser
		.save()
		.then(() =>
			res.status(200).json({ msg: 'Successfully created new User: ' + newUser })
		)
		.catch((err) =>
			res.status(400).json({ error: "Error on '/api/register': " + err })
		);
}
