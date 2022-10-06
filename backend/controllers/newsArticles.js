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
	getSpecificAmountOfApprovedNewsArticles: async (req, res) => {
		let { page, size, sortingOrder, filterKeyword, newsSource } = req.query;

		if (!page) {
			page = 1;
		}

		if (!size) {
			size = 12;
		}

		if (!sortingOrder) {
			sortingOrder = 'desc';
		}

		if (!filterKeyword) {
			filterKeyword = '';
		}

		if (!newsSource) {
			newsSource = [];
		}

		const limit = parseInt(size);
		const skip = (page - 1) * size;

		regexp = new RegExp(filterKeyword, 'i');

		const allArticlesLength = await NewsArticle.find({
			status: 'APPROVED',
			title: { $regex: regexp },
			publisher: { $in: newsSource },
		}).count();

		const articles = await NewsArticle.find({
			status: 'APPROVED',
			title: { $regex: regexp },
			publisher: { $in: newsSource },
		})
			.sort({
				publishDate: sortingOrder,
			})
			.limit(limit)
			.skip(skip);

		const recommendedArticles = await NewsArticle.find({
			recommended: true,
		});

		const totalPages = Math.ceil(allArticlesLength / size);

		const data = {
			articles,
			allArticlesLength,
			page,
			totalPages,
			recommendedArticles,
		};

		console.log(
			`keyword: ${filterKeyword}\nnewsSources: ${newsSource}\narticles: ${allArticlesLength}\ntotal pages: ${totalPages}\n`
		);
		res.json(data);
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
