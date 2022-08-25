import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

// TODO - PASS IN KEYS

import SearchBar from '../components/Search/SearchBar/SearchBar';
import SelectNewsSite from '../components/Search/Select/SelectNewsSite';

import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
import DropDownFilter from '../components/Search/DropDownFilter';
import FilterNewsSource from '../components/Search/Filters/FilterNewsSource';
import FilterByNewest from '../components/Search/Filters/FilterByNewest';

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

const Dashboard = () => {
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

	useEffect(() => {
		async function fetchArticles() {
			const res = await axios.get('http://localhost:8000/api/news/');

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

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</>
	);
};

export default Dashboard;
