const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');

console.time('Scraping took');
async function fetchArticles(url) {
	const response = await axios.get(url);
	return cheerio.load(response.data);
}

const theGuardianArticlesData = [];

async function scrapeTheGuardianAlzheimer(
	baseUrl = 'https://www.theguardian.com/society/alzheimers'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('.fc-item__container');

		articles.each(function () {
			let title = $(this).find('.js-headline-text').text().trim();
			// If we already have an article with the same name, then we skip that article from being added
			if (
				theGuardianArticlesData.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				)
			) {
				console.log('article already exists');
				return;
			}
			let subtitle = $(this).find('.fc-item__standfirst').text().trim();
			let url = $(this).find('a').attr('href');
			let publisher = 'The Guardian';
			let publisherLink = 'https://www.theguardian.com';
			let publishedDate = $(this).find('.fc-timestamp__text').text();

			// cleaning up the publishedDate, removing published and trimming
			publishedDate = publishedDate.split(' Published:').join('').trim();

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.
			// We will format it like this: Day Month Date Year

			publishedDate = new Date(
				[...new Set(publishedDate.split(' '))].join(' ').trim()
			).toDateString();

			theGuardianArticlesData.push({
				title,
				subtitle,
				url,
				publisher,
				publisherLink,
				publishedDate,
			});
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
					`${theGuardianArticlesData.length} articles were scraped from https://www.theguardian.com/society/alzheimers`
				);
				console.timeEnd('Scraping took');
				return theGuardianArticlesData;
			}
			scrapeTheGuardianAlzheimer(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

async function scrapeTheGuardianDementia(
	baseUrl = 'https://www.theguardian.com/society/dementia'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('.fc-item__container');

		articles.each(function () {
			let title = $(this).find('.js-headline-text').text().trim();
			// If we already have an article with the same name, then we skip that article from being added
			if (
				theGuardianArticlesData.find(
					(article) =>
						article.title.toLocaleLowerCase() === title.toLocaleLowerCase()
				)
			) {
				console.log('article already exists');
				return;
			}
			let subtitle = $(this).find('.fc-item__standfirst').text().trim();
			let url = $(this).find('a').attr('href');
			let publisher = 'The Guardian';
			let publisherLink = 'https://www.theguardian.com';
			let publishedDate = $(this).find('.fc-timestamp__text').text();

			// cleaning up the publishedDate, removing published and trimming
			publishedDate = publishedDate.split(' Published:').join('').trim();

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.
			// We will format it like this: Day Month Date Year

			publishedDate = new Date(
				[...new Set(publishedDate.split(' '))].join(' ').trim()
			).toDateString();

			theGuardianArticlesData.push({
				title,
				subtitle,
				url,
				publisher,
				publisherLink,
				publishedDate,
			});
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
					`${theGuardianArticlesData.length} articles were scraped from https://www.theguardian.com/society/dementia`
				);
				console.timeEnd('Scraping took');
				return theGuardianArticlesData;
			}
			scrapeTheGuardianDementia(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

// TODO - FIGURE OUT HOW TO CALL ONE SCRAPE AFTER THE OTHER. RIGHT NOW THEY ARE GOING IN PARALLEL.
// TODO - WE WANT TO FIRST CALL THE ALZHEIMER SCRAPER, THEN THE DEMENTIA.

async function scrapeTheGuardian() {
	const alzheimerArticles = await scrapeTheGuardianAlzheimer();
	const dementiaArtilces = await scrapeTheGuardianDementia();

	console.log(theGuardianArticlesData.length);
}

const bigThinkArticlesData = [];
let articlesInTotal = 0;

// TODO - go into every article and get the publishing date (WE DONT NEED TO DO THIS, WE WILL NOT USE THIS WEBSITE)
async function scrapeBigThink(baseUrl = 'https://bigthink.com/neuropsych/') {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('article article');

		articles.each(async function () {
			articlesInTotal++;
			let title = $(this).find('.card-headline').text().trim();
			let subtitle = $(this).find('.card-excerpt').text().trim();

			// checking if the title or subtitle contains 'alz' or 'demen', if it doesn't contain either of the two, we just return and go to the next iteration
			if (
				!title.toLocaleLowerCase().includes('alz') &&
				!title.toLocaleLowerCase().includes('demen') &&
				!subtitle.toLocaleLowerCase().includes('alz') &&
				!subtitle.toLocaleLowerCase().includes('demen')
			) {
				return;
			}
			let url = $(this).find('.card-headline a').attr('href');

			// fetching a specific article to get the content of it
			const article = await axios.get(url);
			const cheerioArticle = await cheerio.load(article.data);
			setTimeout(() => {
				console.log(cheerioArticle(this).find('').text());
			}, 2000);

			let publisher = 'Big Think';
			let publisherLink = 'https://bigthink.com/';
			let publishedDate = cheerioArticle(this)
				.find('time.entry-date.publised')
				.text();

			// cleaning up the publishedDate, removing published and trimming

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.
			// We will format it like this: Day Month Date Year

			bigThinkArticlesData.push({
				title,
				subtitle,
				url,
				publisher,
				publisherLink,
				publishedDate,
			});
		});

		// check if the pagination element exists (the one for going to the next page)
		if ($('.next')) {
			// we both have two elements with the class, here we are getting the one, with the rel attribute that is next, so we get the href attribute of the page.
			baseUrl = 'https://bigthink.com/' + $('.next').attr('href');

			// if the baseUrl is undefined, then we there are no next page and we want to just return
			if (baseUrl.includes('undefined')) {
				console.log(bigThinkArticlesData);
				console.log('done scraping...');
				console.log(
					`${bigThinkArticlesData.length} / ${articlesInTotal} articles were scraped from https://bigthink.com/neuropsych/`
				);
				console.timeEnd('Scraping took');
				articlesInTotal = 0;
				return bigThinkArticlesData;
			}
			scrapeBigThink(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

scrapeTheGuardian();
