import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SearchBarDropDown from '../components/Search/SearchBarDropDown/SearchBarDropDown';

import Layout from '../components/Layout';

export default function Page() {
	const [articles, setArticles] = useState([]);

	const [approvedArticles, setApprovedArticles] = useState([]);

	useEffect(() => {
		async function fetchArticles() {
			const res = await axios.get('http://localhost:8000/api/news');

			const data = await res.data;

			setArticles(data);
			const approvedArticles = data.filter(
				(article) => article.status === 'APPROVED'
			);

			setApprovedArticles(approvedArticles);
		}

		fetchArticles();
	}, []);
	return (
		<div className>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex justify-center pt-8">
				<SearchBarDropDown
					placeholder="Enter Article Title..."
					data={approvedArticles}
					id="search"
				/>
			</div>
		</div>
	);
}

Page.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
