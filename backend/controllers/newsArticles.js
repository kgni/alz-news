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
	} else {
		const articles = await NewsArticle.find({}).sort({ publishDate: 'desc' });
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

// UPDATE

newsArticlesRouter.put('/news', async (req, res) => {
	try {
		const id = req.body.id;
		await NewsArticle.findByIdAndUpdate(id, req.body);

		res.json({ msg: 'Updated ' });
	} catch (e) {
		console.log(e);
	}
});

// DELETE

newsArticlesRouter.delete('/news/:id', async (req, res) => {
	try {
		const id = req.params.id;
		console.log(id);
		await NewsArticle.findByIdAndDelete(id);
		res.json({ msg: `Successfully deleted article with ID: ${id}` });
	} catch (e) {
		console.log(e);
	}
});

module.exports = newsArticlesRouter;
