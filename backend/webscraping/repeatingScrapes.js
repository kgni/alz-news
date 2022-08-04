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
async function fetchArticles(url) {
	const response = await axios.get(url);
	return cheerio.load(response.data);
}

async function repeatingScrapes() {
	try {
		await connectDB();
		const articlesDB = await News.find({});
		const newArticles = [];

		// * Declaring all the functions
		async function theGuardianAlzheimerScrape(
			baseUrl = 'https://www.theguardian.com/society/alzheimers'
		) {
			let articlesScrapedCount = 0;
			let articlesScraped = [];
			async function scrape(baseUrl) {
				try {
					console.log(`Scraping... ${baseUrl}`);
					const $ = await fetchArticles(baseUrl);
					let articles = $('.fc-item__container');

					articles.each(async function () {
						// count articles in
						articlesScrapedCount++;
						let title = $(this).find('.fc-item__headline').text().trim();
						let subtitle = $(this).find('.fc-item__standfirst').text().trim();
						let url = $(this).find('a').attr('href');
						let publisher = 'The Guardian';
						let publisherUrl = 'https://www.theguardian.com';
						let publishDate = $(this).find('.fc-timestamp__text').text();
						// If we already have an article with the same name, then we skip that article from being added
						if (
							articlesDB.find(
								(article) =>
									article.title.toLocaleLowerCase() ===
									title.toLocaleLowerCase()
							) ||
							newArticles.find(
								(article) =>
									article.title.toLocaleLowerCase() ===
									title.toLocaleLowerCase()
							) ||
							articlesScraped.find(
								(article) =>
									article.title.toLocaleLowerCase() ===
									title.toLocaleLowerCase()
							)
						) {
							// console.log(`article already exists: "${title}"`);
							return;
						}

						// cleaning up the publishedDate, removing published and trimming
						publishDate = publishDate.split(' Published:').join('').trim();

						// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
						// we also turn the publishedDate into a date object, so we know it is formatted the same way.

						publishDate = new Date([...new Set(publishDate.split(' '))]);

						// If date couldn't be created, we need to add it manually
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
							categories: ["alzheimer's"],
							status: 'PENDING',
							// articleContent,
						};
						// console.log(article);
						articlesScraped.push(article);
					});

					// check if the pagination element exists (the one for going to the next page)
					if ($('.pagination__action--static')) {
						// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
						baseUrl = $('.pagination__action--static[rel="next"]').attr('href');

						// if the baseUrl is undefined, then we there are no next page and we want to just return
						if (
							baseUrl ===
							'https://www.theguardian.com/society/alzheimers?page=6'
						) {
							console.log('done scraping...');
							console.log(
								`${articlesScraped.length} / ${articlesScrapedCount} articles were scraped from https://www.theguardian.com/society/alzheimers`
							);
							newArticles.push(...articlesScraped);
							return;
						}
						await scrape(baseUrl);
					}
				} catch (error) {
					console.error(error);
				}
			}
			await scrape(baseUrl);
		}
		async function theGuardianDementiaScrape(
			baseUrl = 'https://www.theguardian.com/society/dementia'
		) {
			let articlesScrapedCount = 0;
			let articlesScraped = [];
			async function scrape(baseUrl) {
				try {
					console.log(`Scraping... ${baseUrl}`);
					const $ = await fetchArticles(baseUrl);
					let articles = $('.fc-item__container');

					articles.each(async function () {
						// count articles in
						articlesScrapedCount++;
						let title = $(this).find('.fc-item__headline').text().trim();
						let subtitle = $(this).find('.fc-item__standfirst').text().trim();
						let url = $(this).find('a').attr('href');
						let publisher = 'The Guardian';
						let publisherUrl = 'https://www.theguardian.com';
						let publishDate = $(this).find('.fc-timestamp__text').text();
						// If we already have an article with the same name, then we skip that article from being added
						if (
							articlesDB.find(
								(article) =>
									article.title.toLocaleLowerCase() ===
									title.toLocaleLowerCase()
							) ||
							newArticles.find(
								(article) =>
									article.title.toLocaleLowerCase() ===
									title.toLocaleLowerCase()
							) ||
							articlesScraped.find(
								(article) =>
									article.title.toLocaleLowerCase() ===
									title.toLocaleLowerCase()
							)
						) {
							// console.log(`article already exists: "${title}"`);
							return;
						}

						// cleaning up the publishedDate, removing published and trimming
						publishDate = publishDate.split(' Published:').join('').trim();

						// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
						// we also turn the publishedDate into a date object, so we know it is formatted the same way.

						publishDate = new Date([...new Set(publishDate.split(' '))]);

						// If date couldn't be created, we need to add it manually
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
							categories: ['dementia'],
							status: 'PENDING',
							// articleContent,
						};
						// console.log(article);
						articlesScraped.push(article);
					});

					// check if the pagination element exists (the one for going to the next page)
					if ($('.pagination__action--static')) {
						// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
						baseUrl = $('.pagination__action--static[rel="next"]').attr('href');

						// if the baseUrl is undefined, then we there are no next page and we want to just return
						if (
							baseUrl === 'https://www.theguardian.com/society/dementia?page=6'
						) {
							console.log('done scraping...');
							console.log(
								`${articlesScraped.length} / ${articlesScrapedCount} articles were scraped from https://www.theguardian.com/society/dementia`
							);
							newArticles.push(...articlesScraped);
							return;
						}
						await scrape(baseUrl);
					}
				} catch (error) {
					console.error(error);
				}
			}
			await scrape(baseUrl);
		}

		// * RUNNING all functions
		await theGuardianAlzheimerScrape();
		await theGuardianDementiaScrape();

		News.insertMany(newArticles, (err) => {
			if (err) return handleError(err);
			console.log(`${newArticles.length} articles added to DB`);
			mongoose.connection.close();
			return;
		});
	} catch (e) {
		console.log(e.message);
	}
}

repeatingScrapes();
