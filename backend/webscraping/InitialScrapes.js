const cheerio = require('cheerio');
const axios = require('axios');
const parse = require('./scrape');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

const { MONGODB_URI } = require('../configs/config');

// News Model
const { News } = require('../models/article');

// Connect to DB and start listening to incoming requests:
const connectDB = async () => {
	await mongoose.connect(MONGODB_URI);
	console.log('Connected to DB');
};

async function fetchArticles(url) {
	const response = await axios.get(url);
	return cheerio.load(response.data);
}

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

			publishDate = new Date(
				[...new Set(publishDate.split(' '))].join(' ').trim()
			);

			// If date couldn't be created, we need to add it manually
			let status = '';
			if (publishDate == 'Invalid Date') {
				publishDate = 'Date needs to be added manually';
				status = 'pending';
			} else {
				publishDate = publishDate.toISOString();
				status = 'approved';
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
				categories: ['alzheimers'],
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
			publishDate = new Date(
				[...new Set(publishDate.split(' '))].join(' ').trim()
			);

			let status = '';
			if (publishDate == 'Invalid Date') {
				publishDate = 'Date needs to be added manually';
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
				categories: ['dementia'],
				newsType: '',
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
					publishedDate: date,
					newsType: article.querySelector('.card-lead').textContent,
					categories: article.querySelector('.card-lead').textContent,
					status: 'APPROVED',
				};
			}
		);
		return articles;
	});

	console.log(articles);

	console.log('closing browser...');
	await browser.close();
	console.log('browser closed...');
}

firstTheGuardianScrape();
// firstAlzOrgNewsScrape();
// firstTheGuardianAlzheimerScrape();

// firstTheGuardianDementiaScrape();
