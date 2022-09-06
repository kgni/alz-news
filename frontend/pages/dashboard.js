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
import { AllNewsContext } from '../context/Context';

import { articleSort } from '../helper/articleSort';
const Dashboard = () => {
	const [articles, setArticles] = useState([]);

	// states used for filtering
	const [filterKeyword, setFilterKeyword] = useState('');
	const [sortingOrder, setSortingOrder] = useState('desc');
	const [newsSource, setNewsSource] = useState([]);
	const [status, setStatus] = useState('ALL');
	const [isLoading, setIsLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState('dashboard');

	// computed state, when state changes (like filtering keyword, we will applyfilters again - which is why it works)

	const filteredArticles = articleSort.applyArticleFiltersDashboard(
		articles,
		status
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
		<AllNewsContext.Provider
			value={{ articles, filteredArticles, setArticles, status, setStatus }}
		>
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
						{isLoading ? <DashboardHeaderSkeleton /> : <DashboardNewsContent />}
					</section>
				</SkeletonTheme>
			</main>
		</AllNewsContext.Provider>
	);
};

export default Dashboard;
