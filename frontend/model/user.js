import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
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
	likedArticles: [{ type: Schema.Types.ObjectId, ref: 'NewsArticle' }],
});

const User = models.User || model('User', userSchema);

export default User;
