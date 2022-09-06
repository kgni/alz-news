import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AllNewsContext } from '../../../context/Context';

import DashboardHeaderAddedWhen from './DashboardHeaderAddedWhen';

function getLastWeeksDate() {
	const now = new Date();

	return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

const DashboardHeader = () => {
	const { articles, setArticles } = useContext(AllNewsContext);
	const approvedArticles = articles.filter(
		(article) => article.status === 'APPROVED'
	);
	const pendingArticles = articles.filter(
		(article) => article.status === 'PENDING'
	);
	const rejectedArticles = articles.filter(
		(article) => article.status === 'REJECTED'
	);

	// TODO - fix the mb on header on smaller devices - the pagination should be below header when there is no space

	return (
		<header className="flex gap-8 w-full">
			<div className="bg-white py-4 px-8 rounded-lg min-w-[250px] w-1/5 flex flex-col justify-between shadow-md">
				<h3 className="font-bold text-3xl mb-4">Articles</h3>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="flex gap-5"
				>
					<p className="text-green-600 font-bold">{approvedArticles.length}</p>
					<p className="text-orange-300 font-bold">{pendingArticles.length}</p>
					<p className="text-red-600 font-bold">{rejectedArticles.length}</p>
					<p className="font-bold ml-auto">{articles.length}</p>
				</motion.div>
			</div>
			<DashboardHeaderAddedWhen articles={articles} />
		</header>
	);
};

export default DashboardHeader;
