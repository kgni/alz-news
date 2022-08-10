import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SearchBarDropDown from '../components/Search/SearchBarDropDown/SearchBarDropDown';
import FilterNewsSites from '../components/Search/Filters/FilterNewsSites';

export default function Home() {
	const [articles, setArticles] = useState(null);

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
				<FilterNewsSites />
				<SearchBarDropDown
					placeholder="Enter Article Title..."
					data={approvedArticles}
					id="search"
				/>
			</div>
			<h1>TEST</h1>
		</div>
	);
}
