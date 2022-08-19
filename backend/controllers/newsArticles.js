const newsArticlesRouter = require('express').Router();
const { NewsArticle } = require('../models/resources/newsArticle');

// get all articles
newsArticlesRouter.get('/news', async (req, res) => {
	const articles = await NewsArticle.find({});

	res.json(articles);
});

newsArticlesRouter.get('/news/approved', async (req, res) => {
	const articles = await NewsArticle.find({ status: 'APPROVED' });

	res.json(articles);
});

module.exports = newsArticlesRouter;
