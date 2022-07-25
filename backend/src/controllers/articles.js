const articlesRouter = require('express').Router();
const {
	PendingArticle,
	AcceptedArticle,
	RejectedArticle,
} = require('../models/article');

// get all articles
articlesRouter.get('/', async (req, res) => {
	const pendingArticles = await AcceptedArticle.find({});
	const acceptedArticles = await AcceptedArticle.find({});
	const rejectedArticles = await RejectedArticle.find({});

	const articles = {
		pendingArticles: pendingArticles,
		acceptedArticles: acceptedArticles,
		rejectedArticles: rejectedArticles,
	};
	res.json(articles);
});

// get all pending articles
articlesRouter.get('/pending', async (req, res) => {
	const articles = await PendingArticle.find({});
	res.json(articles);
});

// get all accepted articles
articlesRouter.get('/accepted', async (req, res) => {
	const articles = await AcceptedArticle.find({});
	res.json(articles);
});

// get all rejected articles
articlesRouter.get('/rejected', async (req, res) => {
	const articles = await RejectedArticle.find({});

	if (articles.length === 0) {
		res.status(404).json({ msg: 'No rejected articles in DB' });
		return;
	}
	res.json(articles);
});

articlesRouter.post('/', async (req, res) => {
	const body = req.body;
	const article = new PendingArticle({
		title: body.title,
		author: body.author,
		url: body.url,
		text: body.text,
	});
	const savedArticle = await article.save();
	res.status(201).json(savedArticle);
});

module.exports = articlesRouter;
