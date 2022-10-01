const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: { type: String, unique: true },
	password: { type: String, required: true, minlength: 5 },
	phoneNumber: String,
	role: {
		type: String,
		enum: ['user', 'admin', 'owner'],
		default: 'user',
	},
	image: String,
	likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NewsArticle' }],
});

const User = mongoose.model('User', userSchema);

export default User;
