const newsArticlesRouter = require('express').Router();
const { NewsArticle } = require('../models/resources/newsArticle');

// get all articles
newsArticlesRouter.get('/news', async (req, res) => {
	const { limit } = req.query;

	// parsing limit to check if it is a number
	const parsedLimit = parseInt(limit);

	// check if we there was a query and if it was a number, if both were true then we send back the amount of articles that were requested

	if (limit && !isNaN(parsedLimit)) {
		const articles = await NewsArticle.find({})
			.limit(req.query.limit)
			.sort({ publishDate: 'desc' });
		res.json(articles);
	}
});

// newsArticlesRouter.get('/news/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const articles = await NewsArticle.find({ _id: id });

// 	res.json(articles);
// });

newsArticlesRouter.get('/news/approved', async (req, res) => {
	const articles = await NewsArticle.find({ status: 'APPROVED' }).sort({
		publishDate: 'desc',
	});

	res.json(articles);
});

module.exports = newsArticlesRouter;
