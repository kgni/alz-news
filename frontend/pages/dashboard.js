import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

// CSS

import styles from '../styles/Dashboard.module.css';

// Modules
import DashboardAside from '../components/Dashboard/DashboardAside';

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

	const [currentPage, setCurrentPage] = useState('dashboard');

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

			setArticles(data);
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
				<title>ALZ.NEWS - DASHBOARD</title>
			</Head>
			<main className="flex max-h-screen">
				<DashboardAside
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				<section
					className={`${styles.dashboardContent} py-8 px-12 max-h-full overflow-auto w-full`}
				>
					{articles.map((article) => <p>{article.title}</p>).slice(0, 50)}
				</section>
			</main>
		</>
	);
};

export default Dashboard;
