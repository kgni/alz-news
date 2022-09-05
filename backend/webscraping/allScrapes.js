// TODO - Fill this out when allScrapes is done, this will be used to fetch all articles again, but it will check if the articles are already in the DB. Articles should also be set to PENDING instead of APPROVED, like they are in the allScrapes

const cheerio = require('cheerio');
const axios = require('axios');
const parse = require('./scrape');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

const { MONGODB_URI } = require('../configs/config');

// News Model
const { NewsArticle } = require('../models/resources/newsArticle');

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

// INTIAL SCRAPE

async function allScrape() {
	await connectDB();
	const articlesDB = await NewsArticle.find({});
	const newArticles = [];

	// * DECLARING functions

	// alz.org

	async function alzOrgNewsScrape(
		baseUrl = 'https://www.alz.org/news/browse-by-news-type?newstype=ExternalNews'
	) {
		console.log('starting browser...');
		const browser = await puppeteer.launch();
		console.log('browser started...');
		console.log(`scraping... alz.org`);
		const page = await browser.newPage();
		await page.goto(baseUrl);
		const newFetchedArticles = await page.evaluate(() => {
			let articlesScrapedCount = 0;
			let articlesScraped = [];
			Array.from(document.querySelectorAll('.card')).map((article) => {
				articlesScrapedCount++;
				// taking the date, turning into a date object which will be formatted toISOString and the to a string.

				let title = article.querySelector('.card-title').textContent.trim();
				let subtitle = article.querySelector('.card-text').textContent.trim();
				let url = article.querySelector('.card-title a').href;
				let publisher = ['alz.org', "Alzheimer's Association"];
				let publisherUrl = 'https://www.alz.org/';
				let publishDate = article.querySelector('.card-date').textContent;
				publishDate = new Date(publishDate);

				let categories = ["alzheimer's"];
				let type = article.querySelector('.card-lead').textContent;

				if (publishDate == 'Invalid Date') {
					publishDate = null;
				} else {
					publishDate = publishDate.toISOString().toString();
				}

				let articleData = {
					title,
					subtitle,
					url,
					publisher,
					publisherUrl,
					publishDate,
					categories,
					type: 'news',
					status: 'PENDING',
				};
				articlesScraped.push(articleData);
			});
			console.log('done scraping...');
			console.log(
				`${articlesScraped.length} / ${articlesScrapedCount} articles were scraped from https://www.theguardian.com/society/alzheimers`
			);
			return articlesScraped;
		});

		let filteredNewArticles = parse.filterPuppeteerArticlesTitle(
			newFetchedArticles,
			newArticles
		);
		// let filteredNewArticles = newFetchedArticles.filter(
		// 	(article) => !newArticles.find(({ title }) => article.title === title)
		// );

		// filtering  articles already in DB

		filteredNewArticles = parse.filterPuppeteerArticlesTitle(
			filteredNewArticles,
			articlesDB
		);

		newArticles.push(...filteredNewArticles);
		console.log(
			`${filteredNewArticles.length} articles added from https://www.alz.org/news/browse-by-news-type?newstype=ExternalNewsr`
		);
		console.log('closing browser...');
		await browser.close();
		console.log('browser closed...');
		return;
	}

	// alzheimers.org.uk - Alzheimer's Society

	async function alzheimersOrgUkScrape(
		baseUrl = 'https://www.alzheimers.org.uk/about-us/news-and-media/latest-news'
	) {
		console.log('starting browser...');

		// launching browser
		const browser = await puppeteer.launch();
		console.log('browser started...');

		// creating a new page
		const page = await browser.newPage();
		// go to the base url
		await page.goto(baseUrl);

		// waiting for cookie modal popup
		await page.waitForSelector('#onetrust-accept-btn-handler');
		// clicking cookie modal away
		await page.click('#onetrust-accept-btn-handler');

		console.log(`started scraping... ${baseUrl}`);
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
		const newFetchedArticles = await page.evaluate(async () => {
			let articlesScrapedCount = 0;
			let articlesScraped = [];
			// while (document.querySelector('#alz-mixed-content-news .see-more')) {
			// 	page.click('#alz-mixed-content-news .see-more');
			// }
			Array.from(
				document.querySelectorAll(
					'#alz-mixed-content-news [data-content-type="article"]'
				)
			).map((article) => {
				articlesScrapedCount++;

				let title = article.querySelector('.title').textContent.trim();
				let subtitle = article
					.querySelector('.pattern--teaser--summary')
					.firstElementChild.textContent.trim();
				let url = article.querySelector('a').href;
				let publishDate = url.split('/')[4];
				publishDate = new Date(publishDate);

				let type = article.querySelector('span').textContent.toLowerCase();

				if (
					articlesScraped.find(
						(article) => article.title.toLowerCase() === title.toLowerCase()
					) &&
					title !== ''
				) {
					return;
				}

				if (publishDate == 'Invalid Date') {
					publishDate = null;
				} else {
					publishDate = publishDate.toISOString().toString();
				}

				let articleData = {
					title,
					subtitle,
					url,
					publisher: ['alzheimers.org.uk', "Alzheimer's Society"],
					publisherUrl: 'https://www.alzheimers.org.uk/',
					publishDate,
					categories: ['dementia', "alzheimer's"],
					type: 'news',
					status: 'PENDING',
				};
				articlesScraped.push(articleData);
			});
			return articlesScraped;
		});

		let filteredNewArticles = parse.filterPuppeteerArticlesTitle(
			newFetchedArticles,
			newArticles
		);

		// filtering  articles already in DB

		filteredNewArticles = parse.filterPuppeteerArticlesTitle(
			filteredNewArticles,
			articlesDB
		);

		console.log(filteredNewArticles);

		newArticles.push(...filteredNewArticles);
		console.log('closing browser...');
		await browser.close();
		console.log('browser closed...');
		return;
	}

	// * Nia Nih (National Institute on Aging - National Institute of Health)

	// ! all of the articles scraped here intially, will be set as pending, and we are manually going to sort the articles and set their status and their categories
	async function niaNihGovScrape(baseUrl = 'https://www.nia.nih.gov/news/all') {
		let articlesScrapedCount = 0;
		let articlesScraped = [];
		async function scrape() {
			try {
				console.log(`Scraping... ${baseUrl}`);
				const $ = await fetchArticles(baseUrl);
				let articles = $('article');

				articles.each(async function () {
					// increment articles scraped counter by 1 on every iteration
					articlesScrapedCount++;

					// creating the properties for the
					let title = $(this).find('.news-title').text().trim();

					let subtitle = null;
					let url =
						'https://www.nia.nih.gov' +
						$(this).find('.news-title a').attr('href');
					let publisher = ['nia.gov', 'National Institute on Aging'];
					let publisherUrl = 'https://www.nia.nih.gov/';
					let publishDate = $(this).find('.postdate').text();
					let type = $(this).find('.news-type').text().toLowerCase();
					// cleaning up the publishedDate, removing published and trimming
					publishDate = publishDate.split(' Published:').join('').trim();
					publishDate = new Date([...new Set(publishDate.split(' '))]);
					if (
						(articlesDB.find(
							(article) => article.title.toLowerCase() === title.toLowerCase()
						) ||
							newArticles.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							) ||
							articlesScraped.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							)) &&
						title !== ''
					) {
						// console.log(`article already exists: "${title}"`);
						return;
					}

					if (url === 'https://www.nia.nih.govundefined') {
						return;
					}

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
						type: 'news',
						status: 'PENDING',
						// articleContent,
					};
					// console.log(article);
					articlesScraped.push(article);
				});

				// !PAGINATION
				// check if the pagination element exists (the one for going to the next page)
				if ($('.page-next')) {
					// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
					baseUrl =
						'https://www.nia.nih.gov/news/all' + $('.page-next a').attr('href');

					// if the baseUrl is undefined, then we there are no next page and we want to just return
					if (baseUrl === 'https://www.nia.nih.gov/news/allundefined') {
						console.log(articlesScraped);
						console.log('done scraping...');
						console.log(
							`${articlesScraped.length} / ${articlesScrapedCount} articles were scraped from https://www.nia.nih.gov/news/all`
						);
						newArticles.push(...articlesScraped);
						return;
					}
					await scrape(baseUrl);
				}
				// console.log(theGuardianArticlesData);
			} catch (error) {
				console.error(error);
			}
		}
		await scrape(baseUrl);
	}

	async function jAlzScrape(baseUrl = 'https://www.j-alz.com/latest-news') {
		let articlesScrapedCount = 0;
		let articlesScraped = [];
		async function scrape() {
			try {
				console.log(`Scraping... ${baseUrl}`);
				const $ = await fetchArticles(baseUrl);
				let articles = $('article');

				articles.each(async function () {
					// increment articles scraped counter by 1 on every iteration
					articlesScrapedCount++;

					// creating the properties for the
					let title = $(this).find('h2').text().trim();

					// check if we have an article already with the title name, if we have skip this iteration.
					if (
						(articlesDB.find(
							(article) => article.title.toLowerCase() === title.toLowerCase()
						) ||
							newArticles.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							) ||
							articlesScraped.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							)) &&
						title !== ''
					) {
						// console.log(`article already exists: "${title}"`);
						return;
					}

					let subtitle = $(this).find('.field-items p').text().trim();
					let url = `https://www.j-alz.com${$(this).find('h2 a').attr('href')}`;
					let publisher = ['j-alz.com', "Journal Of Alzheimer's Disease"];
					let publisherUrl = 'https://www.j-alz.com/';
					let publishDate = $(this).find('h3 span').text();
					// cleaning up the publishedDate, removing published and trimming
					publishDate = publishDate.split(' Published:').join('').trim();
					publishDate = new Date([...new Set(publishDate.split(' '))]);

					let status = '';
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
						type: 'news',
						status: 'PENDING',
						// articleContent,
					};
					// console.log(article);
					articlesScraped.push(article);
				});

				// check if the pagination element exists (the one for going to the next page)
				if ($('.pager-next')) {
					// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
					baseUrl = 'https://www.j-alz.com' + $('.pager-next a').attr('href');

					// if the baseUrl is undefined, then we there are no next page and we want to just return
					if (baseUrl === 'https://www.j-alz.comundefined') {
						console.log(articlesScraped);
						console.log('done scraping...');
						console.log(
							`${articlesScraped.length} / ${articlesScrapedCount} articles were scraped from https://www.j-alz.com/latest-news`
						);
						newArticles.push(...articlesScraped);
						return;
					}
					await scrape(baseUrl);
				}

				// console.log(theGuardianArticlesData);
			} catch (error) {
				console.error(error);
			}
		}
		await scrape(baseUrl);
	}

	// theguardian.com

	async function theGuardianAlzheimerScrape(
		baseUrl = 'https://www.theguardian.com/society/alzheimers'
	) {
		let articlesScrapedCount = 0;
		let articlesScraped = [];
		async function scrape() {
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
						(articlesDB.find(
							(article) => article.title.toLowerCase() === title.toLowerCase()
						) ||
							newArticles.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							) ||
							articlesScraped.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							)) &&
						title !== ''
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
					let status = '';
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
					if (baseUrl === undefined) {
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
		async function scrape() {
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
						(articlesDB.find(
							(article) => article.title.toLowerCase() === title.toLowerCase()
						) ||
							newArticles.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							) ||
							articlesScraped.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							)) &&
						title !== ''
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
					let status = '';
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
					if (baseUrl === undefined) {
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

	// * NeuroScience News

	async function neuroScienceNews(
		baseUrl = 'https://neurosciencenews.com/neuroscience-terms/alzheimers-disease/'
	) {
		let articlesScrapedCount = 0;
		let articlesScraped = [];

		async function scrape() {
			try {
				console.log(`Scraping... ${baseUrl}`);
				const $ = await fetchArticles(baseUrl);
				let articles = $('main article');
				// console.log(articles);

				articles.each(async function () {
					// increment articles scraped counter by 1 on every iteration
					articlesScrapedCount++;

					// creating the properties for the
					let title = $(this).find('.title').text().trim();
					// If we already have an article with the same name, then we skip that article from being added
					if (
						(articlesDB.find(
							(article) => article.title.toLowerCase() === title.toLowerCase()
						) ||
							newArticles.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							) ||
							articlesScraped.find(
								(article) => article.title.toLowerCase() === title.toLowerCase()
							)) &&
						title !== ''
					) {
						// console.log(`article already exists: "${title}"`);
						return;
					}
					// getting the container for the subtitle, but we will remove all other children inside the container, except for the actual container with the text
					let subtitle = $(this)
						.find('.excerpt')
						.children()
						.remove()
						.end()
						.text()
						.trim();
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
						type: 'news',
						status: 'PENDING',
						// articleContent,
					};

					articlesScraped.push(article);
				});

				// !PAGINATION
				// check if the pagination element exists (the one for going to the next page)
				if ($('.page-next')) {
					// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
					baseUrl = $('.next').attr('href');

					// if the baseUrl is undefined, then we there are no next page and we want to just return
					if (baseUrl === undefined) {
						console.log(articlesScraped);
						console.log('done scraping...');
						console.log(
							`${articlesScraped.length} / ${articlesScrapedCount} articles were scraped from https://neurosciencenews.com/neuroscience-terms/alzheimers-disease/`
						);
						newArticles.push(...articlesScraped);
						return;
					}
					await scrape(baseUrl);
				}

				// console.log(theGuardianArticlesData);
			} catch (error) {
				console.error(error);
			}
		}

		await scrape(baseUrl);
	}

	await alzOrgNewsScrape();
	await neuroScienceNews();
	await niaNihGovScrape();
	await jAlzScrape();
	await theGuardianAlzheimerScrape();
	await theGuardianDementiaScrape();
	await alzheimersOrgUkScrape();
	// console.log(`${newArticles.length} articles added`);
	NewsArticle.insertMany(newArticles, (err) => {
		if (err) return handleError(err);
		console.log(`${newArticles.length} articles added to DB`);
		mongoose.connection.close();
		return;
	});
}

allScrape();
