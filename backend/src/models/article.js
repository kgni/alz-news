const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: { type: String },
	author: { type: String },
	url: { type: String },
	text: { type: String },
});

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
