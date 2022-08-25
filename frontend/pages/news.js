import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

// COMPONENTS
import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
import Layout from '../components/Layout';

// SSR function
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:8000/api/news/approved');

	const data = await res.data;

	const newestArticles = data.sort(
		(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
	);

	return {
		props: {
			articles: newestArticles,
		},
	};
}

// sorting function
function applySort(articles, sortingOrder) {
	if (sortingOrder === 'desc') {
		return articles.sort(
			(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
		);
	}
	return articles.sort(
		(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	);
}

// applyingFilters function to use on the articles themselves
function applyFilters(articles, sortingOrder, filterKeyword, newsSource) {
	// we are applying every filter before sorting
	const filteredArticles = articles.filter((article) =>
		article.title.toLowerCase().includes(filterKeyword.toLowerCase())
	);

	const filteredArticlesByNewsSource =
		newsSource.length > 0
			? filteredArticles.filter((article) =>
					newsSource.includes(article.publisher[0])
			  )
			: filteredArticles;

	const sortedArticles = applySort(
		[...filteredArticlesByNewsSource],
		sortingOrder
	);

	return sortedArticles;
}

export default function Page({ articles }) {
	// TODO - IMPORT SKELETON FOR WHEN WE ARE LOADING ARTICLES (DO THIS AFTER WE HAVE THE LAYOUT OF HOW WE ARE SHOWING ARTICLES)
	// const [articles, setArticles] = useState(articles);
	const [filterKeyword, setFilterKeyword] = useState('');
	const [sortingOrder, setSortingOrder] = useState('desc');
	const [newsSource, setNewsSource] = useState([]);

	// computed state, when state changes (like filtering keyword, we will applyfilters again - which is why it works)
	const filteredArticles = applyFilters(
		articles,
		sortingOrder,
		filterKeyword,
		newsSource
	);

	function onToggleSort() {
		setSortingOrder((prevState) => {
			if (prevState === 'desc') {
				return 'asc';
			}
			return 'desc';
		});
	}

	function onSelectChange(event) {
		// console.log(event.target.value);
		setArticlesPerPage(event.target.value);
	}

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="news-section min-h-screen pb-8">
				<div className="w-[90%] mx-auto">
					{/* <h1 className="text-8xl upper font-bold">News</h1> */}
					<div className="flex gap-x-8">
						<div className="flex w-1/3"></div>
						<div className="flex  mb-4 items-center w-2/3 mx-auto justify-center">
							{/* TODO - FIX THIS SO THE USER CAN CHOOSE THEMSELVES HOW MANY ARTICLES THEY WANT TO HAVE SHOWN */}
							{/* <select
							onChange={onSelectChange}
							name="articlesPerPage"
							id="articlesPerPage"
						>
							<option value="10">10</option>
							<option selected value="20">
								20
							</option>
							<option value="30">30</option>
							<option value="40">40</option>
							<option value="50">50</option>
						</select> */}
						</div>
					</div>
					<section className="">
						{/* TODO - WE MIGHT WANT TO REORGANIZE THIS, SO THAT WE CONTROL THE GRID IN THE NEWS SITE, AND WE HAVE ALL OF OUR COMPONENTS IN THIS news-page instaed of in the NewsArticlesList */}
						<NewsArticlesList
							filterKeyword={filterKeyword}
							setFilterKeyword={setFilterKeyword}
							sortingOrder={sortingOrder}
							setSortingOrder={setSortingOrder}
							newsSource={newsSource}
							setNewsSource={setNewsSource}
							onToggleSort={onToggleSort}
							articles={filteredArticles}
						/>
					</section>
				</div>
			</section>
		</>
	);
}

Page.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
