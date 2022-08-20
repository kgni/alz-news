import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

// TODO - PASS IN KEYS

import SearchBar from '../components/Search/SearchBar/SearchBar';
import SelectNewsSite from '../components/Search/Select/SelectNewsSite';

import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';

// applyingFilters function to use on the articles themselves
function applyFilters(articles, sortingOrder, filterKeyword, newsSource) {
	// we are applying every filter before sorting
	const filteredArticles = articles.filter((article) =>
		article.title.toLowerCase().includes(filterKeyword.toLowerCase())
	);

	const filteredArticlesByNewsSource =
		newsSource.length > 0
			? filteredArticles.filter((article) =>
					newsSource.includes(article.publisher[0])
			  )
			: filteredArticles;

	const sortedArticles = applySort(
		[...filteredArticlesByNewsSource],
		sortingOrder
	);

	return sortedArticles;
}

// TODO - put this in utils at some point, if needed.
function applySort(articles, sortingOrder) {
	if (sortingOrder === 'desc') {
		return articles.sort(
			(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
		);
	}
	return articles.sort(
		(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	);
}

const News = () => {
	// TODO - ADD SEARCH BAR WITH FILTERS AS WELL: Publish date, publisher,
	// TODO - IMPORT SKELETON FOR WHEN WE ARE LOADING ARTICLES (DO THIS AFTER WE HAVE THE LAYOUT OF HOW WE ARE SHOWING ARTICLES)
	const [articles, setArticles] = useState([]);
	const [filterKeyword, setFilterKeyword] = useState('');
	const [sortingOrder, setSortingOrder] = useState('desc');
	const [newsSource, setNewsSource] = useState([]);

	// computed state, when state changes (like filtering keyword, we will applyfilters again - which is why it works)
	const filteredArticles = applyFilters(
		articles,
		sortingOrder,
		filterKeyword,
		newsSource
	);

	// TODO - No reason to have useEffect here, if we are doing it in a Next.js way.
	// TODO - site is content heavy, we want to have the articles shown/rendered before serverside, this is loading it clientside.
	useEffect(() => {
		async function fetchArticles() {
			const res = await axios.get('http://localhost:8000/api/news/approved');

			const data = await res.data;

			const newestArticles = data.sort(
				(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
			);

			// set articles to show newest first intially
			setArticles(newestArticles);
		}

		fetchArticles();
	}, []);

	function onToggleSort() {
		setSortingOrder((prevState) => {
			if (prevState === 'desc') {
				return 'asc';
			}
			return 'desc';
		});
	}

	// function toggleNewest() {
	// 	setNewestFirst((prevState) => !prevState);

	// 	if (!newestFirst) {
	// 		setArticles(
	// 			articles.sort(
	// 				(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
	// 			)
	// 		);
	// 		setFilteredArticles(
	// 			filteredArticles.sort(
	// 				(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
	// 			)
	// 		);
	// 	} else {
	// 		setArticles(
	// 			articles.sort(
	// 				(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	// 			)
	// 		);
	// 		setFilteredArticles(
	// 			filteredArticles.sort(
	// 				(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	// 			)
	// 		);
	// 	}
	// }

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="news-section min-h-screen pt-8 pb-8">
				<div className="w-[90%] mx-auto">
					<div className="flex justify-center mb-4 items-center">
						{/* <SelectNewsSite /> */}
						<SearchBar
							placeholder="Enter Article Title..."
							inputId="search"
							filterKeyword={filterKeyword}
							setFilterKeyword={setFilterKeyword}
						/>
						<button
							onClick={onToggleSort}
							className="py-2 px-6 bg-black text-white font-bold hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
						>
							FILTER DATE
						</button>
					</div>
					<section className="">
						{!articles && <p className="text-center">Loading...</p>}

						{articles && (
							<>
								<div className="mb-8">
									{filteredArticles.length === 0 ? (
										<p className="text-center">No articles found...</p>
									) : (
										<p className="text-center">
											{filteredArticles.length} articles found
										</p>
									)}
								</div>

								<NewsArticlesList articles={filteredArticles} />
							</>
						)}
					</section>
				</div>
			</section>
		</>
	);
};

export default News;
