import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news this is great news" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-9xl">Hello</h1>
			<Link href="/news">
				<a className="underline">News</a>
			</Link>
		</div>
	);
}
