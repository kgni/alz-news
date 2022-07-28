const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const parse = require('./scrape');

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
			let publisherLink = 'https://www.theguardian.com';
			let publishedDate = $(this).find('.fc-timestamp__text').text();
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

			// scraping the contents of the individual article
			articleContent = await parse.getArticleContent(url, '#maincontent');

			// cleaning up the publishedDate, removing published and trimming
			publishedDate = publishedDate.split(' Published:').join('').trim();

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.

			publishedDate = new Date(
				[...new Set(publishedDate.split(' '))].join(' ').trim()
			);

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherLink,
				publishedDate,
				articleContent,
			};
			console.log(article);
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
				console.log(theGuardianArticlesData);
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
			let publisherLink = 'https://www.theguardian.com';
			let publishedDate = $(this).find('.fc-timestamp__text').text();
			// cleaning up the publishedDate, removing published and trimming
			publishedDate = publishedDate.split(' Published:').join('').trim();
			publishedDate = new Date(
				[...new Set(publishedDate.split(' '))].join(' ').trim()
			);
			// getting the content of each individual article as HTML.
			// TODO - if there is a modal that blocks us from geetting the main content, we should run puppeteer instead - click away the modal and get the content.
			articleContent = await parse.getArticleContent(url, '#maincontent');

			if (!articleContent) {
				console.log('HEEEY!');
				return;
			}

			// sometimes the publishedDate would be there twice, we remove this by using the new Set constructor while we split the published date into a new array
			// we also turn the publishedDate into a date object, so we know it is formatted the same way.

			const article = {
				title,
				subtitle,
				url,
				publisher,
				publisherLink,
				publishedDate,
				articleContent,
			};
			console.log(article);
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

async function firstScrape() {
	await firstTheGuardianAlzheimerScrape();
	console.log(theGuardianArticlesData.length);
	await firstTheGuardianDementiaScrape();
	// console.log(
	// 	`${theGuardianArticlesData.length} / ${
	// 		theGuardianArticlesAlzheimerTotal + theGuardianArticlesDementiaTotal
	// 	} articles were scraped`
	// );

	console.log(`Alzheimer'z articles: ${theGuardianArticlesAlzheimer.length}`);
	console.log(`Dementia articles: ${theGuardianArticlesDementia.length}`);
	console.log(`Total articles: ${theGuardianArticlesData.length}`);
}

// firstScrape();

firstTheGuardianDementiaScrape();
