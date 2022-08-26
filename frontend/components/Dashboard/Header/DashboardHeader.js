import React, { useState } from 'react';

import DashboardHeaderAddedWhen from './DashboardHeaderAddedWhen';

function getLastWeeksDate() {
	const now = new Date();

	return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

const DashboardHeader = ({ articles }) => {
	const approvedArticles = articles.filter(
		(article) => article.status === 'APPROVED'
	);
	const pendingArticles = articles.filter(
		(article) => article.status === 'PENDING'
	);
	const rejectedArticles = articles.filter(
		(article) => article.status === 'REJECTED'
	);

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
			<DashboardHeaderAddedWhen articles={articles} />

			<div></div>
			<div></div>
		</header>
	);
};

export default DashboardHeader;
