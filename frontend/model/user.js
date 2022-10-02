import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
	{
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
		image: { type: String, default: null },
		likedArticles: [{ type: Schema.Types.ObjectId, ref: 'NewsArticle' }],
	},
	{ timestamps: true }
);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const User = models.User || model('User', userSchema);

export default User;
