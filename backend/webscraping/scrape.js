const cheerio = require('cheerio');
const axios = require('axios');

// scrape and format specific articles content into HTML
async function getArticleContent(url, articleClass) {
	try {
		const currentArticle = await axios.get(url);
		const cheerioArticle = cheerio.load(currentArticle.data);

		// parsing the
		let articleContent = cheerio.load(cheerioArticle(articleClass).html());

		articleContent = articleContent.html();

		articleContent = cheerio.load(articleContent, null, false);

		articleContent('*').each(function () {
			this.attribs = {};
		});

		articleContent = articleContent.html();

		return articleContent.trim();
	} catch (e) {
		console.log(e);
		return undefined;
	}
}

// Filtering function used for Puppeteer for filtering 2 arrays of objects against each other.
// This can be reused for other properties than title
// TODO - how do we make this a general function where we pass in an argument, that decides what is being filtered (like this is only filtering for a title at the moment)

function filterPuppeteerArticlesTitle(newArticles, articlesAlreadyAdded) {
	return newArticles.filter(
		(article) =>
			!articlesAlreadyAdded.find(
				({ title }) => article.title.toLowerCase() === title.toLowerCase()
			)
	);
}

module.exports = {
	getArticleContent,
	filterPuppeteerArticlesTitle,
};
