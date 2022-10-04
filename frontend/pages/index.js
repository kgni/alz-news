import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { debounce } from 'lodash';

import { useSession } from 'next-auth/react';

import { motion } from 'framer-motion';

// COMPONENTS
import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
import Layout from '../components/UI/Layout/Layout';
import RecommendedArticles from '../components/NewsArticles/RecommendedArticles';
import RecommendedResources from '../components/RecommendedResources';
import DropDownFilter from '../components/Search/DropDownFilter';
import SearchBar from '../components/Search/SearchBar/SearchBar';
import FilterByNewest from '../components/Search/Filters/FilterByNewest';
import ReactPaginate from 'react-paginate';
import NewsSourceTags from '../components/NewsArticles/NewsSourceTags';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

export default function HomePage() {
	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="max-w-[1600px] mx-auto pb-8 w-[90%]">
				<div className=" min-h-screen flex flex-col ">
					<Header />
					<Hero />
				</div>
				<About />
			</div>
			<Footer />
		</>
	);
}
