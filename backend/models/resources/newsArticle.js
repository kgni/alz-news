const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema(
	{
		title: { type: String },
		subtitle: { type: String },
		url: { type: String },
		publisher: [String],
		publisherUrl: { type: String },
		publishDate: { type: mongoose.Schema.Types.Mixed },
		categories: [String],
		type: [String],
		status: {
			type: String,
			enum: ['APPROVED', 'PENDING', 'REJECTED'],
			default: 'PENDING',
		},
	},
	{ timestamps: true }
);

newsArticleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const News = mongoose.model('News', newsArticleSchema);

module.exports = { News };
