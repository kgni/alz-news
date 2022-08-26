import React, { useState } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';

function getLastWeeksDate() {
	const now = new Date();

	return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

const DashboardHeaderAddedWhen = ({ articles }) => {
	// get initial date for range
	const lastWeeksDate = getLastWeeksDate();
	const [articlesDateRange, setArticlesDateRange] = useState(lastWeeksDate);

	const articlesLastAdded = articles.filter((article) => {
		return Date.parse(article.publishDate) > articlesDateRange;
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
		<div className="bg-zinc-100 py-4 px-8 rounded-lg w-1/5">
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
	);
};

export default DashboardHeaderAddedWhen;
