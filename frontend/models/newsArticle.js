import { Schema, model, models } from 'mongoose';

const newsArticleSchema = new Schema(
	{
		title: { type: String },
		subtitle: { type: String },
		url: { type: String },
		publisher: [String],
		publisherUrl: { type: String },
		publishDate: { type: Schema.Types.Mixed },
		categories: [String],
		type: String,
		recommended: {
			type: Boolean,
			default: false,
		},
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

const NewsArticle =
	models.NewsArticle || model('NewsArticle', newsArticleSchema);

export default NewsArticle;
