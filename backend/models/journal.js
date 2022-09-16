const mongoose = require('mongoose');

// TODO - what should the schema look like?
// TODO - how should we save PDF?

const journalSchema = new mongoose.Schema(
	{
		journalTitle: { type: String },
		articleTitle: { type: String },
		journalNumber: { type: String },
		articleNumber: { type: String },
		id: { type: String },
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

articleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = { Journal };
