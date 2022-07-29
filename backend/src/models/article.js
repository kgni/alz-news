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

const PendingArticle = mongoose.model('PendingArticle', articleSchema);
const AcceptedArticle = mongoose.model('AcceptedArticle', articleSchema);
const RejectedArticle = mongoose.model('RejectedArticle', articleSchema);

module.exports = { PendingArticle, AcceptedArticle, RejectedArticle };
