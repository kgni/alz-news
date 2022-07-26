const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');

console.time('Scraping took');
async function fetchArticles(url) {
	const response = await axios.get(url);
	return cheerio.load(response.data);
}

const theGuardianArticlesData = [];

async function scrapeTheGuardian(
	baseUrl = 'https://www.theguardian.com/society/alzheimers'
) {
	try {
		console.log(`Scraping... ${baseUrl}`);
		const $ = await fetchArticles(baseUrl);
		let articles = $('.fc-item__container');

		articles.each(function () {
			let title = $(this).find('.js-headline-text').text().trim();
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
			scrapeTheGuardian(baseUrl);
		}

		// console.log(theGuardianArticlesData);
	} catch (error) {
		console.error(error);
	}
}

scrapeTheGuardian();
