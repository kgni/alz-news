import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const journals = () => {
	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-3xl text-center uppercase">Journals</h1>
			<Link href="/">
				<a className="block underline text-center">Home</a>
			</Link>
		</>
	);
};

export default journals;
