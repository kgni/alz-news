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
	const [filteredArticles, setFilteredArticles] = useState([]);

	// deciding the order, if it is ascending or descending
	const [newestFirst, setNewestFirst] = useState(true);

	useEffect(() => {
		async function fetchArticles() {
			const res = await axios.get('http://localhost:8000/api/news/approved');

			const data = await res.data;

			const approvedNewestArticles = data
				.filter((article) => article.status === 'APPROVED')
				.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

			// set articles to show newest first intially
			setArticles(approvedNewestArticles);
			setFilteredArticles(approvedNewestArticles);
		}

		fetchArticles();
	}, []);

	function toggleNewest() {
		setNewestFirst((prevState) => !prevState);

		if (!newestFirst) {
			setArticles(
				articles.sort(
					(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
				)
			);
			setFilteredArticles(
				filteredArticles.sort(
					(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
				)
			);
		} else {
			setArticles(
				articles.sort(
					(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
				)
			);
			setFilteredArticles(
				filteredArticles.sort(
					(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
				)
			);
		}
	}

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
							data={articles}
							setFilteredArticles={setFilteredArticles}
						/>
						<button
							onClick={toggleNewest}
							className="py-2 px-6 bg-black text-white font-bold hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
						>
							FILTER DATE
						</button>
					</div>
					<section className="">
						{!articles && <p>Loading...</p>}

						{articles && (
							<>
								{filteredArticles.length === 0 ? (
									<span className="">No articles found...</span>
								) : (
									<span className="">{filteredArticles.length}</span>
								)}

								<NewsArticlesList articles={filteredArticles} />
							</>
						)}
					</section>
				</div>
			</section>
		</>
	);
};

export default news;
