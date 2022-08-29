import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

// CSS
import styles from '../styles/Dashboard.module.css';

// Modules
import DashboardAside from '../components/Dashboard/DashboardAside';
import DashboardNewsContent from '../components/Dashboard/News/DashboardNewsContent';
import { SkeletonTheme } from 'react-loading-skeleton';
import DashboardHeaderSkeleton from '../components/Dashboard/Skeletons/DashboardHeaderSkeleton';

import { AllNewsContext } from '../components/Helper/Context';

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

	const [isLoading, setIsLoading] = useState(true);

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
			setIsLoading(false);
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
		<AllNewsContext.Provider value={{ articles, setArticles, applyFilters }}>
			<Head>
				<title>ALZ.NEWS - DASHBOARD</title>
			</Head>
			<main className="flex max-h-screen w-full ">
				<DashboardAside
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				<SkeletonTheme baseColor="#C2C2C2" highlightColor="#DBDBDB">
					<section
						className={`${styles.dashboardContent} relative py-8 px-12 w-full overflow-auto bg-[#f8f8f8]`}
					>
						{isLoading ? (
							<DashboardHeaderSkeleton />
						) : (
							<DashboardNewsContent articles={articles} />
						)}
					</section>
				</SkeletonTheme>
			</main>
		</AllNewsContext.Provider>
	);
};

export default Dashboard;
