import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

const news = () => {
	const [news, setNews] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:8000/api/news').then((response) => {
			setNews(response.data);
		});
	}, []);

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-3xl text-center uppercase">News</h1>

			<section className="w-[90%] mx-auto">
				{news &&
					news.map((article) => (
						<a className="hover:underline" target="_blank" href={article.url}>
							<h4 className="text-xl">{article.title}</h4>
						</a>
					))}
			</section>
		</>
	);
};

export default news;
