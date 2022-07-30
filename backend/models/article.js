const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
	{
		title: { type: String },
		subtitle: { type: String },
		url: { type: String },
		publisher: { type: String },
		publisherUrl: { type: String },
		publishDate: { type: String },
		categories: [String],
		newsType: [String],
		status: {
			type: String,
			enum: ['APPROVED', 'PENDING', 'REJECTED'],
			default: 'PENDING',
		},
	},
	{ timestamps: true }
);

articleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const News = mongoose.model('News', articleSchema);

module.exports = { News };
