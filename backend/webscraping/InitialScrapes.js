const cheerio = require('cheerio');
const axios = require('axios');
const parse = require('./scrape');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

const { MONGODB_URI } = require('../configs/config');

// News Model
const { News } = require('../models/resources/newsArticle');

// Connect to DB and start listening to incoming requests:
const connectDB = async () => {
	await mongoose.connect(MONGODB_URI);
	console.log('Connected to DB');
};

// TODO - FETCH ALL OF THE ARTICLE CONTENT AND PUT IT ON EACH ARTICLE (AS HTML PREFERABLY)
// TODO - TAKE A SCREENSHOT OF EACH ARTICLE, HOST IT YOURSELF (CREATE LINK FOR EACH IMAGE? HOW TO SAVE A IMAGE TO MONGODB?) AND PUT THE LINK ON EACH ARTICLE
async function fetchArticles(url) {
	const response = await axios.get(url);
	return cheerio.load(response.data);
}

// * theguardian.com - TheGuardian
// all the guardian articles scraped (both dementia and alzheimer's) (without duplicates)
let theGuardianArticlesData = [];
// alzheimer's articles scraped
const theGuardianArticlesAlzheimer = [];
let theGuardianArticlesAlzheimerTotal = 0;

// dementia articles scraped
const theGuardianArticlesDementia = [];
let theGuardianArticlesDementiaTotal = 0;

async function firstTheGuardianAlzheimerScrape(
	baseUrl = 'https://www.theguardian.com/society/alzheimers'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('.fc-item__container');

		articles.each(async function () {
			// count articles in
			theGuardianArticlesAlzheimerTotal++;
			let title = $(this).find('.fc-item__headline').text().trim();
			let subtitle = $(this).find('.fc-item__standfirst').text().trim();
			let url = $(this).find('a').attr('href');
			let publisher = 'The Guardian';
			let publisherUrl = 'https://www.theguardian.com';
			let publishDate = $(this).find('.fc-timestamp__text').text();
			// If we already have an article with the same name, then we skip that article from being added
			if (
				theGuardianArticlesAlzheimer.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				)
			) {
				console.log(`article already exists: "${title}"`);
				return;
			}

			// TODO - Scrape article content, for now we will just link to articles instead
			// scraping the contents of the individual article
			// articleContent = await parse.getArticleContent(url, '#maincontent');
			// if (!articleContent) {
			// 	console.log('Article content could not be scraped');
			// }

			// cleaning up the publishedDate, removing published and trimming
			publishDate = publishDate.split(' Published:').join('').trim();

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.

			publishDate = new Date([...new Set(publishDate.split(' '))]);

			// If date couldn't be created, we need to add it manually
			let status = '';
			if (publishDate == 'Invalid Date') {
				publishDate = null;
				status = 'PENDING';
			} else {
				publishDate = publishDate.toISOString();
				status = 'APPROVED';
			}

			// try {
			// 	publishDate = publishDate.toISOString();
			// } catch (e) {
			// 	console.log('there was an error');
			// }

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherUrl,
				publishDate,
				categories: ["alzheimer's"],
				status,
				// articleContent,
			};
			// console.log(article);
			theGuardianArticlesAlzheimer.push(article);
		});

		// check if the pagination element exists (the one for going to the next page)
		if ($('.pagination__action--static')) {
			// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
			baseUrl = $('.pagination__action--static[rel="next"]').attr('href');

			// if the baseUrl is undefined, then we there are no next page and we want to just return
			if (baseUrl === undefined) {
				console.log('done scraping...');
				console.log(
					`${theGuardianArticlesAlzheimer.length} / ${theGuardianArticlesAlzheimerTotal} articles were scraped from https://www.theguardian.com/society/alzheimers`
				);
				theGuardianArticlesData.push(...theGuardianArticlesAlzheimer);
				// console.log(theGuardianArticlesData);
				return;
			}
			await firstTheGuardianAlzheimerScrape(baseUrl);
		}
	} catch (error) {
		console.error(error);
	}
}

async function firstTheGuardianDementiaScrape(
	baseUrl = 'https://www.theguardian.com/society/dementia'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('.fc-item__container');

		articles.each(async function () {
			// increment articles scraped counter by 1 on every iteration
			theGuardianArticlesDementiaTotal++;

			// creating the properties for the
			let title = $(this).find('.fc-item__headline').text().trim();

			// check if we have an article already with the title name, if we have skip this iteration.
			if (
				theGuardianArticlesData.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				) ||
				theGuardianArticlesDementia.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				)
			) {
				console.log(`article already exists: ${title}`);
				return;
			}

			let subtitle = $(this).find('.fc-item__standfirst').text().trim();
			let url = $(this).find('a').attr('href');
			let publisher = 'The Guardian';
			let publisherUrl = 'https://www.theguardian.com';
			let publishDate = $(this).find('.fc-timestamp__text').text();
			// cleaning up the publishedDate, removing published and trimming
			publishDate = publishDate.split(' Published:').join('').trim();
			publishDate = new Date([...new Set(publishDate.split(' '))]);

			let status = '';
			if (publishDate == 'Invalid Date') {
				publishDate = null;
				status = 'PENDING';
			} else {
				publishDate = publishDate.toISOString();
				status = 'APPROVED';
			}

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherUrl,
				publishDate,
				categories: ['dementia'],
				type: '',
				status,
				// articleContent,
			};
			// console.log(article);
			theGuardianArticlesDementia.push(article);
		});

		// check if the pagination element exists (the one for going to the next page)
		if ($('.pagination__action--static')) {
			// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
			baseUrl = $('.pagination__action--static[rel="next"]').attr('href');

			// if the baseUrl is undefined, then we there are no next page and we want to just return
			if (baseUrl === undefined) {
				// console.log(theGuardianArticlesData);
				console.log('done scraping...');
				console.log(
					`${theGuardianArticlesDementia.length} / ${theGuardianArticlesDementiaTotal} articles were scraped from https://www.theguardian.com/society/dementia`
				);
				theGuardianArticlesData = theGuardianArticlesData.concat(
					theGuardianArticlesDementia
				);
				return;
			}
			await firstTheGuardianDementiaScrape(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

// Add initial The Guardian Articles to DB
async function firstTheGuardianScrape() {
	await connectDB();
	await firstTheGuardianAlzheimerScrape();
	console.log(theGuardianArticlesData.length);
	await firstTheGuardianDementiaScrape();
	// console.log(
	// 	`${theGuardianArticlesData.length} / ${
	// 		theGuardianArticlesAlzheimerTotal + theGuardianArticlesDementiaTotal
	// 	} articles were scraped`
	// );
	console.log(theGuardianArticlesDementia);
	console.log(`Alzheimer'z articles: ${theGuardianArticlesAlzheimer.length}`);
	console.log(`Dementia articles: ${theGuardianArticlesDementia.length}`);
	console.log(`Total articles: ${theGuardianArticlesData.length}`);

	await News.insertMany(theGuardianArticlesData, (err) => {
		if (err) return handleError(err);
		console.log('Added documents to database');
		mongoose.connection.close();
		return;
	});
}

// * alz.org - Alzheimer's Association
const alzOrgArticles = [];

async function firstAlzOrgNewsScrape(
	baseUrl = 'https://www.alz.org/news/browse-by-news-type?newstype=ExternalNews'
) {
	console.log('starting browser...');

	const browser = await puppeteer.launch();
	console.log('browser started...');
	const page = await browser.newPage();
	await page.goto(baseUrl);
	const articles = await page.evaluate(() => {
		const articles = Array.from(document.querySelectorAll('.card')).map(
			(article) => {
				// taking the date, turning into a date object which will be formatted toISOString and the to a string.
				let date = article.querySelector('.card-date').textContent;
				date = new Date(date).toISOString().toString();
				return {
					title: article.querySelector('.card-title').textContent,
					subtitle: article.querySelector('.card-text').textContent,
					url: article.querySelector('.card-title a').href,
					publisher: ['alz.org', "alzheimer's association"],
					publisherUrl: 'https://www.alz.org/',
					publishDate: date,
					categories: article.querySelector('.card-lead').textContent,
					type: article.querySelector('.card-lead').textContent,
					status: 'PENDING',
				};
			}
		);
		return articles;
	});

	await connectDB();

	News.insertMany(articles, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log('Added documents to database');
		mongoose.connection.close();
	});

	console.log('closing browser...');
	await browser.close();
	console.log('browser closed...');
	return;
}

// * alzheimers.org.uk - Alzheimer's Society

// TODO - get Date for every article (look at the url, or click into every article and fetch it?)
async function firstAlzheimersOrgUkScrape(
	baseUrl = 'https://www.alzheimers.org.uk/about-us/news-and-media/latest-news'
) {
	console.log('starting browser...');

	// launching browser
	const browser = await puppeteer.launch({ headless: false });
	console.log('browser started...');

	// creating a new page
	const page = await browser.newPage();
	// go to the base url
	await page.goto(baseUrl);

	// waiting for cookie modal popup
	await page.waitForSelector('#onetrust-accept-btn-handler');
	// clicking cookie modal away
	await page.click('#onetrust-accept-btn-handler');

	// click on the see-more button insdie of our news content container, while it is present.
	while (await page.$('#alz-mixed-content-news .see-more')) {
		try {
			// clicking the button see more button
			page.click('#alz-mixed-content-news .see-more');
			// waiting for our AJAX request to return OK
			await page.waitForResponse((response) => response.status() === 200);
		} catch (e) {
			console.log(e);
		}
	}

	// evaluate will allow us to run JavaScript inside of the page, like we could do in the console.
	const articles = await page.evaluate(async () => {
		// while (document.querySelector('#alz-mixed-content-news .see-more')) {
		// 	page.click('#alz-mixed-content-news .see-more');
		// }
		const articles = Array.from(
			document.querySelectorAll(
				'#alz-mixed-content-news [data-content-type="article"]'
			)
		).map((article) => {
			// taking the date, turning into a date object which will be formatted toISOString and the to a string.
			// let date = article.querySelector('.card-date').textContent;
			// date = new Date(date).toISOString().toString();

			// let subtitle;

			// if (!article.querySelector('p')) {
			// 	subtitle = article.querySelector('.field--field-summary');
			// } else {
			// 	subtitle = article.querySelector('p');
			// }

			return {
				title: article.querySelector('.title').textContent.trim(),

				subtitle: article.querySelector('.pattern--teaser--summary')
					.firstElementChild.textContent,
				url: article.querySelector('a').href,
				publisher: ['alzheimers.org.uk', "alzheimer's society"],
				publisherUrl: 'https://www.alzheimers.org.uk/',
				publishDate: 'test',
				categories: ["dementia, alzheimer's"],
				type: article.querySelector('span').textContent.toLowerCase(),
				status: 'PENDING',
			};
		});
		return articles;
	});

	console.log(articles);
	console.log(articles.length);

	// await connectDB();

	// News.insertMany(articles, (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	}
	// 	console.log('Added documents to database');
	// 	mongoose.connection.close();
	// });

	// console.log(articles);

	console.log('closing browser...');
	await browser.close();
	console.log('browser closed...');
	return;
}

// * Nia Nih (National Institute on Aging - National Institute of Health)
let firstJAlzArticlesData = [];
let firstJAlzArticlesTotal = 0;

async function firstJAlzScrape(baseUrl = 'https://www.j-alz.com/latest-news') {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('article');

		articles.each(async function () {
			// increment articles scraped counter by 1 on every iteration
			firstJAlzArticlesTotal++;

			// creating the properties for the
			let title = $(this).find('h2').text().trim();

			// check if we have an article already with the title name, if we have skip this iteration.
			if (
				firstJAlzArticlesData.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				)
			) {
				console.log(`article already exists: ${title}`);
				return;
			}

			let subtitle = $(this).find('.field-items p').text().trim();
			let url = $(this).find('h2 a').attr('href');
			let publisher = "Journal Of Alzheimer's Disease";
			let publisherUrl = 'https://www.j-alz.com/';
			let publishDate = $(this).find('h3 span').text();
			// cleaning up the publishedDate, removing published and trimming
			publishDate = publishDate.split(' Published:').join('').trim();
			publishDate = new Date([...new Set(publishDate.split(' '))]);

			let status = '';
			if (publishDate == 'Invalid Date') {
				publishDate = null;
				status = 'PENDING';
			} else {
				publishDate = publishDate.toISOString();
				status = 'APPROVED';
			}
			// getting the content of each individual article as HTML.

			// TODO - Scrape article content, for now we will just link to articles instead

			// articleContent = await parse.getArticleContent(url, '#maincontent');

			// // TODO - if there is a modal that blocks us from getting the main content, we should run puppeteer instead - click away the modal and get the content.
			// if (!articleContent) {
			// 	console.log('Article content could not be scraped');
			// }

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherUrl,
				publishDate,
				categories: ["alzheimer's"],
				type: 'news',
				status,
				// articleContent,
			};
			// console.log(article);
			firstJAlzArticlesData.push(article);
		});

		// check if the pagination element exists (the one for going to the next page)
		if ($('.pager-next')) {
			// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
			baseUrl = 'https://www.j-alz.com/' + $('.pager-next a').attr('href');

			// if the baseUrl is undefined, then we there are no next page and we want to just return
			if (baseUrl === 'https://www.j-alz.com/undefined') {
				console.log(firstJAlzArticlesData);
				console.log('done scraping...');
				console.log(
					`${firstJAlzArticlesData.length} / ${firstJAlzArticlesTotal} articles were scraped from https://www.j-alz.com/latest-news`
				);
				return;
			}
			await firstJAlzScrape(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

// * Nia Nih (National Institute on Aging - National Institute of Health)
let firstNiaNihGovArticlesData = [];
let firstNiaNihGovArticleTotal = 0;

// ! all of the articles scraped here intially, will be set as pending, and we are manually going to sort the articles and set their status and their categories
async function firstNiaNihGovScrape(
	baseUrl = 'https://www.nia.nih.gov/news/all'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('article');

		articles.each(async function () {
			// increment articles scraped counter by 1 on every iteration
			firstNiaNihGovArticleTotal++;

			// creating the properties for the
			let title = $(this).find('.news-title').text().trim();

			// check if we have an article already with the title name, if we have skip this iteration.
			// if (
			// 	firstNiaNihGovArticlesData.find(
			// 		(article) =>
			// 			article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
			// 	)
			// ) {
			// 	console.log(`article already exists: ${title}`);
			// 	return;
			// }

			let subtitle = null;
			let url =
				'https://www.nia.nih.gov' + $(this).find('.news-title a').attr('href');
			let publisher = 'National Institute on Aging';
			let publisherUrl = 'https://www.nia.nih.gov/';
			let publishDate = $(this).find('.postdate').text();
			let type = $(this).find('.news-type').text();
			// cleaning up the publishedDate, removing published and trimming
			publishDate = publishDate.split(' Published:').join('').trim();
			publishDate = new Date([...new Set(publishDate.split(' '))]);

			if (publishDate == 'Invalid Date') {
				publishDate = null;
			} else {
				publishDate = publishDate.toISOString();
			}
			// getting the content of each individual article as HTML.

			// TODO - Scrape article content, for now we will just link to articles instead

			// articleContent = await parse.getArticleContent(url, '#maincontent');

			// // TODO - if there is a modal that blocks us from getting the main content, we should run puppeteer instead - click away the modal and get the content.
			// if (!articleContent) {
			// 	console.log('Article content could not be scraped');
			// }

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherUrl,
				publishDate,
				categories: [],
				type: ['news', type],
				status: 'PENDING',
				// articleContent,
			};
			// console.log(article);
			firstNiaNihGovArticlesData.push(article);
		});

		// !PAGINATION
		// check if the pagination element exists (the one for going to the next page)
		if ($('.page-next')) {
			// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
			baseUrl =
				'https://www.nia.nih.gov/news/all' + $('.page-next a').attr('href');

			// if the baseUrl is undefined, then we there are no next page and we want to just return
			if (baseUrl === 'https://www.nia.nih.gov/news/allundefined') {
				console.log(firstNiaNihGovArticlesData);
				console.log('done scraping...');
				console.log(
					`${firstNiaNihGovArticlesData.length} / ${firstNiaNihGovArticleTotal} articles were scraped from https://www.nia.nih.gov/news/all`
				);
				return;
			}
			await firstNiaNihGovScrape(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

// * NeuroScience News
let firstNeuroScienceNewsArticleData = [];
let firstNeuroScienceNewsTotal = 0;

async function firstNeuroScienceNews(
	baseUrl = 'https://neurosciencenews.com/neuroscience-terms/alzheimers-disease/'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('main article');
		// console.log(articles);

		articles.each(async function () {
			// increment articles scraped counter by 1 on every iteration
			firstNeuroScienceNewsTotal++;

			// creating the properties for the
			let title = $(this).find('.title').text().trim();

			// check if we have an article already with the title name, if we have skip this iteration.
			if (
				firstNeuroScienceNewsArticleData.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				)
			) {
				console.log(`article already exists: ${title}`);
				return;
			}

			let subtitle = $(this).find('.excerpt').text().trim();
			let url = $(this).find('.title a').attr('href');
			let publisher = 'Neuroscience News';
			let publisherUrl = 'https://neurosciencenews.com/';
			let publishDate = $(this).find('.dateCreated').text();
			// cleaning up the publishedDate, removing published and trimming
			publishDate = publishDate.trim();
			publishDate = new Date(publishDate);

			if (publishDate == 'Invalid Date') {
				publishDate = null;
			} else {
				publishDate = publishDate.toISOString();
			}

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherUrl,
				publishDate,
				categories: [],
				type: ['news'],
				status: 'PENDING',
				// articleContent,
			};

			firstNeuroScienceNewsArticleData.push(article);
		});

		// !PAGINATION
		// check if the pagination element exists (the one for going to the next page)
		if ($('.page-next')) {
			// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
			baseUrl = $('.next').attr('href');

			// if the baseUrl is undefined, then we there are no next page and we want to just return
			if (baseUrl === undefined) {
				console.log(firstNeuroScienceNewsArticleData);
				console.log('done scraping...');
				console.log(
					`${firstNeuroScienceNewsArticleData.length} / ${firstNeuroScienceNewsTotal} articles were scraped from https://neurosciencenews.com/neuroscience-terms/alzheimers-disease/`
				);
				return;
			}
			await firstNeuroScienceNews(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

// INTIAL SCRAPE

async function initialScrape() {}
