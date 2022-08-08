import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';

const news = () => {
	const [articles, setArticles] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:8000/api/news').then((response) => {
			setArticles(response.data);
		});
	}, []);

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="news-setion  min-h-screen pt-8 pb-8">
				<div className="w-[90%] mx-auto">
					{/* <h1 className="text-3xl uppercase">News</h1> */}

					{/* <form className="flex justify-center" action="">
						<input type="text" placeholder="Search" />
					</form> */}

					<section className="">
						{!articles && <p>Loading...</p>}
						{articles && <NewsArticlesList articles={articles} />}
					</section>
				</div>
			</section>
		</>
	);
};

export default news;
