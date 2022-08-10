import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import SearchBar from '../components/Search/SearchBar/SearchBar';

import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
const news = () => {
	// TODO - ADD SEARCH BAR WITH FILTERS AS WELL: Publish date, publisher,
	// TODO - IMPORT SKELETON FOR WHEN WE ARE LOADING ARTICLES (DO THIS AFTER WE HAVE THE LAYOUT OF HOW WE ARE SHOWING ARTICLES)
	const [articles, setArticles] = useState(null);

	const [approvedArticles, setApprovedArticles] = useState([]);
	const [filteredArticles, setFilteredArticles] = useState([]);

	const [selectedNewsSites, setSelectedNewsSites] = useState([]);

	const [oldestFirst, setOldestFirst] = useState(false);

	useEffect(() => {
		async function fetchArticles() {
			const res = await axios.get('http://localhost:8000/api/news');

			const data = await res.data;

			setArticles(data);
			const approvedArticles = data.filter(
				(article) => article.status === 'APPROVED'
			);

			// set articles to show newest first intially
			setApprovedArticles(
				approvedArticles.sort(
					(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
				)
			);
			setFilteredArticles(approvedArticles);
		}

		fetchArticles();
	}, []);

	const sortByDate = () => {
		if (oldestFirst) {
			setFilteredArticles(
				filteredArticles.sort(
					(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
				)
			);
			setOldestFirst(false);
		} else {
			setFilteredArticles(
				filteredArticles.sort(
					(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
				)
			);
			setOldestFirst(true);
		}
	};

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="news-section min-h-screen pt-8 pb-8">
				<div className="w-[90%] mx-auto">
					<div className="flex justify-center mb-8 gap-4 items-center">
						<SearchBar
							placeholder="Enter Article Title..."
							id="search"
							data={filteredArticles}
							setFilteredArticles={setFilteredArticles}
						/>
						<button
							onClick={sortByDate}
							className="py-2 px-6 bg-black text-white font-bold hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
						>
							FILTER DATE
						</button>
					</div>
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
