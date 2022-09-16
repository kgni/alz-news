const { NewsArticle } = require('../models/newsArticle');

module.exports = {
	getNewsArticles: async (req, res) => {
		const { limit } = req.query;

		// parsing limit to check if it is a number
		const parsedLimit = parseInt(limit);

		// check if we there was a query and if it was a number, if both were true then we send back the amount of articles that were requested

		if (limit && !isNaN(parsedLimit)) {
			const articles = await NewsArticle.find({})
				.limit(req.query.limit)
				.sort({ publishDate: 'desc' });
			res.json(articles);
		} else {
			const articles = await NewsArticle.find({}).sort({ publishDate: 'desc' });
			res.json(articles);
		}
	},
	getApprovedNewsArticles: async (req, res) => {
		const articles = await NewsArticle.find({ status: 'APPROVED' }).sort({
			publishDate: 'desc',
		});

		res.json(articles);
	},
	updateNewsArticle: async (req, res) => {
		try {
			const id = req.body.id;
			await NewsArticle.findByIdAndUpdate(id, req.body);

			res.json({ msg: 'Updated ' });
		} catch (e) {
			console.log(e);
		}
	},
	deleteNewsArticle: async (req, res) => {
		try {
			const id = req.params.id;
			console.log(id);
			await NewsArticle.findByIdAndDelete(id);
			res.json({ msg: `Successfully deleted article with ID: ${id}` });
		} catch (e) {
			console.log(e);
		}
	},
};
