import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
import SearchBar from '../components/Search/SearchBarDropDown/SearchBar';
const news = () => {
	// TODO - ADD SEARCH BAR WITH FILTERS AS WELL: Time, publisher,
	// TODO - IMPORT SKELETON FOR WHEN WE ARE LOADING ARTICLES (DO THIS AFTER WE HAVE THE LAYOUT OF HOW WE ARE SHOWING ARTICLES)
	const [articles, setArticles] = useState(null);

	const [approvedArticles, setApprovedArticles] = useState([]);

	const filteredArticles = [
		{
			title:
				'Critical elements of leading Alzheimer’s study possibly fraudulent',
			subtitle:
				'The highly influential paper, first published in 2006, has helped guide billions of dollars in US federal research into the disease',
			url: 'https://www.theguardian.com/society/2022/jul/23/alzheimers-study-fraudulent',
			publisher: ['The Guardian'],
			publisherUrl: 'https://www.theguardian.com',
			publishDate: '2022-07-22T22:00:00.000Z',
			categories: ["alzheimer's"],
			type: [],
			status: 'APPROVED',
			createdAt: '2022-08-07T19:30:13.693Z',
			updatedAt: '2022-08-07T19:30:13.693Z',
			id: '62f012c5efcb56dcfa0e865f',
		},
		{
			title:
				'After my husband died, my life felt broken – so I planted a new tree',
			subtitle: '',
			url: 'https://www.theguardian.com/society/2022/apr/02/amy-bloom-after-my-husband-died-my-life-felt-broken-so-i-planted-a-new-tree',
			publisher: ['The Guardian'],
			publisherUrl: 'https://www.theguardian.com',
			publishDate: '2022-04-01T22:00:00.000Z',
			categories: ["alzheimer's"],
			type: [],
			status: 'APPROVED',
			createdAt: '2022-08-07T19:30:13.694Z',
			updatedAt: '2022-08-07T19:30:13.694Z',
			id: '62f012c5efcb56dcfa0e8667',
		},
		{
			title:
				'After my husband died, my life felt broken – so I planted a new tree',
			subtitle: '',
			url: 'https://www.theguardian.com/society/2022/apr/02/amy-bloom-after-my-husband-died-my-life-felt-broken-so-i-planted-a-new-tree',
			publisher: ['alz.org'],
			publisherUrl: 'https://www.theguardian.com',
			publishDate: '2022-04-01T22:00:00.000Z',
			categories: ["alzheimer's"],
			type: [],
			status: 'APPROVED',
			createdAt: '2022-08-07T19:30:13.694Z',
			updatedAt: '2022-08-07T19:30:13.694Z',
			id: '62f012c5efcb56dcfa0e8667',
		},
	];

	useEffect(() => {
		async function fetchArticles() {
			const res = await axios.get('http://localhost:8000/api/news');

			const data = await res.data;

			setArticles(data);
			const approvedArticles = data.filter(
				(article) => article.status === 'APPROVED'
			);

			setApprovedArticles(approvedArticles);
		}

		fetchArticles();
	}, []);

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex justify-center pt-8">
				<SearchBar
					placeholder="Enter Article Title..."
					data={approvedArticles}
					id="search"
				/>
			</div>
			<section className="news-setion  min-h-screen pt-8 pb-8">
				<div className="w-[90%] mx-auto">
					{/* <h1 className="text-3xl uppercase">News</h1> */}

					<section className="">
						{!articles && <p>Loading...</p>}
						{articles && <NewsArticlesList articles={filteredArticles} />}
					</section>
				</div>
			</section>
		</>
	);
};

export default news;
