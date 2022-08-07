import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-3xl uppercase text-center">Home</h1>
			<Link href="/news">
				<a className="underline text-center block">News</a>
			</Link>
		</div>
	);
}
