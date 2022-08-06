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

function filterPuppeteerArticlesTitle(newArticles, articlesAlreadyAdded) {
	return newArticles.filter(
		(article) =>
			!articlesAlreadyAdded.find(({ title }) => article.title === title)
	);
}

module.exports = {
	getArticleContent,
	filterPuppeteerArticlesTitle,
};
