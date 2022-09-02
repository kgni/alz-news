const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// TODO - create an articles field so that we can store article and journal ids on specific users (populate)? Eventually we want to create a dashboard for users to save articles and journals that they find interesting

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true },
	email: { type: String, unique: true },
	password: String,
	phoneNumber: String,
});
