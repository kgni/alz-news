import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const news = () => {
	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news this is great news" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-9xl">News</h1>
			<Link href="/">
				<a className="underline">Home</a>
			</Link>
		</>
	);
};

export default news;
