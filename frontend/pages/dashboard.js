import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import { GiHamburgerMenu } from 'react-icons/gi';

// CSS
import styles from '../styles/Dashboard.module.css';

// Modules
import DashboardAside from '../components/Dashboard/DashboardAside';
import DashboardNewsContent from '../components/Dashboard/News/DashboardNewsContent';
import { SkeletonTheme } from 'react-loading-skeleton';
import DashboardHeaderSkeleton from '../components/Dashboard/Skeletons/DashboardHeaderSkeleton';
import { NewsContext } from '../context/NewsContext';

import { articleSort } from '../helper/articleSort';
const Dashboard = () => {
	const [articles, setArticles] = useState([]);

	// states used for filtering
	const [sortingOrder, setSortingOrder] = useState('desc');
	const [status, setStatus] = useState('ALL');
	const [isRecommendedActive, setIsRecommendedActive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState('dashboard');

	const [isAsideOpen, setIsAsideOpen] = useState(true);

	// computed state, when state changes (like filtering keyword, we will applyfilters again - which is why it works)

	const filteredArticles = articleSort.applyArticleFiltersDashboard(
		articles,
		status,
		isRecommendedActive
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
		// TODO - HOW TO MAKE THIS BETTER, SEEMS WACK TO USE THE PROVIDER LIKE THIS AND THEN JUST ADDING ON TO IT...
		<NewsContext.Provider
			value={{
				articles,
				filteredArticles,
				setArticles,
				status,
				setStatus,
				isRecommendedActive,
				setIsRecommendedActive,
			}}
		>
			<Head>
				<title>ALZ.NEWS - DASHBOARD</title>
			</Head>
			<main className="flex max-h-screen w-full ">
				{isAsideOpen ? (
					<DashboardAside
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						setIsAsideOpen={setIsAsideOpen}
					/>
				) : (
					<aside className="w-20 h-screen bg-black flex justify-center">
						<GiHamburgerMenu
							className="text-white text-3xl cursor-pointer mt-8 hover:text-gray-200 duration-150"
							onClick={() => setIsAsideOpen(true)}
						/>
					</aside>
				)}

				{currentPage === 'dashboard' && <p>dashboard</p>}
				{currentPage === 'news' && (
					<SkeletonTheme baseColor="#C2C2C2" highlightColor="#DBDBDB">
						<section
							className={`${styles.dashboardContent} relative py-8 w-full overflow-auto bg-[#f8f8f8]`}
						>
							{isLoading ? (
								<DashboardHeaderSkeleton />
							) : (
								<DashboardNewsContent />
							)}
						</section>
					</SkeletonTheme>
				)}
				{currentPage === 'journals' && <p>journals</p>}
				{currentPage === 'settings' && <p>settings</p>}
			</main>
		</NewsContext.Provider>
	);
};

export default Dashboard;
