import Head from 'next/head';
import axios from 'axios';
import Script from 'next/script';
// COMPONENTS

import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Header from '../components/Nav/Header';
import Footer from '../components/Nav/Footer';

// SSR function
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:8000/api/news/approved');

	const { articles, allArticlesLength, page, totalPages, recommendedArticles } =
		await res.data;

	console.log(allArticlesLength, page, totalPages);

	return {
		props: {
			articles,
			allArticlesLength,
			page,
			totalPages,
			recommendedArticles,
		},
	};
}

export default function HomePage() {
	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* this is just to fix the image from overflowing */}
			<div className="overflow-x-hidden">
				<div className="absolute -z-10 w-full top-[50%] h-[900px] bg-gradient-to-t from-white via-white to-transparent"></div>
				<div className="max-w-[1600px] mx-auto pb-8 w-[90%]">
					<div className="min-h-screen flex flex-col">
						<Header />
						<Hero />
					</div>
					<About />
				</div>
				<Footer />
			</div>
			{/* <Script src="./js/nextparticle.js" /> */}
		</>
	);
}
