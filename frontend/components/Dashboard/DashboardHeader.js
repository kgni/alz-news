import React, { useState } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';

// React skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function getLastWeeksDate() {
	const now = new Date();

	return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

const DashboardHeader = ({ articles }) => {
	// get initial date for range
	const lastWeeksDate = getLastWeeksDate();
	const [articlesDateRange, setArticlesDateRange] = useState(lastWeeksDate);

	const approvedArticles = articles.filter(
		(article) => article.status === 'APPROVED'
	);
	const pendingArticles = articles.filter(
		(article) => article.status === 'PENDING'
	);
	const rejectedArticles = articles.filter(
		(article) => article.status === 'REJECTED'
	);

	const articlesLastAdded = articles.filter((article) => {
		return new Date(article.publishDate) > articlesDateRange;
	});

	const articlesLastAddedApproved = articles.filter((article) => {
		return (
			new Date(article.publishDate) > articlesDateRange &&
			article.status === 'APPROVED'
		);
	});

	const articlesLastAddedPending = articles.filter((article) => {
		return (
			new Date(article.publishDate) > articlesDateRange &&
			article.status === 'PENDING'
		);
	});
	const articlesLastAddedRejected = articles.filter((article) => {
		return (
			new Date(article.publishDate) > articlesDateRange &&
			article.status === 'REJECTED'
		);
	});

	return (
		<header className="flex gap-8">
			<div className="bg-zinc-100 py-4 px-8 rounded-lg w-1/5">
				<h3 className="font-bold text-3xl mb-4">Articles</h3>
				<div className="flex gap-5">
					<p className="text-green-600 font-bold">{approvedArticles.length}</p>
					<p className="text-orange-300 font-bold">{pendingArticles.length}</p>
					<p className="text-red-600 font-bold">{rejectedArticles.length}</p>
					<p className="font-bold ml-auto">{articles.length}</p>
				</div>
			</div>
			<div className="bg-zinc-100 py-4 px-8 rounded-lg">
				{' '}
				<h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
					Added last week{' '}
					<AiFillCaretDown
						style={{ marginTop: '5px', cursor: 'pointer' }}
						size="0.8em"
					/>
				</h3>
				<div className="flex gap-5">
					<p className="text-green-600 font-bold">
						{articlesLastAddedApproved.length}
					</p>
					<p className="text-orange-300 font-bold">
						{articlesLastAddedPending.length}
					</p>
					<p className="text-red-600 font-bold">
						{articlesLastAddedRejected.length}
					</p>
					<p className="font-bold ml-auto">{articlesLastAdded.length}</p>
				</div>
			</div>
			<div></div>
			<div></div>
		</header>
	);
};

export default DashboardHeader;
